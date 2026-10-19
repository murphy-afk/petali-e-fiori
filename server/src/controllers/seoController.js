import { buildRobots } from "../seo/robots.js";
import { buildSitemap } from "../seo/sitemap.js";

export async function sendSitemap(req, res) {
  const xml = await buildSitemap();
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
}

export async function sendRobots(req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(buildRobots());
}
