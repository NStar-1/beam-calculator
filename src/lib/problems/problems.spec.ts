import { describe, expect, it } from "vitest";
import { decodeAnchorLink, encodeAnchorLink } from "../modelSerialization";
import { problems, problemGroupOrder, problemPaths, getProblemsByGroup } from "./index";
import { encodePreset, resolveMaterial, resolvePreset } from "./presets";
import { supportedLocales } from "./types";
import type { ProblemContent } from "./types";

const contentFields: Array<keyof ProblemContent> = [
  "title",
  "description",
  "h1",
  "summary",
  "intro",
  "setup",
  "reading",
  "formulas",
  "faq",
];

describe("beam problem catalog", () => {
  it("uses unique kebab-case slugs", () => {
    const slugs = problems.map((problem) => problem.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("assigns every problem to a known, non-empty group", () => {
    for (const problem of problems) {
      expect(problemGroupOrder).toContain(problem.group);
    }

    for (const group of problemGroupOrder) {
      expect(getProblemsByGroup(group).length).toBeGreaterThan(0);
    }
  });

  it("publishes complete content for every supported locale", () => {
    expect(supportedLocales.length).toBeGreaterThan(0);

    for (const problem of problems) {
      for (const locale of supportedLocales) {
        const content = problem.content[locale];
        expect(content, `${problem.slug} has no ${locale} content`).toBeTruthy();

        for (const field of contentFields) {
          const value = content[field];
          expect(value, `${problem.slug}/${locale} is missing ${field}`).toBeTruthy();

          if (Array.isArray(value)) {
            expect(value.length, `${problem.slug}/${locale}.${field}`).toBeGreaterThan(0);
          }
        }

        for (const formula of content.formulas) {
          expect(formula.expression.trim()).not.toBe("");
          expect(formula.meaning.trim()).not.toBe("");
        }

        for (const item of content.faq) {
          expect(item.question.trim()).not.toBe("");
          expect(item.answer.trim()).not.toBe("");
        }
      }
    }
  });

  it("resolves every preset material by name", () => {
    for (const problem of problems) {
      const material = resolveMaterial(problem.preset.material);

      expect(material.name).toBe(problem.preset.material);
      expect(material.E).toBeGreaterThan(0);
      expect(material.density).toBeGreaterThan(0);
    }
  });

  it("encodes every preset into a stable, decodable anchor link", () => {
    for (const problem of problems) {
      const anchor = encodePreset(problem.preset);

      expect(anchor.startsWith("#v1-")).toBe(true);

      const decoded = decodeAnchorLink(anchor);
      expect(decoded.error, `${problem.slug}: ${decoded.message}`).toBe(false);

      // Re-encoding the decoded model must reproduce the same anchor link, so
      // the baked-in permalink and the calculator state never drift apart.
      const reencoded = encodeAnchorLink(decoded.data!);
      expect(reencoded.error).toBe(false);
      expect(reencoded.data).toBe(anchor);
    }
  });

  it("applies presets to the model shape used by the calculator", () => {
    for (const problem of problems) {
      const model = resolvePreset(problem.preset);

      expect(model.firstPoint.isFixed).toBe(problem.preset.firstPoint);
      expect(model.lastPoint.isFixed).toBe(problem.preset.lastPoint);
      expect(model.profileType).toBe(problem.preset.profile.profileType);
      expect(model.loads.length).toBeGreaterThan(0);
    }
  });

  it("returns fresh editable state so calculator edits cannot mutate the catalog", () => {
    for (const problem of problems) {
      const loadsBefore = JSON.stringify(problem.preset.loads);
      const pristine = resolvePreset(problem.preset);
      const model = resolvePreset(problem.preset);

      // Nothing may be shared with the catalog, because the stores edit all
      // of it in place.
      expect(model.loads).not.toBe(problem.preset.loads);
      model.loads.forEach((load, index) => {
        expect(load).not.toBe(problem.preset.loads[index]);
      });
      expect(model.material).not.toBe(pristine.material);
      expect(model.profileData).not.toBe(pristine.profileData);

      // The calculator edits loads in place; the material selector even
      // renames the record to "Other" when a field is edited. The catalog
      // must not follow.
      for (const load of model.loads) {
        load.value = -12345;
        load.offset = 0;
        load.angle = 90;
      }
      model.material.name = "Other";
      model.material.E = -1;
      model.material.G = -1;
      model.material.density = -1;
      model.material.categories.push("corrupted");
      const editableProfile: Record<string, number> = model.profileData;
      for (const key of Object.keys(editableProfile)) {
        editableProfile[key] = -1;
      }

      const after = resolvePreset(problem.preset);
      expect(after.material).toEqual(pristine.material);
      expect(after.profileType).toBe(pristine.profileType);
      expect(after.profileData).toEqual(pristine.profileData);
      expect(JSON.stringify(problem.preset.loads)).toBe(loadsBefore);
    }
  });

  it("derives one prerender path per problem and locale", () => {
    const paths = problemPaths();

    expect(paths.length).toBe(problems.length * supportedLocales.length);
    expect(new Set(paths).size).toBe(paths.length);

    for (const problem of problems) {
      expect(paths).toContain(`/en/solve/${problem.slug}`);
    }
  });
});
