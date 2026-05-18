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

## Structural Modes

The product is expected to support `1d`, `2d`, and `3d` structural modes over
time. Only 1D is available today, and the UI should keep that mode implicit for
users until higher-dimensional modes exist.

Keep mode concepts explicit in code where they clarify behavior. In 1D mode,
tailor the UX to the common beam workflow instead of exposing every Frame3DD
degree of freedom by default.

For 1D result tables, `src/lib/Ggraphic/Info.svelte` renders
`src/lib/Ggraphic/ResultTable.svelte`. Displacements and reactions should
primarily show the beam-relevant values. Hide `z`, `xx`, and `yy` columns when
they are all zero. If any hidden-by-default component is non-zero, treat it as a
data/model warning: log it with `console.error`, show the value in the table,
and make the value visually obvious, for example red and bold. The `x`
component is expected to be zero in most 1D simulations but is not an error when
non-zero, so prefer keeping it visible unless a clearer design is chosen.

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
