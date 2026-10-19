import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listPartners } from "../controllers/partnersController.js";

const router = Router();

router.get("/", asyncHandler(listPartners));

export default router;
