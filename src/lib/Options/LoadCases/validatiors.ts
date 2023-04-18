import type { ValidationRules } from "../../../utils/validation";

export const createOffsetRules = (
  length: number,
  previousOffset: number
): ValidationRules => [
  (v) => v >= 0 || "Offset can't be negative number",
  (v) => v <= length || "Offset can't be larger than beam length",
];

export const angleRules: ValidationRules = [
  (v) => (v >= -360 && v <= 360) || "Angle should be in between -360 and 360",
];

export const loadRules: ValidationRules = [
  (v) => v > 0 || "Load should be more than zero",
];
