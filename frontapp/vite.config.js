import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import content from "@originjs/vite-plugin-content";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), content.default({
    csv: {
      csvOptions: {
        delimiter: ";",
        cast: true,
        enconding: 'utf-8',
      }
    }
  })],
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
