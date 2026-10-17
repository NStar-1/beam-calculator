import { aluminiumCantileverEndLoad } from "./aluminium-cantilever-end-load";
import { cantileverEndLoad } from "./cantilever-end-load";
import { cantileverMidLoad } from "./cantilever-mid-load";
import { fixedFixedMidLoad } from "./fixed-fixed-mid-load";
import { iBeamMidLoad } from "./i-beam-mid-load";
import { pipeCantileverEndLoad } from "./pipe-cantilever-end-load";
import { proppedCantileverMidLoad } from "./propped-cantilever-mid-load";
import { simplySupportedInclinedLoad } from "./simply-supported-inclined-load";
import { simplySupportedMidLoad } from "./simply-supported-mid-load";
import { simplySupportedThirdPointLoad } from "./simply-supported-third-point-load";
import { simplySupportedTwoLoads } from "./simply-supported-two-loads";
import { steelPipeMidLoad } from "./steel-pipe-mid-load";
import type { Problem, ProblemGroupKey } from "./types";
import { supportedLocales } from "./types";

/**
 * The lead-page catalog.
 *
 * Order here decides the order on the hub page. Every entry is prerendered at
 * `/<locale>/solve/<slug>` and validated by `problems.spec.ts`.
 */
export const problems: ReadonlyArray<Problem> = [
  cantileverEndLoad,
  cantileverMidLoad,
  pipeCantileverEndLoad,
  aluminiumCantileverEndLoad,
  simplySupportedMidLoad,
  simplySupportedThirdPointLoad,
  simplySupportedTwoLoads,
  simplySupportedInclinedLoad,
  steelPipeMidLoad,
  iBeamMidLoad,
  proppedCantileverMidLoad,
  fixedFixedMidLoad,
];

export const problemGroupOrder: ReadonlyArray<ProblemGroupKey> = [
  "cantilever",
  "simply-supported",
  "indeterminate",
];

export function getProblem(slug: string): Problem | undefined {
  return problems.find((problem) => problem.slug === slug);
}

export function getProblemsByGroup(group: ProblemGroupKey): Problem[] {
  return problems.filter((problem) => problem.group === group);
}

/**
 * Canonical `/<locale>/solve/<slug>` paths, used by the prerenderer.
 */
export function problemPaths(): string[] {
  return supportedLocales.flatMap((locale) =>
    problems.map((problem) => `/${locale}/solve/${problem.slug}`)
  );
}

// The registry is the catalog itself: problems, their order and lookup. The
// machinery that turns a catalog entry into calculator state lives in
// `./presets` and the hub copy in `./hub`; import those directly so catalog
// browsing stays decoupled from the calculator.
export { defaultLocale, supportedLocales } from "./types";
export type { HubContent, Locale, Problem, ProblemContent, ProblemGroupKey, ProblemPreset } from "./types";
