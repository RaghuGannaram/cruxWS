import { Pinecone } from "@pinecone-database/pinecone";
import { getPineconeConfigs } from "@src/utils/env-info"; // assumes aliasing is set correctly

const { apiKey, index: indexName } = getPineconeConfigs();

const pinecone = new Pinecone({ apiKey });
const index = pinecone.Index(indexName);

/**
 * Upsert a batch of vector embeddings into Pinecone
 * @param {Array<{ id: string, values: number[], metadata?: Record<string, any> }>} vectors
 */
async function upsertEmbeddings(vectors: Array<{ id: string; values: number[]; metadata?: Record<string, any> }>) {
    if (!vectors || vectors.length === 0) return;

    try {
        await index.upsert(vectors); // Pass the array directly if it matches the expected structure
    } catch (err) {
        console.error("Pinecone upsert failed:", err);
        throw err;
    }
}

/**
 * Query Pinecone with a vector embedding
 * @param {number[]} embedding - The query embedding vector
 * @param {number} topK - Number of top matches to return
 * @returns {Promise<Array>} - Matched items
 */
async function queryEmbedding(embedding: any, topK = 5) {
    try {
        const result = await index.query({
            vector: embedding,
            topK,
            includeMetadata: true,
        });
        return result.matches || [];
    } catch (err) {
        console.error("Pinecone query failed:", err);
        throw err;
    }
}

export default {
    upsertEmbeddings,
    queryEmbedding,
};
