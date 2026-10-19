import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getHealth } from "../controllers/healthController.js";

const router = Router();

router.get("/", asyncHandler(getHealth));

export default router;
