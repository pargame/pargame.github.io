import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://pargame.github.io',
  base: '/',
  integrations: [
    react(),
    mdx()
  ],
  markdown: {
    shikiConfig: {
      themes: {
        dark: 'tokyo-night',
        light: 'github-light'
      },
      wrap: false
    }
  }
});
