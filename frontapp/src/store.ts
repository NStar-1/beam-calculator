import { writable } from "svelte/store";
import Frame3ddLoader from 'frame3dd-wasm-js';

export enum ProfileType {
  UNSET,
  CYLINDRICAL,
  ROUND_TUBE,
}

// The user should be able to change different profile types without loosing
// the data. Plus, it's neat that data will be naturally mapped between
// similar profiles
export type Profile = CylindricalProfile & RoundTubeProfile;

export type CylindricalProfile = {
  outerRadius: number;
};

export type RoundTubeProfile = {
  outerRadius: number;
  innerRadius: number;
};

export type SquareProfile = {
  width: number;
  height: number;
};

export type HollowSquareProfile = {
  width: number;
  height: number;
  thickness: number;
};

export type IBeamProfile = {
  width: number;
  height: number;
  thickness: number;
};

export type TBeamProfile = {
  width: number;
  height: number;
  thickness: number;
};

export type IBeamLoad = {
  type: string;
  x: Array<number>;
  angle:number;
  force: number;
};

export function newEmptyLoadObj(){
  return {
    type: 'pointed',
    x: [0],
    angle: 90,
    force: 0
  };
}

export const length = writable(300);

export const cutVal = writable(0);
export const cutInputs = writable([]);

export const profileType = writable<ProfileType>(ProfileType.CYLINDRICAL);
export const profileData = writable<Profile>({
  outerRadius: 10,
  innerRadius: 8,
});
// TODO add typing
export const material = writable<number>(1);

export const loads = writable<Array<IBeamLoad>>([newEmptyLoadObj()]);

export const fixationType = writable({ left: 1, right: 0 });

export const results = writable({})
export const context = writable({})

length.subscribe(async (value) => {
    const Frame3DD = await Frame3ddLoader()
    const model = Frame3DD.inputScopeJSON
    model.points[1].x = value;
    console.log(model.points)
    const res = Frame3DD.calculate(model)
    results.set(res.result)
})
