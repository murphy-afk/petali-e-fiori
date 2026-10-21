// Canonical site routes. The same paths are used by the sitemap generator on
// the server (server/src/seo/sitemap.js reads pages and services slugs), so
// the React router and the sitemap can never drift apart.

// Services, they carry the full name used as the page title.
// galleryCategory is the gallery_images category that illustrates the service,
// null when the page builds its own photo section from the bouquets or
// decorations tables, or when the shop has no photo for it.
// related lists the slugs of the pages linked at the bottom of the page.
export const serviceRoutes = [
  {
    path: "/chiesa",
    slug: "chiesa",
    label: "Chiesa",
    galleryCategory: "chiesa",
    related: ["comune", "decorazioni-varie", "bouquet", "retromacchina"],
  },
  {
    path: "/comune",
    slug: "comune",
    label: "Comune",
    galleryCategory: "comune",
    related: ["chiesa", "decorazioni-varie", "bouquet", "centrotavola"],
  },
  {
    path: "/bouquet",
    slug: "bouquet",
    label: "Bouquet",
    galleryCategory: null,
    related: ["bottoniere", "chiesa", "centrotavola"],
  },
  {
    path: "/decorazioni-varie",
    slug: "decorazioni-varie",
    label: "Decorazioni Varie",
    galleryCategory: null,
    related: ["chiesa", "comune", "centrotavola", "meeting"],
  },
  {
    path: "/retromacchina",
    slug: "retromacchina",
    label: "Retromacchina",
    galleryCategory: "retromacchina",
    related: ["chiesa", "bouquet", "decorazioni-varie"],
  },
  {
    path: "/bottoniere",
    slug: "bottoniere",
    label: "Bottoniere",
    galleryCategory: null,
    related: ["bouquet", "chiesa", "retromacchina"],
  },
  {
    path: "/centrotavola",
    slug: "centrotavola",
    label: "Centrotavola",
    galleryCategory: "centrotavola",
    related: ["bouquet", "decorazioni-varie", "meeting"],
  },
  {
    path: "/meeting",
    slug: "meeting",
    label: "Allestimenti per Meeting",
    galleryCategory: "meeting",
    related: ["decorazioni-varie", "centrotavola"],
  },
];

// Static pages served from the pages table.
export const pageRoutes = [
  {
    path: "/chi-siamo",
    slug: "chi-siamo",
    label: "Chi siamo",
    related: ["dove-siamo", "gallery", "contatti"],
  },
  {
    path: "/dove-siamo",
    slug: "dove-siamo",
    label: "Dove siamo",
    related: ["contatti", "chi-siamo", "gallery"],
  },
  {
    path: "/preventivi",
    slug: "preventivi",
    label: "Preventivi",
    related: ["contatti", "progetti-virtuali", "bouquet"],
  },
  {
    path: "/progetti-virtuali",
    slug: "progetti-virtuali",
    label: "Progetti Virtuali",
    related: ["preventivi", "contatti", "gallery"],
  },
  {
    path: "/contatti",
    slug: "contatti",
    label: "Contatti",
    related: ["preventivi", "dove-siamo", "gallery"],
  },
];

// Header navigation: the seven wedding services grouped behind the Matrimonio
// dropdown, then the remaining top level links. The shorter labels keep one
// row on a desktop screen; headerNav may hold groups with children, while
// headerLinks below is the flat list every link of the header belongs to.
export const headerNav = [
  {
    label: "Matrimonio",
    children: [
      { path: "/chiesa", label: "Chiesa" },
      { path: "/comune", label: "Comune" },
      { path: "/bouquet", label: "Bouquet" },
      { path: "/decorazioni-varie", label: "Decorazioni" },
      { path: "/retromacchina", label: "Retromacchina" },
      { path: "/bottoniere", label: "Bottoniere" },
      { path: "/centrotavola", label: "Centrotavola" },
    ],
  },
  { path: "/meeting", label: "Meeting" },
  { path: "/preventivi", label: "Preventivi" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contatti", label: "Contatti" },
];

// Every header link with no grouping, used where a plain list is wanted.
export const headerLinks = headerNav.flatMap((item) => item.children || [item]);

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

// The gallery has no table of its own, so its route is described here and
// reused by the router, the sitemap and the related links.
export const galleryRoute = {
  path: "/gallery",
  slug: "gallery",
  label: "Gallery",
  related: ["chiesa", "decorazioni-varie", "bouquet", "contatti"],
};

export function serviceBySlug(slug) {
  return serviceRoutes.find((route) => route.slug === slug) || null;
}

export function pageBySlug(slug) {
  return pageRoutes.find((route) => route.slug === slug) || null;
}

// Every route that can be reached from the site, including the gallery which
// is not stored in the database. Used to resolve the related lists below.
const ALL_ROUTES = [
  { path: "/", slug: "home", label: "Home", related: ["chiesa", "bouquet", "preventivi", "gallery"] },
  ...serviceRoutes,
  ...pageRoutes,
  galleryRoute,
];

// Turns the related slugs of a route into link objects, dropping any slug
// that has no page so a typo in the list can never render a broken link.
export function relatedLinks(slug) {
  const route = ALL_ROUTES.find((item) => item.slug === slug);
  if (!route || !route.related) return [];

  return route.related
    .map((target) => ALL_ROUTES.find((item) => item.slug === target))
    .filter(Boolean)
    .map((item) => ({ path: item.path, label: item.label }));
}
