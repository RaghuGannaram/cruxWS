import catchAsyncError from "@src/middlewares/catch-async-error.middleware";
import uploadBusinessService from "@src/services/upload.business";
import type { IController } from "@src/types";
import { HttpError, HttpErrors } from "@src/utils/application-errors";
import type { Request, Response } from "express";

const upload: IController = catchAsyncError(async function (req: Request, res: Response) {
    if (!req.file) {
        throw new HttpError(400, HttpErrors.BAD_REQUEST, "File is required");
    }

    await uploadBusinessService.upload(req.file);

    res.status(200).json({
        message: "File uploaded and processed successfully",
    });
});

export default { upload };
