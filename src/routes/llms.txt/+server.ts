import {
  defaultLocale,
  problemGroupOrder,
  getProblemsByGroup,
  problems,
  supportedLocales,
} from "$lib/problems";
import { hubContent } from "$lib/problems/hub";
import { SITE_NAME, SITE_URL } from "$lib/site";

/**
 * Agent-facing index of the problem catalog.
 *
 * Prerendered to `/llms.txt` so an LLM can discover every pre-configured beam
 * problem and its stable permalink without having to render a single page.
 */
export const prerender = true;

const indent = (text: string) =>
  text
    .split("\n")
    .map((line) => (line ? `> ${line}` : ">"))
    .join("\n");

const summaryOf = (problem: (typeof problems)[number]) =>
  problem.content[defaultLocale].summary;

const buildLlmsText = () => {
  const intro = hubContent[defaultLocale].intro.join(" ");
  const lines: string[] = [
    `# ${SITE_NAME} — beam deflection and structural analysis calculator`,
    "",
    indent(
      `${SITE_URL} runs static structural analysis of one-dimensional beams in the browser, using the Frame3DD kernel compiled to WebAssembly. ${intro}`
    ),
    "",
    "## Standard beam problems",
    "",
    "Each entry is a ready-made calculator. The supports, load, cross section and material are pre-filled, and the page states the model, the closed-form formulas and how to read the results.",
    "",
  ];

  problemGroupOrder.forEach((group) => {
    lines.push(`### ${hubContent[defaultLocale].groups[group].title}`, "");
    getProblemsByGroup(group).forEach((problem) => {
      const url = `${SITE_URL}/${defaultLocale}/solve/${problem.slug}`;
      lines.push(`- [${problem.content[defaultLocale].h1}](${url}): ${summaryOf(problem)}`);
    });
    lines.push("");
  });

  lines.push(
    "## Machine-readable model state",
    "",
    indent(
      [
        `Every calculator encodes its complete model in the URL fragment as \`#v1-<base64url>\`, a packed binary payload defined in specs/anchor_links.md of the ${SITE_NAME} repository.`,
        "The payload carries the beam length and units, both end fixations, the cross-section type and dimensions, the material and every point load, so a shared link reproduces an exact configuration.",
        "Anchor links work both on the calculator root page and on the problem pages above.",
      ].join(" ")
    ),
    "",
    "## Locales",
    "",
    indent(
      `Every problem is published under a locale prefix: ${supportedLocales
        .map((locale) => `${SITE_URL}/${locale}/solve/<slug>`)
        .join(" and ")}. The default locale is ${defaultLocale}.`
    ),
    "",
    "## Notes",
    "",
    indent(
      "The analysis is linear and static: it reports displacements, support reactions and internal forces. It does not check strength, buckling or serviceability limits, and it does not include the beam self weight unless you add it as a load."
    ),
    ""
  );

  return lines.join("\n");
};

export const GET = () =>
  new Response(buildLlmsText(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
