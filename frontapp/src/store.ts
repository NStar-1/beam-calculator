import { writable, get } from "svelte/store";
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

export enum ProfileType {
  CYLINDRICAL,
  ROUND_TUBE,
  RECTANGLE,
  RECTANGULAR_TUBE,
  I_BEAM,
}

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

export type LoadType = "pointed" | "distributed";

export type PointLoad = {
  type: LoadType;
  node: number;
  offset: number;
  angle: number;
  load: number;
  loadValueType: "mass" | "force";
};

export function newEmptyLoadObj(): PointLoad {
  return {
    type: "pointed",
    node: 0,
    offset: 0,
    angle: 90,
    load: 0,
    loadValueType: "force",
  };
}

export const isPhone = writable(false);

export const length = writable(7000);

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
      profileInfo.set(`d=${depth},w=${width},t=${webThickness},f=${flangeThickness}`);
      break;
  }
};

profileType.subscribe(updateProfile);
profileData.subscribe(updateProfile);

export const loads = writable<Array<PointLoad>>([newEmptyLoadObj()]);
export const seletedLoad = writable<number>(-1);

export type Point = {
  id: number;
  isFixed: 0 | 1;
  x: number;
  y: number;
  z: number;
};

const defaultPoint: Point = { id: 1, isFixed: 1, x: 0, y: 0, z: 0 };
export const points = writable<Array<Point>>([defaultPoint]);
export const getLastPointId = () => get(points)[get(points).length - 1].id;

export const fixationType = writable({ left: 1, right: 0 });

export const results = writable({});
export const context = writable({});

const convertLoads = () => {
  const ls = get(loads);
  return ls.map(l => ({
    axial: [Math.cos(l.angle) * l.load, Math.sin(l.angle) * l.load, 0],
    id: l.node,
    number: 1,
    rotational: [0,0,0],
  }));
}

const solve_model = async function () {
  const Frame3DD = await Frame3ddLoader();
  const model = Frame3DD.inputScopeJSON;
  console.log(model);
  const lastPointId = getLastPointId() + 1;
  model.points = [...get(points)];
  model.points.push({ id: lastPointId, isFixed: 1, x: get(length), y: 0, z: 0 });
  model.nN = 3;
  model.nE = model.nN - 1;
  console.log(convertLoads());
  model.pointLoads = convertLoads();
  const mat = get(material);
  model.material.E = mat.E;
  model.material.G = mat.G;
  model.profile = get(profile);
  // FIXME not sure
  model.material.density = mat.density / 1_000_000;
  console.log(JSON.stringify(model));
  console.log(model.points);
  const res = Frame3DD.calculate(model);
  results.set(res.result);
};

length.subscribe(async () => {
  await solve_model();
});

material_id.subscribe((value) => {
  material.set(materials[value]);
});

material.subscribe(async () => {
  await solve_model();
});

profile.subscribe(async () => {
  await solve_model();
});

loads.subscribe(async () => {
  await solve_model();
});
