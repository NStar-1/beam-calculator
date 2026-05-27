export enum ProfileType {
  CYLINDRICAL,
  ROUND_TUBE,
  RECTANGLE,
  RECTANGULAR_TUBE,
  I_BEAM,
  CUSTOM,
}

export type FixationType = "NONE" | "FIXED" | "PIN" | "ROLLER";

// The user should be able to change different profile types without losing
// the data. Plus, it's neat that data will be naturally mapped between
// similar profiles.
export type Profile = CylindricalProfile &
  RoundTubeProfile &
  RectangularTubeProfile &
  IBeamProfile;

export type CylindricalProfile = {
  outerDiameter: number;
};

export type RoundTubeProfile = {
  outerDiameter: number;
  innerDiameter: number;
};

export type RectangularProfile = {
  width: number;
  height: number;
};

export type RectangularTubeProfile = RectangularProfile & {
  thickness: number;
};

export type HollowRectangularProfile = RectangularTubeProfile;

export type PartialProfileData = Partial<Profile>;

export type IBeamProfile = {
  width: number;
  depth: number;
  flangeThickness: number;
  webThickness: number;
};

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

export enum FixationEnum {
  NONE = 0,
  FIXED = 1,
  ROLLER = 2,
  PIN = 3,
}

export type BeamEnd = {
  isFixed: FixationEnum;
};

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
