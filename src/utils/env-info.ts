import { LogLevel, ErrorExposureDepth } from "@src/types/index";

export function getCurrentEnv(): "development" | "production" {
    return process.env["NODE_ENV"] || "development";
}

export function getCurrentPort(): number {
    return Number(process.env["PORT"]) || 5000;
}

export function getAPIGatewayURL(): string {
    return process.env["API_GATEWAY_URL"] || "*";
}


export function getLogLevel(): LogLevel {
    return (process.env["LOG_LEVEL"] as LogLevel) || LogLevel.INFO;
}

export function getErrorExposureDepth(): ErrorExposureDepth {
    return (process.env["ERROR_EXPOSURE_DEPTH"] as ErrorExposureDepth) || ErrorExposureDepth.BUSINESS;
}


export function getOpenAIAPIKey(): string {
    const apiKey = process.env["OPENAI_API_KEY"];
    if (!apiKey) {
        throw new Error("OpenAI API key is not set in the environment variables.");
    }
    return apiKey;
}

export function getPineconeConfigs(): { apiKey: string; index: string; environment: string } {
    const apiKey = process.env["PINECONE_API_KEY"];
    const index = process.env["PINECONE_INDEX"];
    const environment = process.env["PINECONE_ENVIRONMENT"];

    if (!apiKey || !index || !environment) {
        throw new Error("Pinecone configurations are not set in the environment variables.");
    }
    return { apiKey, index, environment };
}