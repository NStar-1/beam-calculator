import { writable } from "svelte/store";

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

export const fixationType = writable({ left: "0", right: "0" });
