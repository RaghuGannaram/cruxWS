import uploadRouter from "@src/routes/upload.route";
import chatRouter from "@src/routes/chat.route";
import express from "express";
import type { Router } from "express";

const router: Router = express.Router();

router.use("/upload", uploadRouter);

router.use("/chat", chatRouter);

export default router;
