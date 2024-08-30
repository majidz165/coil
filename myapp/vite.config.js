import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: "../core/static/core/js",
    rollupOptions: {
      input: {
        contractCreate: "src/contractCreate.jsx",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    watch: {
      include: ["src/**"],
      exclude: ["node_modules/**", "dist/**"],
    },
  },
});
