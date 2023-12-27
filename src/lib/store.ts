import { writable, get, derived } from "svelte/store";
// TODO
import Frame3ddLoader, { type InputScope, type F3DD } from "frame3dd-wasm-js";
import materials from "./materials";
import {
  cylindrical,
  roundTube,
  rectangular,
  rectangularTube,
  iBeam,
} from "./sectionUtil";
import type { Material } from "./materials";
import convert from 'convert'
import type {Force, Length} from 'convert'
import {
  convertLoads,
  deg2rad,
  getLoadAbsPos,
} from "./store-utils";
import * as ProfileIcon from "$lib/assets/xsection";

export enum ProfileType {
  CYLINDRICAL,
  ROUND_TUBE,
  RECTANGLE,
  RECTANGULAR_TUBE,
  I_BEAM,
  CUSTOM,
}

export type FixationType = "NONE" | "FIXED" | "PIN" | "ROLLER";

export const profileNamesLnKeys = {
  [ProfileType.CYLINDRICAL]: {
    icon: ProfileIcon.Cylinder,
  },
  [ProfileType.ROUND_TUBE]: {
    icon: ProfileIcon.Tube,
  },
  [ProfileType.RECTANGLE]: {
    icon: ProfileIcon.Sqw,
  },
  [ProfileType.RECTANGULAR_TUBE]: {
    icon: ProfileIcon.SqwTube,
  },
  [ProfileType.I_BEAM]: {
    icon: ProfileIcon.IBeam,
  },
  [ProfileType.CUSTOM]: {
    icon: ProfileIcon.Custom,
  },
};

// The user should be able to change different profile types without loosing
// the data. Plus, it's neat that data will be naturally mapped between
// similar profiles
export type Profile = CylindricalProfile &
  RoundTubeProfile &
  HollowRectangularProfile &
  IBeamProfile;

export type CylindricalProfile = {
  outerRadius: number;
};

export type RoundTubeProfile = {
  outerRadius: number;
  innerRadius: number;
};

export type RectangularProfile = {
  width: number;
  height: number;
};

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
  offset: number;
  /**
   * Left or right side of the loaded beam
   */
  anchor: AnchorPoint;
  angle: number;
  value: number;
};

export function newEmptyLoadObj(): PointLoad {
  return {
    offset: 0,
    anchor: AnchorPoint.END,
    angle: 0,
    value: 10,
  };
}

export const LengthUnits = ["mm", "cm", "m", "in", "ft"] satisfies ReadonlyArray<Length>;
export const lengthUnit = writable<Length>("mm");

export const ForceUnits = ["newtons", "kgf", "lbf"] satisfies ReadonlyArray<Force>;
export const forceUnit = writable<Force>("newtons");

export const isPhone = writable(false);

/**
 * Overall beam length
 */
export const length = writable(1000);

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
//export const material_id = writable<number>(1);

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
    [ProfileType.CUSTOM]: cylindrical,
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

export type BeamEnd = {
  isFixed: FixationEnum;
};

//export const points = writable<Array<BeamEnd>>([]);
//export const getNextPointId = () => {
//  const pts = get(points);
//  if (pts.length === 0) return 2;
//  return pts[pts.length - 1].id + 1;
//};

export const loads = writable<Array<PointLoad>>([
  {
    anchor: AnchorPoint.END,
    angle: 0,
    offset: 0,
    value: 10,
  },
]);

/**
 * Min and max load values
 */
export const minMaxForce = derived(loads, ($loads) => {
  if ($loads.length === 0) return [0, 0];

  const initial = $loads[0].value;
  let min = initial;
  let max = initial;

  for (let i = 1; i < $loads.length; i++) {
    const current = $loads[i].value;
    if (current > max) max = current;
    if (current < min) min = current;
  }

  return [min, max];
});

export const selectedLoad = writable<number | null>(null);

export const firstPoint = writable<BeamEnd>({
  isFixed: FixationEnum.FIXED,
});

export const lastPoint = writable<BeamEnd>({
  isFixed: FixationEnum.NONE,
});

export const results = writable<F3DD.ResultScope["result"] | void>(undefined);
export const context = writable({});

type AggregatedResult = {
  x: number;
  displacement: F3DD.Vec6;
  reaction: F3DD.Vec6;
};

export const newresults = writable<Array<AggregatedResult>>([]);

export const solveModel = async function () {
  // TODO: we need normal, form-based validation
  //const pointsArr = [...get(points)];
  const loadsArr = [...get(loads)];
  //if (pointsArr.length === 0) {
  //  throw new Error("Points can't be empty");
  //}
  if (loadsArr.length === 0) {
    throw new Error("Loads can't be empty");
  }

  const Frame3DD = await Frame3ddLoader();
  const model = Frame3DD.inputScopeJSON;

  //const lp = processPointLoads(
  //  get(firstPoint),
  //  get(lastPoint),
  //  pointsArr,
  //  loadsArr,
  //  get(length)
  //);

  //model.points = lp.points;
  //model.nN = model.points.length;
  model.pointLoads = convertLoads(lp.loads);
  const mat = get(material);
  model.material.E = mat.E;
  model.material.G = mat.G;
  model.profile = get(profile);
  // FIXME: not sure
  model.material.density = mat.density / 1_000_000;
  console.log(model);
  const res = Frame3DD.calculate(model);
  // TODO map result back to frame data
  results.set(res.result);
};

function getF3DDFixation(fixation: FixationEnum): number[] {
  return {
    [FixationEnum.NONE]: [0, 0, 0, 0, 0, 0],
    [FixationEnum.FIXED]: [1, 1, 1, 1, 1, 1],
    [FixationEnum.ROLLER]: [0, 1, 1, 1, 1, 0],
    [FixationEnum.PIN]: [1, 1, 1, 1, 1, 0],
  }[fixation];
}

function getInitialPoints(
  beam: [BeamEnd, BeamEnd],
  length: number
): [F3DD.Point, F3DD.Point] {
  return [
    { id: 0, reactions: getF3DDFixation(beam[0].isFixed), x: 0, y: 0, z: 0 },
    {
      id: 0,
      reactions: getF3DDFixation(beam[1].isFixed),
      x: length,
      y: 0,
      z: 0,
    },
  ];
}

function generateLoadedPoints(
  loads: Array<PointLoad>,
  length: number
): Array<F3DD.Point> {
  return loads.map((load) => ({
    id: 0,
    reactions: [0, 0, 0, 0, 0, 0],
    x: getLoadAbsPos(load, length),
    y: 0,
    z: 0,
  }));
}

/**
 * ! Beam Points must go before other points!
 */
function deduplicatePoints(points: Array<F3DD.Point>): Array<F3DD.Point> {
  return (
    points
      .reduce((acc: Array<F3DD.Point>, point) => {
        const exists = !!acc.find((d) => d.x === point.x);
        if (exists) {
          return acc;
        } else {
          return acc.concat(point);
        }
      }, [])
      // Sorts points by x position
      .sort((a, b) => a.x - b.x)
      // Assign IDs
      .map((d, idx) => ({
        ...d,
        id: idx + 1,
      }))
  );
}

function getElements(points: Array<F3DD.Point>): Array<F3DD.FrameElement> {
  const elements: Array<F3DD.FrameElement> = [];
  points.reduce((previous, current, idx) => {
    // Skip first iteration
    if (previous !== current)
      elements.push({
        id: idx,
        from: previous.id,
        to: current.id,
      });
    return current;
  }, points[0]);
  return elements;
}

function getPointLoads(
  points: Array<F3DD.Point>,
  loads: Array<PointLoad>,
  length: number
): Array<F3DD.PointLoad> {
  return (
    loads
      .map((load) => {
        const radAngle = deg2rad(load.angle);
        const pos = getLoadAbsPos(load, length);
        const point = points.find((d) => d.x === pos)!;
        // derived
        const xLoad = Math.sin(radAngle) * load.value;
        // derived
        const yLoad = -Math.cos(radAngle) * load.value;
        return {
          id: point.id,
          axial: [xLoad, yLoad, 0],
          rotational: [0, 0, 0],
        } as F3DD.PointLoad;
      })
      // Collapse multiple loads per node
      .reduce((acc, f3ddPointLoad) => {
        const existing = acc.find((d) => d.id === f3ddPointLoad.id)!;
        if (existing !== undefined) {
          existing.axial[0] += f3ddPointLoad.axial[0];
          existing.axial[1] += f3ddPointLoad.axial[1];
          existing.axial[2] += f3ddPointLoad.axial[2];
          existing.rotational[0] += f3ddPointLoad.rotational[0];
          existing.rotational[1] += f3ddPointLoad.rotational[1];
          existing.rotational[2] += f3ddPointLoad.rotational[2];
          return acc;
        } else {
          return acc.concat(f3ddPointLoad);
        }
      }, [] as Array<F3DD.PointLoad>)
  );
}

export async function solveModel2(): Promise<InputScope> {
  const Frame3DD = await Frame3ddLoader();
  const model = Frame3DD.inputScopeJSON;

  const loadedPoints = generateLoadedPoints(get(loads), get(length));
  const points = deduplicatePoints(
    getInitialPoints([get(firstPoint), get(lastPoint)], get(length)).concat(
      loadedPoints
    )
  );
  
  const pointLoads = getPointLoads(points, get(loads), get(length))

  // Convert units and assign to the model
  model.points = points.map((d) => ({
    ...d,
    x: convert(d.x, get(lengthUnit)).to('mm'),
    y: convert(d.y, get(lengthUnit)).to('mm'),
    z: convert(d.z, get(lengthUnit)).to('mm'),
  }));
  model.elements = getElements(points);
  model.pointLoads = pointLoads.map((d) => ({
    ...d,
    axial: [
      convert(d.axial[0], get(forceUnit)).to('newtons'),
      convert(d.axial[1], get(forceUnit)).to('newtons'),
      convert(d.axial[2], get(forceUnit)).to('newtons'),
    ]
  }));
  const mat = get(material);
  model.material.E = mat.E;
  model.material.G = mat.G;
  // FIXME: not sure
  model.material.density = mat.density / 1_000_000;

  model.profile = get(profile);
  console.log(model);
  const res = Frame3DD.calculate(model);
  console.log(res);
  results.set(res.result);
  const resAgg = res.result.D.map((d, idx) => ({
    x: points[idx].x,
    displacement: {
      ...d,
      x: convert(d.x, 'mm').to(get(lengthUnit)),
      y: convert(d.y, 'mm').to(get(lengthUnit)),
      z: convert(d.z, 'mm').to(get(lengthUnit)),
    },
    reaction: res.result.R[idx],
  }));
  console.log(resAgg);
  newresults.set(resAgg);
  return model;
}

// virtual store
const modelState = derived(
  [length, lengthUnit, forceUnit, loads, profileType, profile, material, firstPoint, lastPoint],
  (x) => x
);

// FIXME this would fail if you try to subscribe Hermite
// Probably, svelete(kit) executes code here on compile time
export function subscribeAutoRefresh() {
  modelState.subscribe(() => solveModel2());
}
