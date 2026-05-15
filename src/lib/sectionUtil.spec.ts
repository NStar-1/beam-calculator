import { describe, expect, it } from "vitest";
import { cylindrical, rectangular, rectangularTube, roundTube } from "./sectionUtil";

const expectSectionValue = (actual: number, expected: number) => {
  expect(actual).toBeCloseTo(expected, 10);
};

const expectSectionValueWithin = (
  actual: number,
  expected: number,
  tolerance: number,
) => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
};

describe("roundTube", () => {
  it("calculates a hollow circular section from outer and inner diameters", () => {
    const section = roundTube({ outerDiameter: 20, innerDiameter: 16 });

    // Independently evaluated from:
    // A = pi / 4 * (Do^2 - Di^2)
    // Jx = pi / 32 * (Do^4 - Di^4)
    expectSectionValue(section.Ax, 113.097335529233);
    expectSectionValue(section.Asy, 57.988570357448);
    expectSectionValue(section.Asz, 57.988570357448);
    expectSectionValue(section.Jx, 9273.98151339707);
    expectSectionValue(section.Iy, 4636.990756698535);
    expectSectionValue(section.Iz, 4636.990756698535);
  });
});

describe("cylindrical", () => {
  it("calculates a solid circular section from diameter", () => {
    const section = cylindrical({ outerDiameter: 20 });

    // Independently evaluated from:
    // A = pi / 4 * D^2
    // Jx = pi / 32 * D^4
    expectSectionValue(section.Ax, 314.159265358979);
    expectSectionValue(section.Asy, 314.159265358979);
    expectSectionValue(section.Asz, 314.159265358979);
    expectSectionValue(section.Jx, 15707.963267948966);
    expectSectionValue(section.Iy, 7853.981633974483);
    expectSectionValue(section.Iz, 7853.981633974483);
  });
});

describe("rectangular", () => {
  it("matches representative Frame3DD solid rectangle table values", () => {
    const table = [
      {
        name: "2x3",
        height: 1.5,
        width: 2.5,
        expected: { Ax: 3.75, Asy: 2.5, Asz: 2.5, Jx: 1.776, Iy: 1.953, Iz: 0.708 },
      },
      {
        name: "2x6",
        height: 1.5,
        width: 5.5,
        expected: { Ax: 8.25, Asy: 5.5, Asz: 5.5, Jx: 5.099, Iy: 20.8, Iz: 1.547 },
      },
      {
        name: "2x10",
        height: 1.5,
        width: 9.25,
        expected: { Ax: 13.88, Asy: 9.253, Asz: 9.253, Jx: 9.299, Iy: 98.93, Iz: 2.602 },
      },
      {
        name: "2x14",
        height: 1.5,
        width: 13.25,
        expected: { Ax: 19.88, Asy: 13.253, Asz: 13.253, Jx: 13.79, Iy: 290.8, Iz: 3.727 },
      },
    ];

    for (const { height, width, expected } of table) {
      const section = rectangular({ height, width });

      expectSectionValueWithin(section.Ax, expected.Ax, 0.01);
      expectSectionValueWithin(section.Asy, expected.Asy, 0.01);
      expectSectionValueWithin(section.Asz, expected.Asz, 0.01);
      expectSectionValueWithin(section.Jx, expected.Jx, 0.06);
      expectSectionValueWithin(section.Iy, expected.Iy, 0.05);
      expectSectionValueWithin(section.Iz, expected.Iz, 0.05);
    }
  });

  it("maps app height to Iz so vertical bending is height-sensitive", () => {
    const section = rectangular({ height: 20, width: 10 });

    expectSectionValue(section.Iy, 1666.666666666667);
    expectSectionValue(section.Iz, 6666.666666666667);
    expect(section.Iz).toBeGreaterThan(section.Iy);
  });
});

describe("rectangularTube", () => {
  it("maps app height to Iz so vertical bending is height-sensitive", () => {
    const section = rectangularTube({ height: 20, width: 10, thickness: 1 });

    expectSectionValue(section.Iy, 898.666666666667);
    expectSectionValue(section.Iz, 2778.666666666667);
    expect(section.Iz).toBeGreaterThan(section.Iy);
  });
});
