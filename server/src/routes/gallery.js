import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listGalleryImages } from "../controllers/galleryController.js";

const router = Router();

router.get("/", asyncHandler(listGalleryImages));

export default router;
