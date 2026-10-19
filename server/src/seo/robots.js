// Robots file: allow everything and point crawlers at the generated sitemap.
import { config } from "../config.js";

export function buildRobots() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    "Sitemap: " + config.siteUrl + "/sitemap.xml",
    "",
  ].join("\n");
}
