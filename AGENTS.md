# Agent Notes

## Project

SvelteKit static site for beamcalc.net. Uses `@sveltejs/adapter-static`.

## Commands

- Install dependencies: `npm install`
- Build: `npm run build`
- Check: `npm run check`
- Test: `npm test`

## Routing

Localized routes live under `src/routes/[lang=locale]`.
Supported locales come from `src/lib/translations/lang.js`.
Static prerender entries are configured in `svelte.config.js`.

## Sitemap

`npm run build` runs `scripts/generate-sitemap.js` via `postbuild`.
Sitemap metadata can be added with `meta name="sitemap:*"` tags.
Only include `changefreq` or `priority` when intentionally needed.

## Changelog

The static changelog lives at `src/routes/[lang=locale]/changelog/+page.svelte`.
It uses `ChangelogItem` for dated entries and `CommitLink` for links to GitHub
commits.

The page contains a `Changelog update marker` comment with the last reviewed
commit hash. To update the changelog, inspect commits after that marker:

```sh
git log <marker>..HEAD --date=short --pretty=format:"%h%x09%ad%x09%s"
```

Add only user-facing changes worth publishing. Skip internal cleanup, editor
setup, dependency churn, and commits with no visible product impact. Put
`<CommitLink hash="..." />` beside the bullet it supports. After updating the
entries, replace the marker in the page comment with the current `HEAD` hash.

## Constraints

Do not edit generated `build/` files unless explicitly regenerating build output.
Prefer existing SvelteKit and Svelte patterns in the repo.
