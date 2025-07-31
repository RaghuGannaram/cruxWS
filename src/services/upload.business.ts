import logger from "@src/configs/logger.config";
import openAIService from "@src/services/openai.service";
import pineconeService from "@src/services/pinecone.service";
import pdfService from "@src/services/pdf.service";
import { catchAsyncBusinessError, BusinessError, BusinessErrors } from "@src/utils/application-errors";

const upload = catchAsyncBusinessError(async function (file) {
    logger.info(`Processing file: ${file.originalname, file}`);

    const text = await pdfService
        .parse(file.buffer)
        .then((data) => data.text)
        .catch((err) => {
            logger.error(`Error parsing PDF: ${err.message}`);
            throw new BusinessError(BusinessErrors.DATA_INTEGRITY_ERROR, "Failed to parse PDF file");
        });

    if (!text) {
        throw new BusinessError(BusinessErrors.DATA_INTEGRITY_ERROR, "Text is required");
    }

    // Assuming getEmbedding is a function that retrieves embeddings for the text
    const { getEmbedding } = openAIService;

    // Chunk the text into manageable pieces
    const chunks = text.match(/(.|[\r\n]){1,1000}/g); // simple chunking

    if (!chunks) {
        throw new BusinessError(BusinessErrors.DATA_INTEGRITY_ERROR, "Failed to chunk the text");
    }
    const embeddings = await Promise.all(
        chunks.map(async (chunk: any) => await getEmbedding(chunk))
    );
    const vectors = embeddings
        .map((embedding, i) => {
            if (!embedding || embedding.length === 0) return null;
            return {
                id: `${file.originalname}-${i}`,
                values: embedding,
                metadata: { text: chunks[i] },
            };
        })
        .filter((v) => v !== null);

    if (!vectors || vectors.length === 0) {
        throw new BusinessError(BusinessErrors.DATA_INTEGRITY_ERROR, "No vectors generated from text");
    }

    await pineconeService.upsertEmbeddings(vectors);

    logger.info(`Successfully uploaded and processed file: ${file.originalname}`);

    return;
});

export default { upload };
