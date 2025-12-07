/**
 * RAG Chat API Route
 * Handles user queries using Retrieval-Augmented Generation (RAG)
 *
 * Flow:
 * 1. User sends a question
 * 2. Convert question to embedding vector (text-embedding-3-large)
 * 3. Search Qdrant vector database for relevant chunks
 * 4. Build structured context from top results
 * 5. Send context + question to GPT-4 for answer generation
 */

import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { QdrantClient } from "@qdrant/js-client-rest";

// Force this route to use Node.js runtime and disable static optimization
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// #region API Handler
export async function POST(req: Request) {
   // Parse and validate request
   const body = await req.json();
   const message = body?.message as string;
   if (!message)
      return NextResponse.json({ error: "no message" }, { status: 400 });

   // Initialize clients inside the request handler (lazy loading)
   const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
   const qdrant = new QdrantClient({ 
      url: process.env.QDRANT_URL!, 
      apiKey: process.env.QDRANT_API_KEY! 
   });

   //   console.log("Original query:", message);

   // #region Step 1: Generate Query Embedding
   // Convert user question to 3072-dimensional vector using text-embedding-3-large
   const embedding = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: message.toLowerCase().trim(),
   });
   const queryVector = embedding.data[0].embedding as number[];
   // #endregion

   // #region Step 2: Vector Search
   // Search Qdrant for semantically similar chunks
   // - limit: 20 results for good recall
   // - score_threshold: 0.15 to filter weak matches
   const allResults = await qdrant.search("sbp_docs", {
      vector: queryVector,
      limit: 20,
      with_payload: true,
      with_vector: false,
      score_threshold: 0.15,
   });

   //   console.log("Retrieved results:", allResults.length);
   // #endregion

   // #region Step 3: Select Top Results
   // Take top 3 results (already sorted by relevance score)
   const topResults = allResults.slice(0, 3);

   // Log retrieval quality for monitoring
   //   console.log("Top 5 scores:", topResults.map(r => (r.score || 0).toFixed(3)));
   //   if (topResults.length > 0) {
   //     console.log("Top score:", topResults[0].score);
   //     console.log("Sources:", topResults.map(r => r.payload?.source || "unknown").join(", "));
   //   }
   // #endregion

   // #region Step 4: Build Context
   // Format retrieved chunks into structured context for LLM
   const context = topResults
      .map((h, idx) => {
         const preview = h.payload?.preview || "";
         const source = h.payload?.source || "unknown";
         const url = h.payload?.url || source;
         const title = String(h.payload?.title || "");
         const section = String(h.payload?.section || "");
         const heading = String(h.payload?.heading || "");
         const relevance = (h.score * 100).toFixed(1);

         // Structured format: includes source metadata + content
         let contextStr = `DOCUMENT ${idx + 1}:\n`;
         contextStr += `SOURCE: ${url}\n`;
         if (title) contextStr += `PAGE TITLE: ${title.substring(0, 100)}\n`;
         if (section) contextStr += `SECTION: ${section}\n`;
         if (heading) contextStr += `HEADING: ${heading}\n`;
         contextStr += `RELEVANCE: ${relevance}%\n`;
         contextStr += `CONTENT:\n${preview}\n`;

         return contextStr;
      })
      .join("\n---\n\n");
   // #endregion

   // #region Step 5: Generate Answer
   // System prompt defines assistant role and behavior
   const SYSTEM = `You are Hal, the Sustainable Bitcoin Protocol (SBP) Assistant. Answer questions about sustainable Bitcoin mining, clean energy, and Sustainable Bitcoin Certificates (SBCs) based on the CONTEXT documents provided.

INSTRUCTIONS:
- Keep answers SHORT and conversational (3-4 sentences max)
- Be direct and to the point - avoid lengthy explanations
- Use simple language, not jargon
- Format responses with markdown for readability:
  • Use **bold** for key terms only
  • Use bullet points (•) for lists with 3-4 items max
  • Use numbered lists only for clear steps
- NEVER include URLs or links in your response text - links will be provided separately
- If context is insufficient, say "I don't have enough information about that. Visit www.sustainablebtc.org or contact the team for details."
- Do not provide legal or investment advice`;

   // Send context + question to GPT-4 for answer generation
   const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
         { role: "system", content: SYSTEM },
         {
            role: "user",
            content: `USER QUESTION:\n${message}\n\n${"-".repeat(
               80
            )}\n\nCONTEXT DOCUMENTS:\n\n${context}\n\n${"-".repeat(
               80
            )}\n\nCRITICAL: Answer in 150 tokens or less. Be brief, friendly, and helpful. Get straight to the point. Do NOT include any URLs in your response.`,
         },
      ],
      temperature: 0.2,
      max_tokens: 200,
   });

   const reply = completion.choices?.[0]?.message?.content ?? "No reply";
   
   // Extract valid links - only from sustainablebtc.org domain and convert to relative paths
   const validDomainPattern = /^https?:\/\/(www\.)?sustainablebtc\.org/i;
   const uniqueUrls = new Set<string>(); // Track unique URLs to avoid duplicates
   
   const rawLinks = topResults
      .filter((h: any) => (h.score || 0) > 0.3) // Higher threshold for relevance
      .map((h: any) => {
         const url = h.payload?.url || h.payload?.source || '';
         const title = String(h.payload?.title || h.payload?.heading || '');
         const heading = String(h.payload?.heading || '');
         return { url, title, heading };
      })
      .filter((link: any) => validDomainPattern.test(link.url)) // Only sustainablebtc.org links
      .map((link: any) => {
         // Convert full URL to relative path (remove domain)
         const relativePath = link.url.replace(/^https?:\/\/(www\.)?sustainablebtc\.org/i, '') || '/';
         return { url: relativePath, title: link.title, heading: link.heading };
      })
      .filter((link: any) => {
         // Remove duplicates
         if (uniqueUrls.has(link.url)) return false;
         uniqueUrls.add(link.url);
         return true;
      })
      .slice(0, 2); // Maximum 2 links after deduplication
   
   // Use GPT to generate readable link text based on context
   let links: Array<{ text: string; url: string }> = [];
   
   if (rawLinks.length > 0) {
      const linkGenPrompt = `Generate SHORT link text (2-4 words max) for each URL. Be direct and simple.

USER QUESTION: ${message}

SOURCES:
${rawLinks.map((link: any, idx: number) => `${idx + 1}. URL: ${link.url}\n   Title: ${link.title}\n   Section: ${link.heading}`).join('\n\n')}

RULES:
- Maximum 4 words, keep it concise
- Use short forms: "SBP" for Sustainable Bitcoin Protocol, "SBC" for Sustainable Bitcoin Certificate
- Be action-oriented: "Learn about X", "View X", "For X"
- No creativity, just clear labels

Examples:
- "Learn about SBCs"
- "SBP for miners"
- "View transparency"
- "About SBP"

Return ONLY a JSON array: [{"index": 1, "text": "link text"}, ...]`;

      try {
         const linkGeneration = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
               { 
                  role: "system", 
                  content: "You are a link text generator. Return ONLY valid JSON array, no other text." 
               },
               { 
                  role: "user", 
                  content: linkGenPrompt 
               }
            ],
            temperature: 0.0,
            max_tokens: 80,
            response_format: { type: "json_object" }
         });

         const rawResponse = linkGeneration.choices[0]?.message?.content || '{"links":[]}';
         console.log('Link generation raw response:', rawResponse);
         
         const parsed = JSON.parse(rawResponse);
         const linkTexts = parsed.links || parsed;
         
         links = rawLinks.map((link: any, idx: number) => {
            const generated = linkTexts.find((l: any) => l.index === idx + 1);
            console.log(`Link ${idx + 1}: ${generated?.text || 'NOT FOUND'}`);
            return {
               text: generated?.text || "Learn more",
               url: link.url
            };
         });
      } catch (error) {
         console.error('Link generation error:', error);
         // Fallback if GPT generation fails
         links = rawLinks.map((link: any) => ({
            text: "Learn more",
            url: link.url
         }));
      }
   }
   
   // Always add "Contact us" link if not already present
   if (links.length > 0 && !links.some((l: any) => l.url === '/contact-us')) {
      links.push({ text: "Contact Our Experts", url: "/contact-us" });
   }
   // #endregion

   // Return answer with formatted links
   return NextResponse.json({
      reply,
      links: links.length > 0 ? links : undefined,
      sources: topResults.map((h: any) => ({
         ...h.payload,
         relevanceScore: ((h.score || 0) * 100).toFixed(1),
      })),
   });
}
// #endregion