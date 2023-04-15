import { describe, it, expect } from "vitest";
import { isBeamPoint, isBeamEndForce } from "./store-utils";
import { type BeamEnd, type PointLoad, FixationEnum, AnchorPoint } from "./store";

const LENGTH = 1000;
const beam: Array<BeamEnd> = [
  {
    id: 1,
    isFixed: FixationEnum.FIXED,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    id: 2,
    isFixed: FixationEnum.NONE,
    x: LENGTH,
    y: 0,
    z: 0,
  },
];

/**
 * util to reduce copypasting of mandatory point load fields
 */
const basePointLoad = new (class PointLoadUtil {
  #basePointLoad: PointLoad = {
    node: -1,
    type: "pointed",
    anchor: AnchorPoint.START,
    offset: 0,
    angle: 0,
    load: 0,
    loadValueType: "force",
  };

  with(modifiers: Partial<PointLoad>): PointLoad {
    return { ...this.#basePointLoad, ...modifiers };
  }
})();

describe("isBeamPoint", () => {
  it("checks point is the same as the start point", () => {
    expect(isBeamPoint(beam, beam[0])).toBe(beam[0]);
  });

  it("checks point is the same as the end point", () => {
    expect(isBeamPoint(beam, beam[1])).toBe(beam[1]);
  });

  it("checks point is placed at beam start", () => {
    const point = {
      id: 3,
      isFixed: FixationEnum.NONE,
      x: 0,
      y: 0,
      z: 0,
    };
    expect(isBeamPoint(beam, point)).toBe(beam[0]);
  });

  it("checks point is placed at beam end (pos = beam length)", () => {
    const point = {
      id: 3,
      isFixed: FixationEnum.NONE,
      x: LENGTH,
      y: 0,
      z: 0,
    };
    expect(isBeamPoint(beam, point)).toBe(beam[1]);
  });

  it("checks point is in between", () => {
    const point = {
      id: 3,
      isFixed: FixationEnum.NONE,
      x: LENGTH / 2,
      y: 0,
      z: 0,
    };
    expect(isBeamPoint(beam, point)).toBe(false);
  });
});

describe("isBeamEndForce", () => {
  it("checks force applied to the start node", () => {
    const pointLoad = basePointLoad.with({
      offset: 0,
      anchor: AnchorPoint.START,
    });
    expect(isBeamEndForce(beam, pointLoad)).toBe(beam[0]);
  });

  it("checks force applied to the start node using offset", () => {
    const pointLoad = basePointLoad.with({
      offset: LENGTH,
      anchor: AnchorPoint.END,
    });
    expect(isBeamEndForce(beam, pointLoad)).toBe(beam[0]);
  });

  it("checks force applied to the end node", () => {
    const pointLoad = basePointLoad.with({
      offset: 0,
      anchor: AnchorPoint.END,
    });
    expect(isBeamEndForce(beam, pointLoad)).toBe(beam[1]);
  });

  it("checks force applied to the end node using offset", () => {
    const pointLoad = basePointLoad.with({
      offset: LENGTH,
      anchor: AnchorPoint.START,
    });
    expect(isBeamEndForce(beam, pointLoad)).toBe(beam[1]);
  });

  it("checks force applied somewhere in between", () => {
    const pointLoad = basePointLoad.with({
      offset: LENGTH / 3,
      anchor: AnchorPoint.START,
    });
    expect(isBeamEndForce(beam, pointLoad)).toBe(false);
  });

  it("checks force applied to middle exactly", () => {
    const pointLoad = basePointLoad.with({
      offset: 0,
      anchor: AnchorPoint.MIDDLE,
    });
    expect(isBeamEndForce(beam, pointLoad)).toBe(false);
  });
});
