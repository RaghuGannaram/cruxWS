import logger from "@src/configs/logger.config";
import openAIService from "@src/services/openai.service";
import pineconeService from "@src/services/pinecone.service";

import { catchAsyncBusinessError } from "@src/utils/application-errors";

const chat = catchAsyncBusinessError(async function (query: string): Promise<{ answer: string }> {
    logger.info("Chat request received", { query });

  const queryEmbeddingVec = await openAIService.getEmbedding(query);
  const results = await pineconeService.queryEmbedding(queryEmbeddingVec);

  const context = results
    .map((r) => r.metadata?.["text"] ?? "")
    .join("\n\n");
  const prompt = `Context:\n${context}\n\nQuestion: ${query}`;

  const answer = await openAIService.askOpenAI(prompt);

  return { answer: answer ?? "No answer found" };
});

export default { chat };
