# s

URL shortener powered by SvelteKit + GitHub Pages.

- Store link definitions as GitHub Actions secrets named `link_{name}`
- Each secret value uses the format `slug|destination`
- Deploy via GitHub Actions — each link gets a prerendered redirect page
- Query parameters from the short URL are forwarded to the destination

## Develop

```sh
npm install
link_default=https://example.com link_links=gh|https://github.com npm run dev
```

## Add a new link

1. Choose a short slug (e.g., `gh`) and destination URL (e.g., `https://github.com`)
2. Add `link_{name}=slug|destination` as a GitHub repo secret (e.g., `link_links=gh|https://github.com`)
3. Add `link_{name}: ${{ secrets.link_{name} }}` to `.github/workflows/deploy.yml`

## Deploy

Push to `main` — the workflow builds and deploys to GitHub Pages.
