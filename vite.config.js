import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";
import { wellKnownDevToolsPlugin } from "./vite.well-known.js";

export default defineConfig({
  plugins: [wellKnownDevToolsPlugin(), tailwindcss(), reactRouter()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target:
          process.env.VITE_API_PROXY_TARGET || "https://console.hijazworld.com",
        changeOrigin: true,
        secure: true,
        rewrite: (requestPath) => requestPath.replace(/^\/api/, ""),
      },
    },
  },
});
