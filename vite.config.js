import { defineConfig } from "vite";
import content from "@originjs/vite-plugin-content";
import svelteSVG from "vite-plugin-svelte-svg";

import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    sveltekit(),

    content({
      csv: {
        csvOptions: {
          delimiter: ";",
          cast: true,
          enconding: "utf-8",
        },
      },
    }),
    svelteSVG({
      svgoConfig: {},
      requireSuffix: false,
    }),
  ],
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
      allow: [".", "../frame3dd-wasm-js/build"],
    },
  },
});
