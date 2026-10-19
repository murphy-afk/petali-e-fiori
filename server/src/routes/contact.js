import { Router } from "express";
import { config } from "../config.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { createContact } from "../controllers/contactController.js";

// The limiter runs before validation, so every attempt to post counts and a
// flood of invalid payloads is stopped just as well.
export function createContactRouter(options = {}) {
  const router = Router();
  const max = options.contactRateLimit ?? config.contactRateLimit;
  router.post(
    "/",
    rateLimit({
      windowMs: config.contactRateWindowMs,
      max,
      message:
        "Hanno inviato troppe richieste da questo indirizzo. Riprovate tra qualche minuto.",
    }),
    asyncHandler(createContact)
  );
  return router;
}
