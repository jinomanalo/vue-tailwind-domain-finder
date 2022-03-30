import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.dev.name.com/v4/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/user-location": {
        target: `https://api.ipregistry.co/152.32.99.227?key=rffwralevq2y5aq8`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/user-location/, ""),
      },
    },
  },
});
