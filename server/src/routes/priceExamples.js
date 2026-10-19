import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listPriceExamples } from "../controllers/priceExamplesController.js";

const router = Router();

router.get("/", asyncHandler(listPriceExamples));

export default router;
