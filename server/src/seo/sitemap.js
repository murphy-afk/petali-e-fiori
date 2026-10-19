// Builds the public route list from the database: static routes, then the
// published pages, then the published services. Session 3 and Session 4 use
// the same paths for the React router, so the sitemap always matches the site.
import { query } from "../db.js";
import { config } from "../config.js";

const STATIC_ROUTES = [
  { path: "/", useToday: true },
  { path: "/gallery", useToday: true, last: true },
];

function dateOnly(value, fallback) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  return fallback;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function getSiteRoutes() {
  const today = new Date().toISOString().slice(0, 10);
  const pages = await query(
    "SELECT slug, updated_at FROM pages WHERE published = 1 ORDER BY id"
  );
  const services = await query(
    "SELECT slug, updated_at FROM services WHERE published = 1 ORDER BY menu_group, sort_order, id"
  );

  const routes = [
    { path: STATIC_ROUTES[0].path, lastmod: today },
    ...pages.map((page) => ({
      path: "/" + page.slug,
      lastmod: dateOnly(page.updated_at, today),
    })),
    ...services.map((service) => ({
      path: "/" + service.slug,
      lastmod: dateOnly(service.updated_at, today),
    })),
    { path: STATIC_ROUTES[1].path, lastmod: today },
  ];
  return routes;
}

export async function buildSitemap() {
  const routes = await getSiteRoutes();
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];
  for (const route of routes) {
    lines.push("<url>");
    lines.push("<loc>" + escapeXml(config.siteUrl + route.path) + "</loc>");
    lines.push("<lastmod>" + escapeXml(route.lastmod) + "</lastmod>");
    lines.push("</url>");
  }
  lines.push("</urlset>");
  return lines.join("\n") + "\n";
}
