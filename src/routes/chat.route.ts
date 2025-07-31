import chatController from "@src/controllers/chat.controller";
import express, { type Router } from "express";

const router: Router = express.Router();

router.post("/", chatController.chat);

export default router;
