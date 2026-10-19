// Loads .env from the project root and exposes the server configuration.
// Values coming from the real process environment always win over the file,
// so the same code works locally and in production.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function parseEnvFile(file) {
  const values = {};
  if (!existsSync(file)) return values;
  const raw = readFileSync(file, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function int(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function list(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const env = { ...parseEnvFile(path.join(rootDir, ".env")), ...process.env };

export const config = {
  env: env["NODE_ENV"] || "development",
  port: int(env["PORT"], 3001),
  // Public origin used for canonical links, sitemap and Open Graph tags.
  siteUrl: String(env["SITE_URL"] || "http://localhost:3001").replace(/\/+$/, ""),
  // Origins allowed to call the API from the browser during development.
  clientOrigins: list(env["CLIENT_ORIGIN"] || "http://localhost:5173"),
  // Contact form protection: N requests per IP inside the time window.
  contactRateLimit: int(env["CONTACT_RATE_LIMIT"], 10),
  contactRateWindowMs: 15 * 60 * 1000,
  db: {
    host: env["DB_HOST"] || "127.0.0.1",
    port: int(env["DB_PORT"], 3306),
    user: env["DB_USER"] || "root",
    password: env["DB_PASSWORD"] || "",
    database: env["DB_NAME"] || "petali_e_fiori",
    charset: "utf8mb4",
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true,
    // DATE and TIMESTAMP columns come back as strings, so JSON never shifts
    // a date across time zones.
    dateStrings: true,
  },
};
