import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/beam-calculator/",
  resolve: {
    alias: {
      src: "/src",
    },
  },
  optimizeDeps: {
    exclude: ["frame3dd-wasm-js"],
  },
  // For frame3dd-wasm-js development
  server: {
    fs: {
      allow: [".", "../../frame3dd-wasm-js/build"],
    },
  },
});
