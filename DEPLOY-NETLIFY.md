# Deploying to Netlify

This folder is the complete site. Netlify builds it — the Themes page loads
products from your Spree store on Netlify's servers, so the site cannot be
uploaded as plain files.

## Option 1 — Netlify Drop (no Git needed)

1. Sign in at https://app.netlify.com (Drop builds only for signed-in accounts).
2. Go to **Deploys** and drag this **whole folder** (the one containing
   `netlify.toml`, not just `dist`) onto the drop area.
3. Netlify reads `netlify.toml`, runs `npm run build`, publishes `dist/`, and
   wires up the server automatically. Wait for the build to finish.

## Option 2 — Deploy from Git (recommended for ongoing updates)

1. Push this folder to a GitHub/GitLab repository.
2. In Netlify: **Add new project → Import an existing project → pick the repo**.
3. Build command `npm run build`, publish directory `dist` (already set in
   `netlify.toml`, so Netlify fills them in for you).
4. Every push re-publishes the site.

## Option 3 — Netlify CLI

```bash
npm install -g netlify-cli
cd aone-enterprises-netlify
netlify login
netlify link      # or: netlify sites:create
netlify deploy --build --prod
```

## After deploying

- Open the site and check **Themes** — cards, filters and prices come from your
  Spree store.
- Add or edit products in the Spree dashboard; the site picks them up on the
  next page load (no re-deploy needed).
- If Themes shows "Themes coming soon", the store has no products published to
  this storefront yet — add products in Spree and reload.

## Notes

- Node 22 is pinned in `netlify.toml` (the build requires it).
- Prices come from Spree; the PKR/USD switch converts at 280 PKR per USD when
  Spree has no USD price.
- Nothing else to configure: no environment variables or secrets are required
  (the Spree publishable key is safe in the browser).
