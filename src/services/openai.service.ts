import OpenAI from "openai";
import { getOpenAIAPIKey } from "@src/utils/env-info";

const openai = new OpenAI({
    apiKey: getOpenAIAPIKey(),
});

async function getEmbedding(text: any) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small", // Switch to a model with 512 dimensions
        input: text,
        dimensions: 512
    });
    console.log("Embedding length:", response?.data[0]?.embedding.length);
    return response.data?.[0]?.embedding ?? null;
}

async function askOpenAI(prompt: any) {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "Answer based on the document below." },
            { role: "user", content: prompt },
        ],
    });

    return response.choices?.[0]?.message?.content ?? null;
}

export default {
    getEmbedding,
    askOpenAI,
};
