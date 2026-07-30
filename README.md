# Foresight Labs

The official static website for Foresight Labs, an independent product studio creating thoughtful, privacy-conscious digital products.

## Local setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The production checks are:

```bash
npm run check
npm run build
npm run preview
```

`npm run lint` is an alias for the Astro type/content check. The build is fully static and emits the site to `dist/`.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds on pushes to `main` and deploys through GitHub Pages. In repository settings, set Pages > Build and deployment > Source to **GitHub Actions**. Do not use the generated Jekyll “pages build and deployment” workflow: it scans Astro source files as Jekyll content and will fail on `.astro` front matter. The project-path base is configured for `iamaritrasaha.github.io/foresight-labs`; local development uses root paths. The emitted artifact includes `.nojekyll` as an additional safeguard.

For a custom domain, add the domain in GitHub Pages settings, add the required DNS records, and update `site` in `astro.config.mjs`. Add a `public/CNAME` file containing the domain when the domain is ready.

## Updating product data

All product names, slugs, descriptions, statuses, accents, capability lists and unavailable-link fields live in `src/data/products.ts`. Set a URL field to a real value when a store, repository or product policy is ready; keep it `null` while unavailable so no fake links are rendered.

Product screenshot placeholders are also centralised there. Add real images under `public/` and update the product component when screenshots are approved.

## Policies and contact

Legal and disclosure pages are in `src/pages/`. The effective date for the initial pages is 30 July 2026. Review all policies before commercial publication; they have not received professional legal review. Contact is `thisisaritrasaha@gmail.com`.

## AdMob `app-ads.txt`

`public/app-ads.txt` currently contains a documented development placeholder only. Before publishing monetised inventory, replace it with the exact authorised seller line copied from AdMob. The deployed file will be available at `/app-ads.txt`.

## Accessibility and licence

The site uses semantic landmarks, visible focus-friendly controls, keyboard-operable navigation, responsive layouts, light/dark themes and a reduced-motion alternative. Check routes in both themes and run `npm run check` before publishing.

No paid services, analytics, advertising trackers or proprietary assets are included in this initial release. Source code is provided for the Foresight Labs website; product names and brand material remain the property of Foresight Labs or their respective rights holders.
