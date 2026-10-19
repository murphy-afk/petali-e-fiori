import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listSettings } from "../controllers/settingsController.js";

const router = Router();

router.get("/", asyncHandler(listSettings));

export default router;
