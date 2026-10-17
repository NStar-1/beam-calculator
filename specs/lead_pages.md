# Lead Pages

BeamCalc publishes one prerendered page per standard beam problem, so search
engines and agents can surface an entry point for each concrete question
("cantilever beam with a load at the free end", "will a steel pipe bend in the
middle", ...) instead of a single generic calculator page.

# Routes

```text
/<locale>/solve                 catalog hub, links every problem
/<locale>/solve/<slug>          one pre-configured calculator per problem
/llms.txt                       agent-facing index of the whole catalog
```

`<locale>` comes from `src/lib/translations/lang.js`, `<slug>` from the problem
registry. Every route is prerendered: `/solve` and `/llms.txt` are registered in
`svelte.config.js`, while `src/routes/[lang=locale]/solve/[slug]/+page.ts`
exports `entries()` so SvelteKit writes one page per problem and locale.

# Problem Registry

Problems live in `src/lib/problems/`, one module per problem, aggregated by
`index.ts`:

```text
slug      stable kebab-case URL segment
group     cantilever | simply-supported | indeterminate
preset    readable description of the beam model
content   localized copy, keyed by locale
```

A `preset` is deliberately not an `AnchorLinkModel`:

- materials are referenced by **name**, so a reordered material list cannot
  silently retarget a problem (names are unique and checked by tests);
- fixations stay enum values, which keeps the file readable.

`resolvePreset()` converts a preset to the model shape, `encodePreset()` turns it
into its canonical `#v1-...` anchor link. Both throw on an invalid preset, so a
broken entry fails the build instead of shipping a dead page.

# Page Anatomy

Each problem page contains, in order: breadcrumb, `h1`, intro paragraphs, the
calculator, how the beam is modelled, how to read the results, formulas, FAQ and
related problems.

SEO metadata per page: `title`, `description`, canonical URL, `hreflang`
alternates for every locale plus `x-default`, `sitemap:*` meta tags and JSON-LD
(`WebApplication`, `FAQPage`, and a `SoftwareApplication` carrying the preset as
a JSON string, so an agent can reproduce the setup without rendering the page).

The canonical URL stays free of the anchor fragment: `Calculator.svelte` skips
the first model emission (`skipInitial`), so the fragment only appears once the
visitor actually edits the calculation. An anchor link present on load always
wins over the page preset, and a shared link therefore reproduces its exact
state.

The "direct link" under the calculator stays truthful after edits: SvelteKit
deliberately leaves a same-page hash link to the browser, so `hashchange`
fires and `Calculator` re-applies whatever the new hash encodes through the
same precedence rules as on mount. Clicking the link returns the calculator to
the page preset, a cleared hash falls back to it as well, and the browser's
back/forward buttons step between the preset and the edited state.

The calculator is keyed on the problem slug, because navigating between two
problem pages reuses the same route component with new props: remounting is
what re-runs the mount-time preset logic, so every example always starts from
its own model. This is also why `initialModel` is documented as a **mount-only**
prop: it is read once inside `onMount`, and switching models means remounting.
The precedence rules — a `#v1-...` anchor link beats the preset, a broken hash
is reported and cleared instead of silently replaced — live in pure
`src/lib/calculatorInit.ts` and are covered by `calculatorInit.spec.ts`.

`store.spec.ts` covers the same switch at the store level: the calculator
relies on global singleton stores that outlive the component, so
`applySerializableModel()` has to replace the whole state — profile, fixations,
loads — or one example would leak into the next.

# Catalog Immutability

`ProblemPreset` is typed `Readonly<...>` with a `ReadonlyArray` of loads: the
catalog is read-only data, and `resolvePreset()` is the only way to produce
editable state. It clones the loads, the profile and the material, because the
stores edit all three in place — the material selector even renames the record
to "Other" when a field is edited, which would break the name lookup for every
later preset; `store.spec.ts` and `problems.spec.ts` assert that edits made
through the calculator never reach the catalog.

The registry barrel (`src/lib/problems/index.ts`) exports only the catalog:
the problems, their order, lookups and the locale vocabulary. Preset
resolution (`./presets`), hub copy (`./hub`) and JSON-LD (`./schema`) are
imported directly by their consumers, so browsing the catalog stays decoupled
from the calculator machinery.

# Fixation Dropdown

`FixationDropdown` mirrors the numeric fixation enum into the SMUI select,
which only deals in strings. The rules live in `src/lib/Options/fixationSync.ts`
and are covered by `fixationSync.spec.ts`:

- an externally applied value — a preset or an anchor link — remounts the
  select, because SMUI refreshes the selected label only when its options
  mount;
- a change made by the user does not remount: the select has already updated
  its own label, and `lastPushed` records the change so the reactive guard
  stays quiet.

One trap worth remembering: Svelte memoizes a simple variable prop, but
re-sends a computed prop (such as `sync.someField`) whenever the state object
changes identity — and SMUI pushes every value it receives into MDC, which
emits a change event for it. The component therefore derives the select's
value from `lastPushed` on every render instead of storing a string that could
lag one step behind and make the select undo the user's own selection.

# Future Direction

The calculator still relies on global singleton stores. They work for one
calculator per page, but they retain state across routes — which is why every
model application replaces the whole state — and would couple two calculator
instances to each other. If side-by-side comparisons become a requirement,
the stores need to be scoped per instance, for example via Svelte context,
with `Calculator.svelte` owning its own store set. Until then the singleton is
the simpler, adequate design.

# Adding a Problem

1. Create `src/lib/problems/<slug>.ts` exporting a `Problem`.
2. Register it in `src/lib/problems/index.ts` (the order is the hub order).
3. Run `npm test` — `problems.spec.ts` checks slugs, locale completeness,
   material resolution and anchor round-trips.
4. Run `npm run build` — the page, the sitemap entry and the `llms.txt` line
   are generated from the registry, so nothing else needs to be registered.
