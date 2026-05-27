import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import lang from './src/lib/translations/lang.js';

const supportedLocales = Object.keys(lang);
const localizedRoutes = [
  '',
  '/about',
  '/changelog',
  '/contact',
  '/faq',
  '/howto',
  '/privacy-policy',
  '/terms-of-service',
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  kit: {
    alias: {
      $libs: 'src/lib',
    },
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true,
      appDir: 'internal',
    }),
    prerender: {
      entries: [
        '/',
        ...supportedLocales.flatMap((locale) =>
          localizedRoutes.map((route) => `/${locale}${route}`)
        ),
      ],
    }
    //paths: {
    //  base: "/beam-calculator",
    //},
  },
};

export default config;
