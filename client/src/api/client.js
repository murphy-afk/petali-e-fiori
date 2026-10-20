// Thin fetch wrapper around the JSON API. In development Vite proxies /api to
// the Express server, in production Express serves the built client, so the
// same relative paths work in both cases and no CORS setup is needed.

const API_BASE = import.meta.env.VITE_API_BASE || "";

export class ApiError extends Error {
  constructor(message, status, fields) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields || {};
  }
}

async function request(path, options) {
  let response;
  try {
    response = await fetch(API_BASE + path, {
      headers: { Accept: "application/json" },
      ...options,
    });
  } catch (error) {
    throw new ApiError(
      "Impossibile contattare il server. Controllate la connessione e riprovate.",
      0
    );
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  if (!response.ok) {
    const message =
      payload && payload.error
        ? payload.error
        : "Si è verificato un errore. Riprovate più tardi.";
    throw new ApiError(message, response.status, payload && payload.fields);
  }

  return payload;
}

export function getJSON(path) {
  return request(path);
}

export function postJSON(path, body) {
  return request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
}

// One method per endpoint of the API, see README.md.
export const api = {
  health: () => getJSON("/api/health"),
  settings: () => getJSON("/api/settings"),
  pages: () => getJSON("/api/pages"),
  page: (slug) => getJSON("/api/pages/" + encodeURIComponent(slug)),
  services: () => getJSON("/api/services"),
  service: (slug) => getJSON("/api/services/" + encodeURIComponent(slug)),
  bouquets: () => getJSON("/api/bouquets"),
  decorations: () => getJSON("/api/decorations"),
  priceExamples: () => getJSON("/api/price-examples"),
  gallery: (category) =>
    getJSON(
      "/api/gallery" +
        (category ? "?category=" + encodeURIComponent(category) : "")
    ),
  partners: () => getJSON("/api/partners"),
  contact: (payload) => postJSON("/api/contact", payload),
};
