// Allows the configured origins (the Vite dev server by default) to call the
// API from the browser. Same origin deployments need no headers at all.
export function createCors(origins) {
  const allowed = new Set(origins);
  return (req, res, next) => {
    res.setHeader("Vary", "Origin");
    const origin = req.headers.origin;
    if (origin && allowed.has(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Max-Age", "86400");
    }
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }
    next();
  };
}
