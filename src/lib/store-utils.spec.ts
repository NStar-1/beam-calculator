import { describe, expect, it } from "vitest";
import {
  convertLoads,
  deg2rad,
  getLoadAbsPos,
  rad2deg,
  shiftNode,
} from "./store-utils";
import { AnchorPoint, type PointLoad } from "./model";

const LENGTH = 1000;

const basePointLoad = new (class PointLoadUtil {
  #basePointLoad: PointLoad = {
    anchor: AnchorPoint.START,
    offset: 0,
    angle: 0,
    value: 10,
  };

  with(modifiers: Partial<PointLoad>): PointLoad {
    return { ...this.#basePointLoad, ...modifiers };
  }
})();

describe("angle conversion", () => {
  it("converts degrees to radians", () => {
    expect(deg2rad(180)).toBeCloseTo(Math.PI);
    expect(deg2rad(90)).toBeCloseTo(Math.PI / 2);
  });

  it("converts radians to degrees", () => {
    expect(rad2deg(Math.PI)).toBeCloseTo(180);
    expect(rad2deg(Math.PI / 2)).toBeCloseTo(90);
  });
});

describe("getLoadAbsPos", () => {
  it("uses offset from the beam start", () => {
    const load = basePointLoad.with({ anchor: AnchorPoint.START, offset: 125 });
    expect(getLoadAbsPos(load, LENGTH)).toBe(125);
  });

  it("uses offset from the beam end", () => {
    const load = basePointLoad.with({ anchor: AnchorPoint.END, offset: 125 });
    expect(getLoadAbsPos(load, LENGTH)).toBe(875);
  });

  it("ignores offset for middle anchor", () => {
    const load = basePointLoad.with({ anchor: AnchorPoint.MIDDLE, offset: 125 });
    expect(getLoadAbsPos(load, LENGTH)).toBe(500);
  });
});

describe("convertLoads", () => {
  it("maps point loads to axial and rotational load vectors", () => {
    const loads = [
      basePointLoad.with({ angle: 0, value: 10 }),
      basePointLoad.with({ angle: Math.PI / 2, value: 20 }),
    ];

    const converted = convertLoads(loads);

    expect(converted[0]).toEqual({
      axial: [10, 0, 0],
      number: 1,
      rotational: [0, 0, 0],
    });
    expect(converted[1].axial[0]).toBeCloseTo(0);
    expect(converted[1].axial[1]).toBeCloseTo(20);
    expect(converted[1].axial[2]).toBe(0);
    expect(converted[1].number).toBe(1);
    expect(converted[1].rotational).toEqual([0, 0, 0]);
  });
});

describe("shiftNode", () => {
  it("decrements id when an element has an id and non-zero position", () => {
    expect(shiftNode({ id: 5, x: 10 })).toEqual({ id: 4, x: 10 });
  });

  it("decrements node otherwise", () => {
    expect(shiftNode({ node: 5, x: 0 })).toEqual({ node: 4, x: 0 });
  });
});
