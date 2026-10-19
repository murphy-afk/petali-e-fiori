// In memory rate limiter keyed by client IP. Enough for a single instance
// deployment, no external store needed.
function clientKey(req) {
  const ip = req.ip || (req.socket && req.socket.remoteAddress) || "unknown";
  return ip.startsWith("::ffff:") ? ip.slice(7) : ip;
}

export function rateLimit({ windowMs, max, message }) {
  const hits = new Map();

  const sweeper = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (now - entry.start >= windowMs) hits.delete(key);
    }
  }, windowMs);
  if (typeof sweeper.unref === "function") sweeper.unref();

  return (req, res, next) => {
    const key = clientKey(req);
    const now = Date.now();
    let entry = hits.get(key);
    if (!entry || now - entry.start >= windowMs) {
      entry = { count: 0, start: now };
      hits.set(key, entry);
    }
    entry.count += 1;

    res.setHeader("X-RateLimit-Limit", String(max));
    res.setHeader(
      "X-RateLimit-Remaining",
      String(Math.max(0, max - entry.count))
    );

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.start + windowMs - now) / 1000);
      res.setHeader("Retry-After", String(Math.max(1, retryAfter)));
      return res.status(429).json({
        error:
          message ||
          "Troppe richieste. Attendete qualche minuto prima di riprovare.",
      });
    }
    next();
  };
}
