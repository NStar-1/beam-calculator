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
