import { describe, expect, it } from "vitest";
import type { F3DD } from "frame3dd-wasm-js";
import {
  hasAxisBorder,
  shouldWarn,
  unexpectedResultsFor,
  visibleComponentsFor,
} from "./tablePolicy";

const vec = (overrides: Partial<F3DD.Vec6> = {}): F3DD.Vec6 => ({
  x: 0,
  y: 0,
  z: 0,
  xx: 0,
  yy: 0,
  zz: 0,
  ...overrides,
});

describe("ResultTable column policy", () => {
  it("hides 1D warning-only columns when their values are zero", () => {
    const rows = [vec({ y: -12.3, zz: 0.02 })];

    expect(visibleComponentsFor("1d", rows)).toEqual(["x", "y", "zz"]);
    expect(unexpectedResultsFor("displacement", "1d", rows)).toEqual([]);
  });

  it("shows and flags hidden-by-default 1D columns when values are non-zero", () => {
    const rows = [vec({ y: -1 }), vec({ z: 0.5, yy: -0.25, zz: 0.01 })];

    expect(visibleComponentsFor("1d", rows)).toEqual([
      "x",
      "y",
      "z",
      "yy",
      "zz",
    ]);
    expect(unexpectedResultsFor("reaction", "1d", rows)).toEqual([
      { kind: "reaction", node: 1, component: "z", value: 0.5 },
      { kind: "reaction", node: 1, component: "yy", value: -0.25 },
    ]);
    expect(shouldWarn("1d", rows, "z")).toBe(true);
    expect(shouldWarn("1d", rows, "z", rows[0])).toBe(false);
    expect(shouldWarn("1d", rows, "z", rows[1])).toBe(true);
  });

  it("shows all columns and suppresses 1D warnings outside 1D mode", () => {
    const rows = [vec()];

    expect(visibleComponentsFor("2d", rows)).toEqual([
      "x",
      "y",
      "z",
      "xx",
      "yy",
      "zz",
    ]);
    expect(unexpectedResultsFor("displacement", "2d", rows)).toEqual([]);
    expect(shouldWarn("2d", rows, "z")).toBe(false);
  });

  it("keeps the axis border on y when z is hidden", () => {
    expect(hasAxisBorder("y", ["x", "y", "zz"])).toBe(true);
    expect(hasAxisBorder("y", ["x", "y", "z", "zz"])).toBe(false);
    expect(hasAxisBorder("z", ["x", "y", "z", "zz"])).toBe(true);
  });
});
