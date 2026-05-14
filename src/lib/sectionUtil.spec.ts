import { describe, expect, it } from "vitest";
import { cylindrical, roundTube } from "./sectionUtil";

const expectSectionValue = (actual: number, expected: number) => {
  expect(actual).toBeCloseTo(expected, 10);
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
