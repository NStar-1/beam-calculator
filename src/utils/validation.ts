export type ValidationValue = number | string | boolean;
export type ValidationRules = Array<
  (v: ValidationValue, ...vals: ValidationValue[]) => boolean | string
>;
export type ValidationResult = { valid: boolean; errors: string[] };

export default function validate(
  rules: ValidationRules,
  value: ValidationValue,
  ...args: ValidationValue[]
): ValidationResult {
  const result = rules.map((rule) => rule(value, ...args));

  return {
    valid: result.every((r) => r === true),
    errors: (result.filter((r) => typeof r === "string") as string[]),
  };
}
