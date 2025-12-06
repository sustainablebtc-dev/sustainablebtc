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
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { OpenAI } from "openai";
import { qdrant } from "../../../ai/chatbot/lib/qdrant";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// #region API Handler
export async function POST(req: Request) {
   // Parse and validate request
   const body = await req.json();
   const message = body?.message as string;
   if (!message)
      return NextResponse.json({ error: "no message" }, { status: 400 });

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
         const title = h.payload?.title || "";
         const section = h.payload?.section || "";
         const heading = h.payload?.heading || "";
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
   const SYSTEM = `You are the Sustainable Bitcoin Protocol (SBP) Assistant. Answer questions about sustainable Bitcoin mining, clean energy, and Sustainable Bitcoin Certificates (SBCs) based on the CONTEXT documents provided.

INSTRUCTIONS:
- Use ALL relevant information from the CONTEXT documents to provide complete answers
- If the answer spans multiple document sections, combine them for a comprehensive response
- Quote directly from the context when answering personal or specific questions
- Be helpful, clear, and conversational
- Only if NO relevant information is found, suggest visiting www.sustainablebtc.org
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
            )}\n\nCONTEXT DOCUMENTS:\n\n${context}`,
         },
      ],
      temperature: 0.3,
      max_tokens: 150,
   });

   const reply = completion.choices?.[0]?.message?.content ?? "No reply";
   // #endregion

   // Return answer with source metadata
   return NextResponse.json({
      reply,
      sources: topResults.map((h: any) => ({
         ...h.payload,
         relevanceScore: ((h.score || 0) * 100).toFixed(1),
      })),
   });
}
// #endregion