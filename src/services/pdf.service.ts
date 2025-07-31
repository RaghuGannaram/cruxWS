import pdf from "pdf-parse";console.log("PDF parsing service initialized");
function parse(dataBuffer: Buffer): Promise<{ text: string }> {
    return pdf(dataBuffer);
}

export default { parse };
