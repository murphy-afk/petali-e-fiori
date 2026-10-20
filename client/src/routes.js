// Canonical site routes. The same paths are used by the sitemap generator on
// the server (server/src/seo/sitemap.js reads pages and services slugs), so
// the React router and the sitemap can never drift apart.

// Services, they carry the full name used as the page title.
export const serviceRoutes = [
  { path: "/chiesa", slug: "chiesa", label: "Chiesa" },
  { path: "/comune", slug: "comune", label: "Comune" },
  { path: "/bouquet", slug: "bouquet", label: "Bouquet" },
  { path: "/decorazioni-varie", slug: "decorazioni-varie", label: "Decorazioni Varie" },
  { path: "/retromacchina", slug: "retromacchina", label: "Retromacchina" },
  { path: "/bottoniere", slug: "bottoniere", label: "Bottoniere" },
  { path: "/centrotavola", slug: "centrotavola", label: "Centrotavola" },
  { path: "/meeting", slug: "meeting", label: "Allestimenti per Meeting" },
];

// Static pages served from the pages table.
export const pageRoutes = [
  { path: "/chi-siamo", slug: "chi-siamo", label: "Chi siamo" },
  { path: "/dove-siamo", slug: "dove-siamo", label: "Dove siamo" },
  { path: "/preventivi", slug: "preventivi", label: "Preventivi" },
  { path: "/progetti-virtuali", slug: "progetti-virtuali", label: "Progetti Virtuali" },
  { path: "/contatti", slug: "contatti", label: "Contatti" },
];

// Header navigation: the eight services plus preventivi, gallery and
// contatti, the shorter labels keep one row on a desktop screen.
export const headerNav = [
  { path: "/chiesa", label: "Chiesa" },
  { path: "/comune", label: "Comune" },
  { path: "/bouquet", label: "Bouquet" },
  { path: "/decorazioni-varie", label: "Decorazioni" },
  { path: "/retromacchina", label: "Retromacchina" },
  { path: "/bottoniere", label: "Bottoniere" },
  { path: "/centrotavola", label: "Centrotavola" },
  { path: "/meeting", label: "Meeting" },
  { path: "/preventivi", label: "Preventivi" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contatti", label: "Contatti" },
];

// Footer navigation: the rest of the site, as on the old footer.
export const footerNav = [
  { path: "/chi-siamo", label: "Chi siamo" },
  { path: "/dove-siamo", label: "Dove siamo" },
  { path: "/progetti-virtuali", label: "Progetti Virtuali" },
  { path: "/preventivi", label: "Preventivi" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contatti", label: "Contatti" },
];

// Every public path, used by the 404 helper and by the tests of later sessions.
export const allPaths = [
  "/",
  ...serviceRoutes.map((route) => route.path),
  ...pageRoutes.map((route) => route.path),
  "/gallery",
];

export function serviceBySlug(slug) {
  return serviceRoutes.find((route) => route.slug === slug) || null;
}

export function pageBySlug(slug) {
  return pageRoutes.find((route) => route.slug === slug) || null;
}
