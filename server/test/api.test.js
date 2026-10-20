// Acceptance tests for the API. They run against the real database, so
// `npm run seed` must have been applied first. Contact rows created here are
// always removed again, the table stays empty for the shop.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createApp } from "../src/app.js";
import { config } from "../src/config.js";
import { query, closePool } from "../src/db.js";

const CONTACT_EMAIL = "test-api@example.it";
const HONEYPOT_EMAIL = "test-honeypot@example.it";

let server;
let limitedServer;
let limitedBase;

async function listen(app) {
  const instance = app.listen(0, "127.0.0.1");
  await once(instance, "listening");
  return instance;
}

function url(instance, path) {
  return "http://127.0.0.1:" + instance.address().port + path;
}

async function get(path) {
  const res = await fetch(url(server, path));
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch (error) {
    body = text;
  }
  return { status: res.status, type: res.headers.get("content-type") || "", body };
}

async function post(path, payload) {
  const res = await fetch(url(server, path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
  let body = null;
  try {
    body = await res.json();
  } catch (error) {
    body = null;
  }
  return { status: res.status, body };
}

before(async () => {
  server = await listen(createApp({ logRequests: false }));
  limitedServer = await listen(
    createApp({ logRequests: false, contactRateLimit: 3 })
  );
  limitedBase = url(limitedServer, "");
});

test("the dev client origin is allowed by CORS", async () => {
  const res = await fetch(url(server, "/api/health"), {
    headers: { Origin: "http://localhost:5173" },
  });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("access-control-allow-origin"), "http://localhost:5173");

  const blocked = await fetch(url(server, "/api/health"), {
    headers: { Origin: "http://evil.example" },
  });
  assert.equal(blocked.headers.get("access-control-allow-origin"), null);
});

after(async () => {
  await query("DELETE FROM contact_messages WHERE email IN (?, ?)", [
    CONTACT_EMAIL,
    HONEYPOT_EMAIL,
  ]).catch(() => {});
  for (const instance of [server, limitedServer]) {
    if (!instance) continue;
    if (typeof instance.closeAllConnections === "function") {
      instance.closeAllConnections();
    }
    instance.close();
  }
  await closePool();
});

test("health endpoint reports the database state", async () => {
  const res = await get("/api/health");
  assert.equal(res.status, 200);
  assert.equal(res.body.status, "ok");
  assert.equal(res.body.database, "up");
});

test("settings expose the shop facts", async () => {
  const res = await get("/api/settings");
  assert.equal(res.status, 200);
  assert.equal(Object.keys(res.body.settings).length, 30);
  assert.equal(res.body.settings["brand_name"], "Petali e Fiori");
  assert.equal(res.body.settings["phone_landline"], "02 23167849");
  assert.equal(res.body.settings["address_street"], "Via Arzaga 24");
});

test("pages list and single page", async () => {
  const list = await get("/api/pages");
  assert.equal(list.status, 200);
  assert.equal(list.body.pages.length, 5);
  assert.equal(list.body.pages[0].slug, "chi-siamo");
  assert.ok(!("body" in list.body.pages[0]), "the list must not carry the long body");

  const single = await get("/api/pages/chi-siamo");
  assert.equal(single.status, 200);
  assert.equal(single.body.page.slug, "chi-siamo");
  assert.ok(single.body.page.body.length > 200);

  const missing = await get("/api/pages/pagina-inesistente");
  assert.equal(missing.status, 404);
  assert.ok(missing.body.error);
});

test("services list and single service", async () => {
  const list = await get("/api/services");
  assert.equal(list.status, 200);
  assert.equal(list.body.services.length, 8);
  assert.equal(list.body.services[0].slug, "chiesa");

  const single = await get("/api/services/chiesa");
  assert.equal(single.status, 200);
  assert.equal(single.body.service.name, "Chiesa");
  assert.ok(single.body.service.body.length > 200);

  const missing = await get("/api/services/servizio-inesistente");
  assert.equal(missing.status, 404);
});

test("bouquets keep their price ranges", async () => {
  const res = await get("/api/bouquets");
  assert.equal(res.status, 200);
  assert.equal(res.body.bouquets.length, 8);
  const renoir = res.body.bouquets.find((item) => item.slug === "renoir");
  assert.equal(renoir.price_min, 90);
  assert.equal(renoir.price_max, 300);

  const filtered = await get("/api/bouquets?style=formale");
  assert.equal(filtered.body.bouquets.length, 3);
  assert.ok(
    filtered.body.bouquets.every((item) => item.style === "formale"),
    "the style filter must return formal bouquets only"
  );
});

test("decorations list", async () => {
  const res = await get("/api/decorations");
  assert.equal(res.status, 200);
  assert.equal(res.body.decorations.length, 13);
  assert.equal(res.body.decorations[0].name, "Decorativa");
});

test("price examples keep their item lists", async () => {
  const res = await get("/api/price-examples");
  assert.equal(res.status, 200);
  assert.equal(res.body.priceExamples.length, 9);
  const june = res.body.priceExamples.find((item) => item.price === 299);
  assert.ok(june, "the June wedding example must be there");
  assert.ok(Array.isArray(june.items));
  assert.ok(june.items.length > 0);
});

test("partners list", async () => {
  const res = await get("/api/partners");
  assert.equal(res.status, 200);
  assert.equal(res.body.partners.length, 1);
  assert.equal(res.body.partners[0].name, "Autonoleggio Bellani");
});

test("gallery returns images and category counts", async () => {
  const res = await get("/api/gallery");
  assert.equal(res.status, 200);
  assert.ok(res.body.images.length > 0);
  assert.ok(res.body.images.every((image) => image.alt.length > 0));

  const total = res.body.categories.reduce((sum, item) => sum + item.count, 0);
  assert.equal(total, res.body.images.length);

  const filtered = await get("/api/gallery?category=bouquet");
  assert.equal(filtered.status, 200);
  assert.ok(filtered.body.images.length > 0);
  assert.ok(
    filtered.body.images.every((image) => image.category === "bouquet"),
    "the category filter must return bouquet photos only"
  );
});

test("contact rejects invalid submissions", async () => {
  const before = await query(
    "SELECT COUNT(*) AS count FROM contact_messages WHERE email = ?",
    [CONTACT_EMAIL]
  );

  const empty = await post("/api/contact", {});
  assert.equal(empty.status, 400);
  assert.ok(empty.body.fields.name);
  assert.ok(empty.body.fields.email);
  assert.ok(empty.body.fields.message);

  const badEmail = await post("/api/contact", {
    name: "Test",
    email: "non-una-email",
    message: "Messaggio di prova per il test dell'API.",
  });
  assert.equal(badEmail.status, 400);
  assert.ok(badEmail.body.fields.email);

  const after = await query(
    "SELECT COUNT(*) AS count FROM contact_messages WHERE email = ?",
    [CONTACT_EMAIL]
  );
  assert.equal(Number(after[0].count), Number(before[0].count));
});

test("contact honeypot is answered but never stored", async () => {
  const res = await post("/api/contact", {
    name: "Bot",
    email: HONEYPOT_EMAIL,
    message: "Spam automatico",
    website: "http://spam.example",
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.ok, true);

  const rows = await query(
    "SELECT COUNT(*) AS count FROM contact_messages WHERE email = ?",
    [HONEYPOT_EMAIL]
  );
  assert.equal(Number(rows[0].count), 0);
});

test("contact stores a valid message", async () => {
  const payload = {
    name: "Test Autore",
    email: CONTACT_EMAIL,
    phone: "331 0000000",
    wedding_date: "2027-06-12",
    venue: "Chiesa di prova",
    message: "Messaggio di prova inviato dai test automatici dell'API.",
  };
  try {
    const res = await post("/api/contact", payload);
    assert.equal(res.status, 201);
    assert.equal(res.body.ok, true);

    const rows = await query(
      "SELECT name, wedding_date, venue FROM contact_messages WHERE email = ?",
      [CONTACT_EMAIL]
    );
    assert.equal(rows.length, 1);
    assert.equal(rows[0].name, "Test Autore");
    assert.equal(rows[0].wedding_date, "2027-06-12");
    assert.equal(rows[0].venue, "Chiesa di prova");
  } finally {
    await query("DELETE FROM contact_messages WHERE email = ?", [CONTACT_EMAIL]);
  }
});

test("contact rate limit answers 429 after the allowed attempts", async () => {
  const statuses = [];
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const res = await fetch(limitedBase + "/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    statuses.push(res.status);
    if (attempt === 3) assert.equal(res.headers.get("retry-after"), "900");
  }
  assert.deepEqual(statuses, [400, 400, 400, 429, 429]);
});

test("an unknown api route answers 404 as JSON", async () => {
  const res = await get("/api/risorsa-inesistente");
  assert.equal(res.status, 404);
  assert.equal(res.body.error, "Risorsa non trovata.");
});

test("a broken JSON body answers 400", async () => {
  const res = await post("/api/contact", "{questo non e' json");
  assert.equal(res.status, 400);
  assert.ok(res.body.error);
});

test("sitemap lists every published route", async () => {
  const res = await fetch(url(server, "/sitemap.xml"));
  const xml = await res.text();
  assert.equal(res.status, 200);
  assert.ok(res.headers.get("content-type").includes("application/xml"));
  assert.ok(xml.includes("<?xml version="));
  assert.ok(xml.includes("</urlset>"));
  assert.ok(xml.includes("<loc>" + config.siteUrl + "/</loc>"));
  assert.ok(xml.includes("<loc>" + config.siteUrl + "/chi-siamo</loc>"));
  assert.ok(xml.includes("<loc>" + config.siteUrl + "/chiesa</loc>"));
  assert.ok(xml.includes("<loc>" + config.siteUrl + "/gallery</loc>"));
  const urlCount = (xml.match(/<loc>/g) || []).length;
  assert.equal(urlCount, 1 + 5 + 8 + 1);
});

test("robots points at the sitemap", async () => {
  const res = await fetch(url(server, "/robots.txt"));
  const text = await res.text();
  assert.equal(res.status, 200);
  assert.ok(text.includes("User-agent: *"));
  assert.ok(text.includes("Allow: /"));
  assert.ok(text.includes("Sitemap: " + config.siteUrl + "/sitemap.xml"));
});
