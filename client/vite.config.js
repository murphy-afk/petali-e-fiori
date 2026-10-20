import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development the API runs on its own port, the proxy keeps every
// request same origin so the client code is identical to production, where
// Express serves the built files.
const apiTarget = process.env.VITE_API_TARGET || "http://localhost:3001";

export default defineConfig({
  plugins: [react()],
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
