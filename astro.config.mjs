// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: change to your real domain before deploying (used for canonical URLs, sitemap, RSS)
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  build: { format: 'directory' },
  prefetch: { prefetchAll: true },
});
