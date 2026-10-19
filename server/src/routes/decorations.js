import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listDecorations } from "../controllers/decorationsController.js";

const router = Router();

router.get("/", asyncHandler(listDecorations));

export default router;
