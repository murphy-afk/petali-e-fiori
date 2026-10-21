import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development the API runs on its own port, the proxy keeps every
// request same origin so the client code is identical to production, where
// Express serves the built files.
const apiTarget = process.env.VITE_API_TARGET || "http://localhost:3001";

// Base path of the built site. It stays at the root for the normal build and
// for Express, and scripts/preview.mjs passes the subfolder of a static host
// that lives inside one, such as a GitHub Pages project site.
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": { target: apiTarget, changeOrigin: true },
      "/sitemap.xml": { target: apiTarget, changeOrigin: true },
      "/robots.txt": { target: apiTarget, changeOrigin: true },
    },
  },
});
