import { error } from "@sveltejs/kit";
import { getProblem, problems, supportedLocales } from "$lib/problems";
import { encodePreset, resolvePreset } from "$lib/problems/presets";
import type { Locale } from "$lib/problems";

/**
 * One prerendered page per problem and locale. SvelteKit writes them to
 * `build/<locale>/solve/<slug>/index.html`, which the sitemap script then
 * picks up automatically with hreflang alternates grouped by route.
 */
export const entries = () =>
  supportedLocales.flatMap((lang) =>
    problems.map((problem) => ({ lang, slug: problem.slug }))
  );

export const load = ({ params }) => {
  const problem = getProblem(params.slug);

  if (!problem) {
    throw error(404, `Unknown beam problem: ${params.slug}`);
  }

  return {
    lang: params.lang as Locale,
    problem,
    model: resolvePreset(problem.preset),
    anchor: encodePreset(problem.preset),
  };
};
