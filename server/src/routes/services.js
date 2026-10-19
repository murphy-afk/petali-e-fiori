import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { listServices, getService } from "../controllers/servicesController.js";

const router = Router();

router.get("/", asyncHandler(listServices));
router.get("/:slug", asyncHandler(getService));

export default router;
