// @ts-check
import { defineConfig } from 'astro/config';

// The site is served from a sub-path. Override both at build time to deploy elsewhere, e.g.
//   SITE=https://www.organokov.com BASE_PATH=/projects/openunivcourses npm run build
export default defineConfig({
  site: process.env.SITE ?? 'https://kabartay.github.io',
  base: process.env.BASE_PATH ?? '/openunivcourses',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
