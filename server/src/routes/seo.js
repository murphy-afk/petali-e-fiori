import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { sendRobots, sendSitemap } from "../controllers/seoController.js";

const router = Router();

router.get("/sitemap.xml", asyncHandler(sendSitemap));
router.get("/robots.txt", asyncHandler(sendRobots));

export default router;
