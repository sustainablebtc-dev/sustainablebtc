import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import puppeteer from "puppeteer";
import fs from "fs";

const START = "https://www.sustainablebtc.org";
const DOMAIN = "www.sustainablebtc.org"; // Exact domain, no subdomains

const visited = new Set<string>();
const queue = [START];
const results: string[] = [];

// File extensions to exclude
const EXCLUDED_EXTENSIONS = [
   ".pdf",
   ".png",
   ".jpg",
   ".jpeg",
   ".gif",
   ".svg",
   ".webp",
   ".ico",
   ".zip",
   ".tar",
   ".gz",
   ".rar",
   ".doc",
   ".docx",
   ".xls",
   ".xlsx",
   ".ppt",
   ".pptx",
   ".mp3",
   ".mp4",
   ".avi",
   ".mov",
   ".css",
   ".js",
];

function isValidUrl(url: string): boolean {
   try {
      const u = new URL(url);

      // 1. Exclude mailto: and tel: protocols
      if (u.protocol === "mailto:" || u.protocol === "tel:") {
         return false;
      }

      // 2. Only allow exact domain (no subdomains)
      if (u.hostname !== DOMAIN) {
         return false;
      }

      // 3. Exclude direct file URLs
      const pathname = u.pathname.toLowerCase();
      if (EXCLUDED_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
         return false;
      }

      return true;
   } catch {
      return false;
   }
}

async function crawlPage(browser: puppeteer.Browser, url: string) {
   if (visited.has(url)) return;
   visited.add(url);
   results.push(url);
   console.log("Crawling:", url);

   const page = await browser.newPage();
   await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

   // collect internal links
   const links: string[] = await page.$$eval("a", (as) =>
      as.map((a) => (a as HTMLAnchorElement).href).filter(Boolean)
   );

   await page.close();

   for (const l of links) {
      if (!isValidUrl(l)) continue;

      try {
         const u = new URL(l);
         let clean = u.origin + u.pathname;
         if (clean.endsWith("/")) clean = clean.slice(0, -1);
         if (!visited.has(clean) && !queue.includes(clean)) {
            queue.push(clean);
         }
      } catch {}
   }
}

(async () => {
   const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
   });
   while (queue.length) {
      const url = queue.shift()!;
      try {
         await crawlPage(browser, url);
      } catch (e) {
         console.error("Error crawling", url, e);
      }
   }
   await browser.close();
   fs.writeFileSync("./ai/chatbot/data/all_pages.json", JSON.stringify(results, null, 2));
   console.log("Done — pages:", results.length);
})();
