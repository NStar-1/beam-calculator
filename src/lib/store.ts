import { writable, get } from "svelte/store";
// TODO
// @ts-ignore
import Frame3ddLoader from "frame3dd-wasm-js";
import materials from "./materials";
import {
  cylindrical,
  roundTube,
  rectangular,
  rectangularTube,
  iBeam,
} from "./sectionUtil";
import type { Material } from "./materials";
import { convertLoads, processPointLoads } from "./store-utils";

export enum ProfileType {
  CYLINDRICAL,
  ROUND_TUBE,
  RECTANGLE,
  RECTANGULAR_TUBE,
  I_BEAM,
}

export type FixationType = "NONE" | "FIXED" | "PIN" | "ROLLER";

export const profileNamesLnKeys = {
  [ProfileType.CYLINDRICAL]: {
    i18nKey: "profiles.name.cylindrical",
    img: "CircShtr",
  },
  [ProfileType.ROUND_TUBE]: {
    i18nKey: "profiles.name.roundTube",
    img: "CircCircShtr",
  },
  [ProfileType.RECTANGLE]: {
    i18nKey: "profiles.name.rectangle",
    img: "SquareShtr",
  },
  [ProfileType.RECTANGULAR_TUBE]: {
    i18nKey: "profiles.name.rectangularTube",
    img: "SqwSqwShtr",
  },
  [ProfileType.I_BEAM]: { i18nKey: "profiles.name.iBeam", img: "IShtr" },
};

// The user should be able to change different profile types without loosing
// the data. Plus, it's neat that data will be naturally mapped between
// similar profiles
export type Profile = CylindricalProfile &
  RoundTubeProfile &
  HollowRectangularProfile &
  IBeamProfile;

export type CylindricalProfile = Partial<{
  outerRadius: number;
}>;

export type RoundTubeProfile = Partial<{
  outerRadius: number;
  innerRadius: number;
}>;

export type RectangularProfile = Partial<{
  width: number;
  height: number;
}>;

export type HollowRectangularProfile = Partial<{
  width: number;
  height: number;
  thickness: number;
}>;

export type IBeamProfile = Partial<{
  width: number;
  depth: number;
  flangeThickness: number;
  webThickness: number;
}>;

export type TBeamProfile = Partial<{
  width: number;
  depth: number;
  thickness: number;
}>;

export enum AnchorPoint {
  START,
  END,
  MIDDLE,
}

export type LoadType = "pointed" | "distributed";

export type PointLoad = {
  type: LoadType; // FIXME point load can not be distributed
  node: number; // Computed value
  offset: number;
  anchor: AnchorPoint;
  angle: number;
  load: number;
  loadValueType: "mass" | "force"; // FIXME foce should be enough
};

export const tempLoad = writable<PointLoad>(newEmptyLoadObj());

export function newEmptyLoadObj(): PointLoad {
  return {
    type: "pointed",
    node: -1,
    offset: 0,
    anchor: AnchorPoint.END,
    angle: 0,
    load: 0,
    loadValueType: "force",
  };
}

export const isPhone = writable(false);

export const length = writable(5000);

export const cutVal = writable(0);
export const cutInputs = writable([]);

export const profileType = writable<ProfileType>(ProfileType.CYLINDRICAL);
export const profileData = writable<Profile>({
  outerRadius: 10,
  innerRadius: 8,
  height: 10,
  width: 20,
  thickness: 3,
  depth: 10,
  webThickness: 3,
  flangeThickness: 2,
});

// TODO add typing
export const material_id = writable<number>(1);

export const material = writable<Material>(materials[0]);

export type ProfileDescription = {
  // Cross-section areas including shear
  Ax: number;
  Asy: number;
  Asz: number;
  // Section inertias
  Jx: number;
  Iy: number;
  Iz: number;
};

const defaultProfileDescription = {
  Ax: 36,
  Asy: 20,
  Asz: 20,
  Jx: 1000,
  Iy: 500,
  Iz: 500,
};

export const profile = writable<ProfileDescription>(defaultProfileDescription);
export const profileInfo = writable();

const updateProfile = function () {
  const calculate = {
    [ProfileType.CYLINDRICAL]: cylindrical,
    [ProfileType.ROUND_TUBE]: roundTube,
    [ProfileType.RECTANGLE]: rectangular,
    [ProfileType.RECTANGULAR_TUBE]: rectangularTube,
    [ProfileType.I_BEAM]: iBeam,
  }[get(profileType)];
  profile.set(calculate(get(profileData)));

  const {
    outerRadius,
    innerRadius,
    thickness,
    height,
    width,
    depth,
    flangeThickness,
    webThickness,
  } = get(profileData);

  switch (get(profileType)) {
    case ProfileType.CYLINDRICAL:
      profileInfo.set(`r=${outerRadius}`);
      break;
    case ProfileType.ROUND_TUBE:
      profileInfo.set(`ri=${innerRadius}, ro=${outerRadius}`);
      break;
    case ProfileType.RECTANGLE:
      profileInfo.set(`h=${height},w=${width}`);
      break;
    case ProfileType.RECTANGULAR_TUBE:
      profileInfo.set(`h=${height},w=${width},t=${thickness}`);
      break;
    case ProfileType.I_BEAM:
      profileInfo.set(
        `d=${depth},w=${width},t=${webThickness},f=${flangeThickness}`
      );
      break;
  }
};

profileType.subscribe(updateProfile);
profileData.subscribe(updateProfile);

export enum FixationEnum {
  NONE = 0,
  FIXED = 1,
  ROLLER = 2,
  PIN = 3,
}

export type Point = {
  id: number;
  isFixed: FixationEnum;
  x: number;
  y: number;
  z: number;
};

export const points = writable<Array<Point>>([]);
export const getNextPointId = () => {
  const pts = get(points);
  if (pts.length === 0) return 2;
  return pts[pts.length - 1].id + 1;
};

export const loads = writable<Array<PointLoad>>([]);
export const selectedLoad = writable<number>(-1);

export const firstPoint = writable<Point>({
  id: 1,
  isFixed: FixationEnum.FIXED,
  x: 0,
  y: 0,
  z: 0,
});

export const lastPoint = writable<Point>({
  id: 2,
  isFixed: FixationEnum.NONE,
  x: -1,
  y: 0,
  z: 0,
});

length.subscribe((l) => {
  lastPoint.set({
    ...get(lastPoint),
    x: l,
  });
});

export const results = writable({});
export const context = writable({});

export const solveModel = async function () {
  // TODO: we need normal, form-based validation
  const pointsArr = [...get(points)];
  const loadsArr = [...get(loads)];
  if (pointsArr.length === 0) {
    throw new Error("Points can't be empty");
  }
  if (loadsArr.length === 0) {
    throw new Error("Loads can't be empty");
  }

  const Frame3DD = await Frame3ddLoader();
  const model = Frame3DD.inputScopeJSON;

  const lp = processPointLoads(
    get(firstPoint),
    get(lastPoint),
    pointsArr,
    loadsArr,
    get(length)
  );

  model.points = lp.points;
  model.nN = model.points.length;
  model.nE = model.nN - 1;
  model.pointLoads = convertLoads(lp.loads);
  const mat = get(material);
  model.material.E = mat.E;
  model.material.G = mat.G;
  model.profile = get(profile);
  // FIXME: not sure
  model.material.density = mat.density / 1_000_000;
  console.log(model);
  const res = Frame3DD.calculate(model);
  results.set(res.result);
};
