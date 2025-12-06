/**
 * Text Chunking Utilities
 *
 * Provides functions to split text into overlapping chunks for embedding
 * Overlap ensures context is preserved across chunk boundaries
 */

export interface ChunkMetadata {
   url: string;
   section?: string;
   heading?: string;
   title?: string;
}

export interface Chunk {
   text: string;
   metadata: ChunkMetadata;
}

/**
 * Simple text chunking with word-based sliding window
 *
 * @param text - Text to chunk
 * @param size - Words per chunk (default: 300)
 * @param overlap - Overlapping words between chunks (default: 50)
 * @returns Array of text chunks
 */
export function chunkText(text: string, size = 300, overlap = 50): string[] {
   const words = text.replace(/\s+/g, " ").trim().split(" ");
   const chunks: string[] = [];
   let i = 0;
   while (i < words.length) {
      chunks.push(words.slice(i, i + size).join(" "));
      i += size - overlap;
   }
   return chunks;
}

/**
 * Smart chunking with metadata extraction
 * Attempts to detect sections and headings for better context
 *
 * @param text - Text to chunk
 * @param url - Source URL for metadata
 * @param size - Words per chunk (default: 250)
 * @param overlap - Overlapping words (default: 40)
 * @returns Array of chunks with metadata
 */
export function smartChunkText(
   text: string,
   url: string,
   size = 250,
   overlap = 40
): Chunk[] {
   const chunks: Chunk[] = [];

   // Extract title from first 200 chars (usually contains page title)
   const title = text.substring(0, 200).trim();

   // Split into words for sliding window chunking
   const words = text.split(/\s+/);
   const totalWords = words.length;

   let i = 0;
   let chunkIndex = 0;

   while (i < totalWords) {
      const chunkWords = words.slice(i, i + size);
      const chunkText = chunkWords.join(" ").trim();

      // Skip chunks that are too small
      if (chunkText.length < 50) {
         i += size - overlap;
         continue;
      }

      // Detect section and heading from chunk content
      let section = "";
      let heading = "";

      // Look for title-case patterns like "What We Do", "Our Mission"
      const sentences = chunkText
         .split(/[.!?]+/)
         .filter((s) => s.trim().length > 0);

      for (let j = 0; j < Math.min(3, sentences.length); j++) {
         const sentence = sentences[j].trim();
         const sentenceWords = sentence.split(/\s+/);

         // Heading heuristic: Short (2-8 words), mostly capitalized
         if (sentenceWords.length >= 2 && sentenceWords.length <= 8) {
            const firstWord = sentenceWords[0];
            if (/^[A-Z]/.test(firstWord)) {
               const capitalCount = sentenceWords.filter((w) =>
                  /^[A-Z]/.test(w)
               ).length;
               if (capitalCount / sentenceWords.length > 0.5) {
                  if (!section && chunkIndex === 0) {
                     section = sentence.substring(0, 100);
                  } else if (!heading) {
                     heading = sentence.substring(0, 100);
                  }
               }
            }
         }
      }

      // Store chunk with extracted metadata
      chunks.push({
         text: chunkText,
         metadata: {
            url,
            title: title || undefined,
            section: section || undefined,
            heading: heading || undefined,
         },
      });

      chunkIndex++;
      i += size - overlap;
   }

   return chunks;
}
