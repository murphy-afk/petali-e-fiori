import { query } from "../db.js";

// Used by uptime monitors and by the deployment checklist.
export async function getHealth(req, res) {
  let database = "up";
  try {
    await query("SELECT 1");
  } catch (error) {
    database = "down";
  }
  const up = database === "up";
  res.status(up ? 200 : 503).json({
    status: up ? "ok" : "error",
    database,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
