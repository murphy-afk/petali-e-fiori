import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listPages, getPage } from "../controllers/pagesController.js";

const router = Router();

router.get("/", asyncHandler(listPages));
router.get("/:slug", asyncHandler(getPage));

export default router;
