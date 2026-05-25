import { describe, expect, it, vi } from "vitest";
import {
  ANCHOR_LINK_VERSION,
  decodeAnchorLink,
  encodeAnchorLink,
  type AnchorLinkModel,
  type AnchorLinkProfile,
} from "./modelSerialization";
import { materials } from "./materials";
import { AnchorPoint, FixationEnum, ProfileType } from "./model";

const builtInMaterial = materials[17];
const customMaterial = {
  name: "Custom",
  categories: ["Custom"],
  E: 205001,
  G: 79003,
  density: 7859,
};

const profileCases: Array<{ name: string; seed: number; profile: AnchorLinkProfile }> = [
  {
    name: "cylindrical",
    seed: 1000,
    profile: {
      profileType: ProfileType.CYLINDRICAL,
      profileData: { outerRadius: 11 },
    },
  },
  {
    name: "round tube",
    seed: 2000,
    profile: {
      profileType: ProfileType.ROUND_TUBE,
      profileData: { outerRadius: 31, innerRadius: 13 },
    },
  },
  {
    name: "rectangle",
    seed: 3000,
    profile: {
      profileType: ProfileType.RECTANGLE,
      profileData: { width: 41, height: 23 },
    },
  },
  {
    name: "rectangular tube",
    seed: 4000,
    profile: {
      profileType: ProfileType.RECTANGULAR_TUBE,
      profileData: { width: 71, height: 47, thickness: 5 },
    },
  },
  {
    name: "i-beam",
    seed: 5000,
    profile: {
      profileType: ProfileType.I_BEAM,
      profileData: {
        width: 83,
        depth: 97,
        flangeThickness: 7,
        webThickness: 3,
      },
    },
  },
];

function createModel(
  profile: AnchorLinkProfile,
  material: AnchorLinkModel["material"],
  seed: number
): AnchorLinkModel {
  return {
    length: seed + 1000,
    lengthUnit: "mm",
    forceUnit: "newtons",
    firstPoint: { isFixed: FixationEnum.FIXED },
    lastPoint: { isFixed: FixationEnum.ROLLER },
    ...profile,
    material,
    loads: [
      {
        anchor: AnchorPoint.START,
        offset: seed + 101,
        value: seed + 211,
        angle: seed + 17,
      },
      {
        anchor: AnchorPoint.END,
        offset: seed + 307,
        value: -(seed + 409),
        angle: seed + 29,
      },
    ],
  };
}

function roundTrip(model: AnchorLinkModel): AnchorLinkModel {
  const encoded = encodeAnchorLink(model);
  if (encoded.error) throw new Error(encoded.message);
  expect(encoded.error).toBe(false);
  expect(encoded.data).toMatch(new RegExp(`^#${ANCHOR_LINK_VERSION}-[A-Za-z0-9_-]+$`));

  const decoded = decodeAnchorLink(encoded.data);
  if (decoded.error) throw new Error(decoded.message);
  expect(decoded.error).toBe(false);
  return decoded.data;
}

function expectRoundTripModel(decoded: AnchorLinkModel, model: AnchorLinkModel) {
  expect(decoded.length).toBe(model.length);
  expect(decoded.lengthUnit).toBe(model.lengthUnit);
  expect(decoded.forceUnit).toBe(model.forceUnit);
  expect(decoded.firstPoint).toEqual(model.firstPoint);
  expect(decoded.lastPoint).toEqual(model.lastPoint);
  expect(decoded.profileType).toBe(model.profileType);
  expect(decoded.profileData).toEqual(model.profileData);
  expect(decoded.loads).toEqual(model.loads);
}

function profileNumbers(profile: AnchorLinkProfile): number[] {
  switch (profile.profileType) {
    case ProfileType.CYLINDRICAL:
      return [profile.profileData.outerRadius];
    case ProfileType.ROUND_TUBE:
      return [profile.profileData.outerRadius, profile.profileData.innerRadius];
    case ProfileType.RECTANGLE:
      return [profile.profileData.width, profile.profileData.height];
    case ProfileType.RECTANGULAR_TUBE:
      return [
        profile.profileData.width!,
        profile.profileData.height!,
        profile.profileData.thickness!,
      ];
    case ProfileType.I_BEAM:
      return [
        profile.profileData.width!,
        profile.profileData.depth!,
        profile.profileData.flangeThickness!,
        profile.profileData.webThickness!,
      ];
  }
}

function numericPayloadValues(model: AnchorLinkModel): number[] {
  const materialValues =
    model.material.id === undefined
      ? [model.material.E, model.material.G, model.material.density]
      : [model.material.id];

  return [
    model.length,
    ...profileNumbers(model),
    ...materialValues,
    ...model.loads.flatMap((load) => [load.offset, load.value, load.angle]),
  ];
}

function expectNoRepeatedNumericPayloadValues(model: AnchorLinkModel) {
  const values = numericPayloadValues(model);
  expect(new Set(values).size).toBe(values.length);
}

describe("materials", () => {
  it("loads built-in materials with explicit sequential u16 ids", () => {
    expect(materials[0].id).toBe(0);
    expect(materials[materials.length - 1].id).toBe(materials.length - 1);
    expect(materials.length).toBeLessThanOrEqual(0xffff + 1);
  });

  it("has unique material ids", () => {
    const ids = materials.map((material) => material.id);
    expect(ids.every((id) => id !== undefined)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("anchor links", () => {
  it.each(profileCases)(
    "round-trips the $name profile disjoint union branch",
    ({ profile, seed }) => {
      const model = createModel(profile, builtInMaterial, seed);
      const decoded = roundTrip(model);
      expectRoundTripModel(decoded, model);
      expect(decoded.material.id).toBe(model.material.id);
    }
  );

  it("round-trips built-in material id branch with no repeated numeric payload values", () => {
    const model = createModel(profileCases[3].profile, builtInMaterial, 6000);
    expectNoRepeatedNumericPayloadValues(model);

    const decoded = roundTrip(model);
    expectRoundTripModel(decoded, model);
    expect(decoded.material.id).toBe(model.material.id);
    expectNoRepeatedNumericPayloadValues(decoded);
  });

  it("round-trips custom material branch with no repeated numeric payload values", () => {
    const model = createModel(profileCases[4].profile, customMaterial, 7000);
    expectNoRepeatedNumericPayloadValues(model);

    const decoded = roundTrip(model);
    expectRoundTripModel(decoded, model);
    expect(decoded.material).toEqual(customMaterial);
    expectNoRepeatedNumericPayloadValues(decoded);
  });

  it("returns an error result for invalid input", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const decoded = decodeAnchorLink("#v0-not=base64url");
    expect(decoded.error).toBe(true);
    if (!decoded.error) throw new Error("Expected invalid decode");
    expect(decoded.data).toBeNull();
    expect(decoded.message).toContain("base64url");
    consoleSpy.mockRestore();
  });

  it("returns an error result when validation fails", () => {
    const model = createModel(profileCases[0].profile, builtInMaterial, 8000);
    const encoded = encodeAnchorLink({
      ...model,
      loads: [{ ...model.loads[0], offset: model.length + 1 }],
    });
    expect(encoded.error).toBe(true);
    if (!encoded.error) throw new Error("Expected invalid encode");
    expect(encoded.data).toBeNull();
    expect(encoded.message).toContain("beam span");
  });
});
