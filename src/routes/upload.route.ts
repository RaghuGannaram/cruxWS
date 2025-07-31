import uploadController from "@src/controllers/upload.controller";
import express, { type Router } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router: Router = express.Router();

router.post("/", upload.single("file"), uploadController.upload);

export default router;
