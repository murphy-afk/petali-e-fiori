// Builds the static preview bundle used to show the site to the client on a
// host that cannot run Node or MySQL, for example GitHub Pages. It has three
// steps: snapshot every answer of the JSON API into one file, run the Vite
// build with the snapshot flag on, then write the files the static host needs
// into the output folder. The normal build is untouched, this script is the
// only place that produces a preview.
//
//   npm run build:preview
//   npm run build:preview -- --base=/petali-e-fiori/
//
// The base is the subfolder the site lives in, it must start and end with a
// slash and is "/" for a site served at the root of its domain.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "../server/src/app.js";
import { closePool } from "../server/src/db.js";
import { pageRoutes, serviceRoutes } from "../client/src/routes.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "client");
const outDir = path.join(clientDir, "dist");

function readBase() {
  const flag = process.argv.find((arg) => arg.startsWith("--base="));
  const raw = flag ? flag.slice("--base=".length) : process.env.VITE_BASE || "/";
  const withLeading = raw.startsWith("/") ? raw : "/" + raw;
  return withLeading.endsWith("/") ? withLeading : withLeading + "/";
}

// Every request path the client makes, in the same shape the API client builds
// them, so a lookup in the snapshot never misses because of a formatting
// difference.
function buildEndpointList() {
  const paths = [
    "/api/health",
    "/api/settings",
    "/api/pages",
    "/api/services",
    "/api/bouquets",
    "/api/decorations",
    "/api/price-examples",
    "/api/gallery",
    "/api/partners",
  ];

  for (const route of pageRoutes) paths.push("/api/pages/" + route.slug);
  for (const route of serviceRoutes) paths.push("/api/services/" + route.slug);
  // The gallery category of a service, the photo strips ask for it.
  for (const route of serviceRoutes) {
    if (route.galleryCategory) {
      paths.push("/api/gallery?category=" + route.galleryCategory);
    }
  }

  return [...new Set(paths)];
}

// Boots the real Express application on an unused port so the snapshot is
// produced by the same code the live site runs, then asks it for every path.
async function snapshotApi() {
  const app = createApp({ logRequests: false });
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const base = "http://127.0.0.1:" + server.address().port;

  const snapshot = {};
  try {
    for (const apiPath of buildEndpointList()) {
      const response = await fetch(base + apiPath, {
        headers: { Accept: "application/json" },
      });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(apiPath + " answered " + response.status + ": " + text.slice(0, 200));
      }
      try {
        snapshot[apiPath] = JSON.parse(text);
      } catch (error) {
        throw new Error(apiPath + " did not answer JSON: " + text.slice(0, 200));
      }
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await closePool();
  }

  return snapshot;
}

function runViteBuild(base) {
  const viteBin = path.join(clientDir, "node_modules", "vite", "bin", "vite.js");
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [viteBin, "build"], {
      cwd: clientDir,
      env: { ...process.env, VITE_SNAPSHOT: "1", VITE_BASE: base },
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error("vite build exited with code " + code));
    });
  });
}

// GitHub Pages answers unknown paths with 404.html, so that file carries the
// visitor back into the single page app. The path is passed in the query
// string and rewritten into a real URL by main.jsx before React renders.
function build404(base) {
  return [
    "<!doctype html>",
    '<html lang="it">',
    "  <head>",
    '    <meta charset="UTF-8" />',
    "    <title>Petali e Fiori</title>",
    "    <script>",
    "      (function () {",
    '        var base = "' + base + '";',
    "        var path = window.location.pathname;",
    '        var relative = base !== "/" && path.indexOf(base) === 0',
    "          ? path.slice(base.length - 1)",
    "          : path;",
    '        var target = base + "?/" + relative.replace(/^\\/+/, "")',
    "          + window.location.search + window.location.hash;",
    "        window.location.replace(target);",
    "      })();",
    "    </script>",
    "  </head>",
    "  <body></body>",
    "</html>",
    "",
  ].join("\n");
}

// The preview is a temporary copy for the client to look at, so it tells
// crawlers to stay away and keeps the real site as the only indexed one.
function buildRobots() {
  return ["User-agent: *", "Disallow: /", ""].join("\n");
}

async function main() {
  const base = readBase();
  console.log("Snapshotting the API...");
  const snapshot = await snapshotApi();
  const paths = Object.keys(snapshot);
  console.log("Snapshot of " + paths.length + " endpoints captured.");

  console.log("Building the client with the snapshot flag, base " + base);
  await runViteBuild(base);

  await mkdir(outDir, { recursive: true });
  await Promise.all([
    writeFile(path.join(outDir, "api-snapshot.json"), JSON.stringify(snapshot), "utf8"),
    writeFile(path.join(outDir, "404.html"), build404(base), "utf8"),
    writeFile(path.join(outDir, "robots.txt"), buildRobots(), "utf8"),
  ]);

  console.log("Preview ready in client/dist, with 404.html and a disallow all robots.txt.");
  console.log("The snapshot is the public content of the shop, nothing private is in it.");
}

main().catch((error) => {
  console.error("[preview] " + error.message);
  process.exitCode = 1;
});
