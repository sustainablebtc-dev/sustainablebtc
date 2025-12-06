/**
 * Crawling and Chunking Script
 *
 * Purpose: Extract content from website and local documents, then chunk for embedding
 *
 * Flow:
 * 1. Crawl website pages using Puppeteer (JavaScript rendering)
 * 2. Extract local documents (PDF, DOCX, PPTX) from ./ai/chatbot/data/sbp-documents
 * 3. Clean and preprocess all text
 * 4. Chunk text into ~200-250 word segments
 * 5. Save all chunks to chunks.json for indexing
 *
 * Usage: npx tsx scripts/crawl_and_chunk.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { smartChunkText, chunkText } from "../lib/chunker.js";

// Document processing libraries
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";
import JSZip from "jszip";

const pages: string[] = JSON.parse(
   fs.readFileSync("./ai/chatbot/data/all_pages.json", "utf-8")
);
const out: { id: string; text: string; source: string; metadata: any }[] = [];

// #region Text Preprocessing
/**
 * Clean and normalize text for embedding
 * - Removes control characters, special characters
 * - Normalizes whitespace
 * - Removes CTAs, timestamps, copyright notices
 */
function preprocessText(text: string): string {
   return text
      .replace(/\s+/g, " ")
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\u2026/g, "...")
      .replace(
         /Submit|Click here|Learn more|Read more|Get started|Sign up|Subscribe|Download/gi,
         ""
      )
      .replace(
         /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}\b/g,
         ""
      )
      .replace(/\d{1,2}:\d{2}(:\d{2})?(\s?(AM|PM|am|pm))?/g, "")
      .replace(/©.*?\d{4}/g, "")
      .replace(/All rights reserved/gi, "")
      .replace(/\|/g, " ")
      .replace(/\s+/g, " ")
      .trim();
}
// #endregion

// #region Website Crawling
/**
 * Fetch and extract text from a URL using Puppeteer
 * - Handles JavaScript-rendered content
 * - Expands accordions, tabs, and hidden elements
 * - Removes navigation, footer, forms, CTAs
 */
async function fetchText(browser: any, url: string) {
   const page = await browser.newPage();

   // Set viewport to large size to avoid mobile layouts hiding content
   await page.setViewport({ width: 1920, height: 1080 });

   try {
      if (url.endsWith(".pdf")) {
         await page.close();
         return "";
      }

      await page.goto(url, {
         waitUntil: "networkidle2",
         timeout: 30000,
      });

      // UNIVERSAL: Expand ALL interactive/collapsible elements on EVERY page
      try {
         await page.evaluate(() => {
            // 1. Open all <details> elements
            const details = document.querySelectorAll("details");
            details.forEach((el: any) => {
               el.open = true;
            });

            // 2. Click all accordion/collapse/tab triggers
            const triggers = document.querySelectorAll(
               '[class*="accordion"], [class*="collapse"], [class*="expand"], ' +
                  '[class*="toggle"], [class*="tab"], [role="tab"], [role="button"], ' +
                  '[data-toggle], [data-accordion], button[aria-expanded="false"]'
            );
            triggers.forEach((el: any) => {
               try {
                  // Set aria-expanded to true
                  if (el.hasAttribute("aria-expanded")) {
                     el.setAttribute("aria-expanded", "true");
                  }
                  // Click to expand
                  el.click?.();
               } catch (e) {}
            });

            // 3. Show all hidden content divs
            const hiddenContent = document.querySelectorAll(
               '[class*="hidden"], [class*="collapse"], [style*="display: none"], ' +
                  '[style*="display:none"], [aria-hidden="true"]'
            );
            hiddenContent.forEach((el: any) => {
               try {
                  el.style.display = "block";
                  el.style.visibility = "visible";
                  el.setAttribute("aria-hidden", "false");
                  el.classList.remove("hidden");
               } catch (e) {}
            });
         });

         // Wait for animations and lazy-loaded content
         await new Promise((r) => setTimeout(r, 2000));

         // Scroll to bottom to trigger lazy loading
         await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
         });

         await new Promise((r) => setTimeout(r, 1000));
      } catch (e) {
         console.log("Could not expand interactive elements:", url);
      }

      // Extract text content after JavaScript has rendered and content expanded
      const text = await page.evaluate(() => {
         // Remove unwanted elements (navigation, footer, scripts, forms, CTAs, buttons)
         const unwanted = document.querySelectorAll(
            "nav, header, footer, script, style, noscript, iframe, svg, " +
               'form, button, [class*="cookie"], [class*="banner"], ' +
               '[class*="popup"], [class*="modal"], [class*="newsletter"], ' +
               '[role="banner"], [role="navigation"], [role="contentinfo"], ' +
               ".footer, .header, .nav, .menu, .sidebar"
         );
         unwanted.forEach((el) => el.remove());

         // Get title and meta description
         const title = document.title || "";
         const metaDesc =
            document
               .querySelector('meta[name="description"]')
               ?.getAttribute("content") || "";

         // Get main content
         const main = document.querySelector("main")?.innerText || "";
         const article = document.querySelector("article")?.innerText || "";
         const body = document.body?.innerText || "";

         // Combine all content
         const content = main || article || body;
         let fullText = `${title} ${metaDesc} ${content}`;

         // Clean up whitespace and common noise
         fullText = fullText
            .replace(/\s+/g, " ") // Multiple spaces to single
            .replace(
               /Submit|Click here|Learn more|Read more|Get started|Sign up|Subscribe/gi,
               ""
            ) // Remove CTAs
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
            .replace(/©.*?\d{4}/g, "") // Remove copyright notices
            .replace(/Terms|Privacy Policy|Cookie Policy/gi, "") // Remove legal links
            .trim();

         return fullText;
      });

      await page.close();
      return text;
   } catch (e) {
      console.error("Fetch failed:", url, e);
      await page.close();
      return "";
   }
}
// #endregion

// #region Document Extraction
/**
 * Extract text from PDF files
 */
async function extractPDF(filePath: string): Promise<string> {
   const dataBuffer = fs.readFileSync(filePath);
   const data = await pdfParse(dataBuffer);
   return data.text;
}

/**
 * Extract text from DOCX files
 */
async function extractDOCX(filePath: string): Promise<string> {
   const result = await mammoth.extractRawText({ path: filePath });
   return result.value;
}

/**
 * Extract text from PPTX files
 * PowerPoint text is stored in XML slides
 */
async function extractPPTX(filePath: string): Promise<string> {
   const dataBuffer = fs.readFileSync(filePath);
   const zip = await JSZip.loadAsync(dataBuffer);
   let text = "";

   // PPTX slides are in ppt/slides/slide*.xml
   const slideFiles = Object.keys(zip.files).filter(
      (name) => name.startsWith("ppt/slides/slide") && name.endsWith(".xml")
   );

   for (const slideFile of slideFiles) {
      const content = await zip.files[slideFile].async("string");
      // Extract text from <a:t> XML tags
      const matches = content.match(/<a:t>([^<]+)<\/a:t>/g) || [];
      const slideText = matches
         .map((m) => m.replace(/<\/?a:t>/g, ""))
         .join(" ");
      text += slideText + "\n";
   }

   return text;
}

/**
 * Process all local documents from ./ai/chatbot/data/sbp-documents
 * Supports: PDF, DOCX, PPTX
 */
async function processLocalDocuments() {
   const docsDir = "./ai/chatbot/data/sbp-documents";

   if (!fs.existsSync(docsDir)) {
      console.log("\n⚠️  No local documents directory found, skipping...");
      return;
   }

   const files = fs.readdirSync(docsDir, { recursive: true }) as string[];
   const docFiles = files.filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return [".pdf", ".docx", ".pptx"].includes(ext);
   });

   if (docFiles.length === 0) {
      console.log("\n⚠️  No documents found in sbp-documents folder");
      return;
   }

   console.log(`\n📄 Processing ${docFiles.length} local documents...`);

   for (const file of docFiles) {
      const filePath = path.join(docsDir, file);
      const filename = path.basename(file);
      const ext = path.extname(file).toLowerCase();

      try {
         console.log(`Extracting: ${filename}`);

         let rawText = "";
         if (ext === ".pdf") {
            rawText = await extractPDF(filePath);
         } else if (ext === ".docx") {
            rawText = await extractDOCX(filePath);
         } else if (ext === ".pptx") {
            rawText = await extractPPTX(filePath);
         }

         // Clean extracted text
         const cleanedText = rawText
            .replace(/\s+/g, " ") // Collapse whitespace
            .replace(/\n+/g, " ") // Remove newlines
            .trim();

         if (cleanedText.length < 50) {
            console.log(`  ⚠️  Skipped (too short): ${filename}`);
            continue;
         }

         // Chunk the text - smaller chunks for documents (200 words, 30 overlap)
         // This ensures Q&A pairs and specific topics stay together
         const textChunks = chunkText(cleanedText, 200, 30);
         console.log(
            `  Generated ${textChunks.length} chunks from ${filename}`
         );

         textChunks.forEach((chunkContent, idx) => {
            const cleanedChunk = preprocessText(chunkContent);
            if (cleanedChunk.length > 50) {
               out.push({
                  id: `${encodeURIComponent(filename)}#${idx}`,
                  text: cleanedChunk,
                  source: filename,
                  metadata: { url: filename, title: filename },
               });
            }
         });
      } catch (error) {
         console.error(`  ❌ Error processing ${filename}:`, error);
      }
   }
}
// #endregion

// #region Main Process
(async () => {
   const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
   });

   const pageDataLines: string[] = [];

   // Step 1: Process website pages
   console.log("🌐 Processing website pages...\n");
   for (const url of pages) {
      const text = await fetchText(browser, url);
      if (!text || text.length < 50) {
         console.log("Skipped (no content):", url);
         continue;
      }

      // Save raw page data for debugging
      pageDataLines.push(`${"=".repeat(80)}`);
      pageDataLines.push(`URL: ${url}`);
      pageDataLines.push(`Length: ${text.length} characters`);
      pageDataLines.push(`${"=".repeat(80)}`);
      pageDataLines.push(text);
      pageDataLines.push("\n\n");

      // Chunk website content (250 words, 40 overlap for context)
      const chunks = smartChunkText(text, url, 250, 40);
      const wordCount = text.split(/\s+/).length;

      chunks.forEach((chunk, i) => {
         const cleanedText = preprocessText(chunk.text);
         if (cleanedText.length > 50) {
            out.push({
               id: `${encodeURIComponent(url)}#${i}`,
               text: cleanedText,
               source: url,
               metadata: chunk.metadata,
            });
         }
      });

      console.log(
         "Chunked:",
         url,
         "- Chunks:",
         chunks.length,
         "- Words:",
         wordCount,
         "- Chars:",
         text.length
      );
   }

   await browser.close();

   // Step 2: Process local documents (PDF, DOCX, PPTX)
   await processLocalDocuments();

   // Step 3: Save outputs
   // Save raw page data for debugging
   fs.writeFileSync("./ai/chatbot/data/pagedata.txt", pageDataLines.join("\n"));
   console.log("\n✔ Raw page data saved to: data/pagedata.txt");

   // Save all chunks (website + documents) for embedding
   fs.writeFileSync("./ai/chatbot/data/chunks.json", JSON.stringify(out, null, 2));
   console.log("✔ Total chunks:", out.length);
   console.log("✔ Website pages processed:", pages.length);
   console.log("✔ All content chunked and saved to chunks.json");
})();
// #endregion
