/**
 * Qdrant Vector Database Client
 *
 * Manages connection and collection setup for Qdrant Cloud
 * Collection stores 3072-dimensional vectors from text-embedding-3-large
 */

import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const url = process.env.QDRANT_URL!;
const apiKey = process.env.QDRANT_API_KEY!;

export const qdrant = new QdrantClient({ url, apiKey });

/**
 * Ensure Qdrant collection exists with correct vector dimensions
 * If collection exists with wrong dimensions, recreate it
 *
 * @param name - Collection name (default: "sbp_docs")
 * @param vectorSize - Embedding dimensions (default: 3072 for text-embedding-3-large)
 * @returns Collection name
 */
export async function ensureCollection(name = "sbp_docs", vectorSize = 3072) {
   const cols = await qdrant.getCollections();
   const exists = cols.collections?.some((c) => c.name === name);

   if (exists) {
      // Validate vector dimensions match embedding model
      const info = await qdrant.getCollection(name);
      const currentSize =
         typeof info.config.params.vectors === "object" &&
         "size" in info.config.params.vectors
            ? info.config.params.vectors.size
            : null;

      if (currentSize !== vectorSize) {
         console.log(
            `Deleting collection '${name}' (wrong vector size: ${currentSize} vs ${vectorSize})`
         );
         await qdrant.deleteCollection(name);
         await qdrant.createCollection(name, {
            vectors: { size: vectorSize, distance: "Cosine" },
         });
         console.log(
            `Created collection '${name}' with vector size ${vectorSize}`
         );
      }
   } else {
      // Create new collection with Cosine distance metric
      await qdrant.createCollection(name, {
         vectors: { size: vectorSize, distance: "Cosine" },
      });
      console.log(
         `Created collection '${name}' with vector size ${vectorSize}`
      );
   }

   return name;
}
