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

export type IBeamLoad = {
  type: string;
  x: Array<number>;
  angle: number;
  force: number;
};

export function newEmptyLoadObj() {
  return {
    type: "pointed",
    x: [0],
    angle: 90,
    force: 0,
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

export const loads = writable<Array<IBeamLoad>>([newEmptyLoadObj()]);

export const fixationType = writable({ left: 1, right: 0 });

export const results = writable({});
export const context = writable({});

const solve_model = async function () {
  const Frame3DD = await Frame3ddLoader();
  const model = Frame3DD.inputScopeJSON;
  model.points[1].x = get(length);
  const mat = get(material);
  model.material.E = mat.E;
  model.material.G = mat.G;
  model.profile = get(profile);
  // FIXME not sure
  model.material.density = mat.density / 1_000_000;
  console.log(model);
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
