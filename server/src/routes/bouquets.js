import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listBouquets } from "../controllers/bouquetsController.js";

const router = Router();

router.get("/", asyncHandler(listBouquets));

export default router;
