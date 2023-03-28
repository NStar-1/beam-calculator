import type { ValidationRules } from "../../utils/validation";

export const createLengthRules = (
  latestOffsetLength: number
): ValidationRules => [
  (v) => v > 0 || "Length should be more than zero",
  (v) => v >= latestOffsetLength || "Length can't be lesser than last load point offset",
];

