import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import justCheck from "./src/justCheck";

export default defineConfig({
  plugins: [preact()],
  build: {
    minify: false,
    outDir: "../core/static/core/js",
    rollupOptions: {
      input: {
        contractCreate: "src/contractCreate.jsx",
        Modal: "src/Modal.jsx",
        justCheck: "src/justCheck.jsx",

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
