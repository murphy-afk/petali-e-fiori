// Entry point: starts the HTTP server and shuts it down cleanly so the
// database pool is always closed.
import { createApp } from "./app.js";
import { config } from "./config.js";
import { closePool } from "./db.js";

const app = createApp();
const server = app.listen(config.port, () => {
  console.log("Petali e Fiori API listening on http://localhost:" + config.port);
});

let closing = false;

async function shutdown(signal) {
  if (closing) return;
  closing = true;
  console.log(signal + " received, closing the server.");
  server.close(async () => {
    try {
      await closePool();
    } catch (error) {
      console.error("[shutdown] " + error.message);
    }
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", reason);
});
