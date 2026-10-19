// Builds the Express application: middleware first, then the SEO routes,
// then the JSON API, and finally the 404 and error handlers.
import express from "express";
import { config } from "./config.js";
import { createApiRouter } from "./routes/index.js";
import seoRouter from "./routes/seo.js";
import { requestLogger } from "./middleware/logger.js";
import { createCors } from "./middleware/cors.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

export function createApp(options = {}) {
  const app = express();
  const logRequests =
    options.logRequests === undefined ? config.env !== "test" : options.logRequests;

  app.disable("x-powered-by");
  // When the app runs behind a reverse proxy, enable "trust proxy" so req.ip
  // (and the contact rate limit) see the real client address instead of the proxy.
  app.use(createCors(config.clientOrigins));
  if (logRequests) app.use(requestLogger());
  app.use(express.json({ limit: "32kb" }));

  app.use(seoRouter);
  app.use("/api", createApiRouter(options));

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
