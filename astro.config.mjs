import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://iamaritrasaha.github.io/foresight-labs/',
  base: process.env.GITHUB_ACTIONS ? '/foresight-labs' : '',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
