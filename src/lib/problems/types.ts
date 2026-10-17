import type { Force, Length } from "convert";
import type { FixationEnum, PointLoad } from "$lib/model";
import type { AnchorLinkProfile } from "$lib/modelSerialization";
import lang from "$lib/translations/lang.js";

export type Locale = keyof typeof lang & string;

export const supportedLocales = Object.keys(lang) as Locale[];

export const defaultLocale: Locale = "en";

/**
 * Groups used to organize the problem catalog. Every problem belongs to
 * exactly one group, and each group has localized copy of its own.
 */
export type ProblemGroupKey =
  | "cantilever"
  | "simply-supported"
  | "indeterminate";

/**
 * A human-readable, build-time description of a beam model.
 *
 * It is deliberately not an `AnchorLinkModel`: presets reference materials by
 * name so they stay correct when the material list is reordered, and they keep
 * fixations as plain enum values for readability.
 *
 * Presets are read-only catalog data. `resolvePreset()` is the only way to
 * turn one into a fresh, editable model — everything the calculator can change
 * is cloned there, so an edit can never reach the catalog.
 */
export type ProblemPreset = Readonly<{
  length: number;
  lengthUnit: Length;
  forceUnit: Force;
  firstPoint: FixationEnum;
  lastPoint: FixationEnum;
  profile: AnchorLinkProfile;
  /** Material name as listed by `src/lib/materials*.json`. Must be unique. */
  material: string;
  loads: ReadonlyArray<PointLoad>;
}>;

export type ProblemFormula = {
  /** Formula in plain text, e.g. "delta = F * L^3 / (3 * E * I)". */
  expression: string;
  meaning: string;
};

export type ProblemFaqItem = {
  question: string;
  answer: string;
};

export type ProblemContent = {
  /** Search result title. */
  title: string;
  /** Meta description, ideally under 160 characters. */
  description: string;
  h1: string;
  /** One or two sentences used by the hub page, llms.txt and JSON-LD. */
  summary: string;
  /** Opening paragraphs. */
  intro: string[];
  /** How the beam, supports and load are modelled here. */
  setup: string[];
  /** What the reported values mean and how to check them. */
  reading: string[];
  formulas: ProblemFormula[];
  faq: ProblemFaqItem[];
};

export type Problem = {
  /** Stable kebab-case URL segment. */
  slug: string;
  group: ProblemGroupKey;
  preset: ProblemPreset;
  content: Record<Locale, ProblemContent>;
};

export type ProblemGroupContent = {
  title: string;
  description: string;
};

export type HubContent = {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  groups: Record<ProblemGroupKey, ProblemGroupContent>;
};
