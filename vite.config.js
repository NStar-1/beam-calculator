import { defineConfig } from "vite";
import content from "@originjs/vite-plugin-content";
import svg from '@poppanator/sveltekit-svg'

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
    svg({
      svgoOptions: {
        plugins: [
          'preset-default',
        ]
      }
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
