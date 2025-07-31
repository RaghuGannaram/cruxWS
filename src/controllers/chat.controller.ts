import logger from "@src/configs/logger.config";
import catchAsyncError from "@src/middlewares/catch-async-error.middleware";
import chatBusinessService from "@src/services/chat.business";
import type { IController } from "@src/types";
import { HttpError, HttpErrors } from "@src/utils/application-errors";
import type { Request, Response } from "express";

const chat: IController = catchAsyncError(async function (req: Request, res: Response) {
    logger.info("Chat request received", { body: req.body });

    if (!req.body || !req.body.query) {
        throw new HttpError(400, HttpErrors.BAD_REQUEST, "Query is required");
    }

    const { answer } = await chatBusinessService.chat(req.body.query);

    res.status(200).json({
        message: "Chat response generated successfully",
        data: {
            answer,
        },
    });
});

export default { chat };
