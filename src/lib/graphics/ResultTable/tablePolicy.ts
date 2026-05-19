import type { F3DD } from "frame3dd-wasm-js";
import type { StructuralMode } from "$lib/store";

export type ResultKind = "displacement" | "reaction";
export type ResultComponent = keyof F3DD.Vec6;

export type UnexpectedResult = {
  kind: ResultKind;
  node: number;
  component: ResultComponent;
  value: number;
};

export const orderedComponents: ResultComponent[] = [
  "x",
  "y",
  "z",
  "xx",
  "yy",
  "zz",
];

export const translationalComponents: ResultComponent[] = ["x", "y", "z"];
export const oneDimensionalWarningComponents: ResultComponent[] = [
  "z",
  "xx",
  "yy",
];

const resultWarningThreshold = 1e-9;

export const isNonZero = (value: number) =>
  Math.abs(value) > resultWarningThreshold;

export const shouldHideInOneDimension = (component: ResultComponent) =>
  oneDimensionalWarningComponents.includes(component);

export const containsNonZero = (
  rows: ReadonlyArray<F3DD.Vec6> | undefined,
  component: ResultComponent
) => rows?.some((row) => isNonZero(row[component])) ?? false;

export const visibleComponentsFor = (
  mode: StructuralMode,
  rows: ReadonlyArray<F3DD.Vec6> | undefined
) =>
  orderedComponents.filter(
    (component) =>
      mode !== "1d" ||
      !shouldHideInOneDimension(component) ||
      containsNonZero(rows, component)
  );

export const unexpectedResultsFor = (
  kind: ResultKind,
  mode: StructuralMode,
  rows: ReadonlyArray<F3DD.Vec6> | undefined
): UnexpectedResult[] =>
  mode === "1d"
    ? rows?.flatMap((row, node) =>
        oneDimensionalWarningComponents
          .filter((component) => isNonZero(row[component]))
          .map((component) => ({
            kind,
            node,
            component,
            value: row[component],
          }))
      ) ?? []
    : [];

export const shouldWarn = (
  mode: StructuralMode,
  rows: ReadonlyArray<F3DD.Vec6> | undefined,
  component: ResultComponent,
  row?: F3DD.Vec6
) =>
  mode === "1d" &&
  shouldHideInOneDimension(component) &&
  (row ? isNonZero(row[component]) : containsNonZero(rows, component));

export const hasAxisBorder = (
  component: ResultComponent,
  visibleComponents: ReadonlyArray<ResultComponent>
) =>
  component === "z" || (component === "y" && !visibleComponents.includes("z"));
