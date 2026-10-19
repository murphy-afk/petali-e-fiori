// Mounts one router per resource listed in ROADMAP.md section 5.3. Route files
// never touch the database, all data access lives in the controllers.
import { Router } from "express";
import healthRouter from "./health.js";
import settingsRouter from "./settings.js";
import pagesRouter from "./pages.js";
import servicesRouter from "./services.js";
import bouquetsRouter from "./bouquets.js";
import decorationsRouter from "./decorations.js";
import priceExamplesRouter from "./priceExamples.js";
import galleryRouter from "./gallery.js";
import partnersRouter from "./partners.js";
import { createContactRouter } from "./contact.js";

export function createApiRouter(options = {}) {
  const router = Router();
  router.use("/health", healthRouter);
  router.use("/settings", settingsRouter);
  router.use("/pages", pagesRouter);
  router.use("/services", servicesRouter);
  router.use("/bouquets", bouquetsRouter);
  router.use("/decorations", decorationsRouter);
  router.use("/price-examples", priceExamplesRouter);
  router.use("/gallery", galleryRouter);
  router.use("/partners", partnersRouter);
  router.use("/contact", createContactRouter(options));
  return router;
}
