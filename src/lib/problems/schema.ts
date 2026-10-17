import { SITE_NAME, SITE_URL } from "$lib/site";
import { resolvePreset } from "./presets";
import type { Locale, Problem } from "./types";

/**
 * Serializes JSON-LD for a problem page without letting a `<` reach the HTML
 * parser, which would otherwise terminate the surrounding script element.
 */
export function toSafeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/**
 * Builds the structured data shown on a problem page: the calculator itself
 * plus its FAQ, so search engines can surface both the app and its answers.
 */
export function buildProblemSchema(
  problem: Problem,
  locale: Locale,
  canonicalUrl: string
): Record<string, unknown> {
  const content = problem.content[locale];
  const model = resolvePreset(problem.preset);
  const localizedUrls = (Object.keys(problem.content) as Locale[]).map(
    (lang) => `${SITE_URL}/${lang}/solve/${problem.slug}`
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#calculator`,
        name: content.h1,
        description: content.summary,
        url: canonicalUrl,
        inLanguage: locale,
        applicationCategory: "EngineeringApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        about: {
          "@type": "Thing",
          name: content.h1,
        },
        workExample: localizedUrls.map((url) => ({
          "@type": "SoftwareSourceCode",
          url,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        // Machine-readable description of the pre-configured model, so an
        // agent can reproduce the setup without rendering the page.
        "@type": "SoftwareApplication",
        "@id": `${canonicalUrl}#preset`,
        name: `${content.h1} — preset`,
        url: canonicalUrl,
        softwareVersion: "1",
        operatingSystem: "Any",
        inputProperties: {
          "@type": "PropertyValueSpecification",
          valueRequired: true,
          defaultValue: JSON.stringify({
            slug: problem.slug,
            length: model.length,
            lengthUnit: model.lengthUnit,
            forceUnit: model.forceUnit,
            leftSupport: model.firstPoint.isFixed,
            rightSupport: model.lastPoint.isFixed,
            profileType: model.profileType,
            profileData: model.profileData,
            material: model.material.name,
            loads: model.loads,
          }),
        },
      },
    ],
  };
}
