# s — agent instructions

## Architecture
- Fully static SvelteKit 5 + `@sveltejs/adapter-static`. Prerendered at build time. No runtime server.
- Output: `build/`. Hosted on GitHub Pages via `.github/workflows/deploy.yml`.

## Env vars (link definitions)
- `link_default=URL` — root `/` destination (plain URL).
- `link_NAME=slug|destination` — slug-based links (`/slug` → destination).
- Slugs auto-discovered at build time from `process.env` (`entries()` iterates `link_*`, splits on first `|`).
- **ALWAYS quote values in shell** — `|` is a pipe operator otherwise.

## Redirect mechanics
- `Redirect.svelte`: `<meta http-equiv="refresh">` (non-JS fallback) + `$effect` + `window.location.replace()`.
- Query params forwarded automatically: `/wa?source=x` → `dest?source=x`.

## Commands
```
npm run dev          # link_default='...' link_foo='slug|url' npm run dev
npm run build        # same, env vars required
npm run preview      # preview build/
npm run check        # typecheck via svelte-check
```
No linter/formatter configured.

## Error codes
- **500** — `link_default` missing at build time.
- **404** — unknown slug or unmatched route path.

## Routing
- `trailingSlash = 'always'` — `/wa` serves from `/wa/`.
- `[slug]` matches exactly one segment; `/a/b/c` → 404.

## Svelte 5 runes in use
`$props()`, `$state`, `$effect`, `$app/state` (not `$app/stores`). Write new components with runes.

## Adding a link
1. Add GitHub secret `link_NAME=slug|URL`.
2. Add `link_NAME: ${{ secrets.link_NAME }}` to `deploy.yml` env block.
3. Push to `main`.

## Misc
- `GlitchBackground` / `GlitchPlane` (Three.js via `@threlte/core`) — decorative.
- No tests, no test framework.
- TypeScript strict mode enabled.
- `.npmrc` has `engine-strict=true`.
