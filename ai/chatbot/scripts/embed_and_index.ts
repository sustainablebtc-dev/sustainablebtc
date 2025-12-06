/**
 * Embedding and Indexing Script
 *
 * Purpose: Generate embeddings for all chunks and index them to Qdrant vector database
 *
 * Flow:
 * 1. Read chunks.json (output from crawl_and_chunk.ts)
 * 2. Generate embeddings using text-embedding-3-large (3072 dimensions)
 * 3. Batch process 32 chunks at a time for efficiency
 * 4. Upsert vectors + metadata to Qdrant collection "sbp_docs"
 *
 * Usage: npx tsx scripts/embed_and_index.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import { OpenAI } from "openai";
import { qdrant, ensureCollection } from "../lib/qdrant.js";
import { randomUUID } from "crypto";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// #region Embedding Function
/**
 * Generate embedding vector for text
 * Uses text-embedding-3-large (3072 dimensions) for best accuracy
 */
async function embed(text: string) {
   // Normalize whitespace and truncate to OpenAI's limit
   const cleanText = text.replace(/\s+/g, " ").substring(0, 8000).trim();

   const response = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: cleanText,
   });

   return response.data[0].embedding as number[];
}
// #endregion

// #region Main Indexing Process
(async () => {
   // Step 1: Load chunks from crawl_and_chunk.ts output
   const chunks = JSON.parse(
      fs.readFileSync("./ai/chatbot/data/chunks.json", "utf-8")
   ) as Array<{
      id: string;
      text: string;
      source: string;
      metadata?: any;
   }>;

   console.log(`📊 Total chunks to embed and index: ${chunks.length}\n`);

   // Step 2: Ensure Qdrant collection exists with correct dimensions
   const collection = await ensureCollection("sbp_docs", 3072);

   // Step 3: Batch process chunks for efficiency
   const batchSize = 32;
   for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);

      // Generate embeddings for batch (parallel processing)
      const vectors = await Promise.all(batch.map((c) => embed(c.text)));

      // Prepare payloads with metadata for retrieval
      const payloads = batch.map((c) => ({
         originalId: c.id,
         source: c.source,
         preview: c.text.slice(0, 200),
         // Rich metadata for context building
         title: c.metadata?.title,
         section: c.metadata?.section,
         heading: c.metadata?.heading,
         url: c.metadata?.url,
      }));

      // Upsert to Qdrant with unique IDs
      await qdrant.upsert(collection, {
         points: batch.map((chunk, idx) => ({
            id: randomUUID(),
            vector: vectors[idx],
            payload: payloads[idx],
         })),
      });

      console.log(
         `Indexed ${Math.min(i + batch.length, chunks.length)}/${chunks.length}`
      );
   }

   console.log("\n✔ All chunks successfully embedded and indexed to Qdrant");
})();
// #endregion
