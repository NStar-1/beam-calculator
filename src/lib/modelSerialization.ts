import type { Force, Length } from "convert";
import { getMaterialById, materials, type Material } from "./materials";
import {
  AnchorPoint,
  FixationEnum,
  ProfileType,
  type BeamEnd,
  type CylindricalProfile,
  type RectangularTubeProfile,
  type IBeamProfile,
  type PointLoad,
  type RectangularProfile,
  type RoundTubeProfile,
} from "./model";

export const ANCHOR_LINK_VERSION = "v0";
const PREFIX = `${ANCHOR_LINK_VERSION}-`;

const LENGTH_UNITS: ReadonlyArray<Length> = ["mm", "cm", "m", "in", "ft"];
const FORCE_UNITS: ReadonlyArray<Force> = ["newtons", "kgf", "lbf"];

const enum ModelType {
  OneDimensional = 1,
}

const enum MaterialEncoding {
  BuiltInId = 0,
  Custom = 1,
}

const enum LoadType {
  Point = 0,
}

export type AnchorLinkResult<T> =
  | { error: false; data: T; message: "" }
  | { error: true; data: null; message: string };

export type AnchorLinkProfile =
  | { profileType: ProfileType.CYLINDRICAL; profileData: CylindricalProfile }
  | { profileType: ProfileType.ROUND_TUBE; profileData: RoundTubeProfile }
  | { profileType: ProfileType.RECTANGLE; profileData: RectangularProfile }
  | {
      profileType: ProfileType.RECTANGULAR_TUBE;
      profileData: RectangularTubeProfile;
    }
  | { profileType: ProfileType.I_BEAM; profileData: IBeamProfile };

type AnchorLinkModelBase = {
  length: number;
  lengthUnit: Length;
  forceUnit: Force;
  firstPoint: BeamEnd;
  lastPoint: BeamEnd;
  material: Material;
  loads: PointLoad[];
};

export type AnchorLinkModel = AnchorLinkModelBase & AnchorLinkProfile;

class AnchorLinkError extends Error {}

class BinaryWriter {
  #bytes: number[] = [];

  writeU8(value: number) {
    this.#bytes.push(value & 0xff);
  }

  writeU16(value: number) {
    this.#bytes.push(value & 0xff, (value >> 8) & 0xff);
  }

  writeF32(value: number) {
    const buffer = new ArrayBuffer(4);
    new DataView(buffer).setFloat32(0, value, true);
    this.#bytes.push(...new Uint8Array(buffer));
  }

  toBytes(): Uint8Array {
    return new Uint8Array(this.#bytes);
  }
}

class BinaryReader {
  #view: DataView;
  #offset = 0;

  constructor(bytes: Uint8Array) {
    this.#view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }

  get offset() {
    return this.#offset;
  }

  get length() {
    return this.#view.byteLength;
  }

  readU8(label: string): number {
    this.#ensure(1, label);
    const value = this.#view.getUint8(this.#offset);
    this.#offset += 1;
    return value;
  }

  readU16(label: string): number {
    this.#ensure(2, label);
    const value = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;
    return value;
  }

  readF32(label: string): number {
    this.#ensure(4, label);
    const value = this.#view.getFloat32(this.#offset, true);
    this.#offset += 4;
    return value;
  }

  #ensure(size: number, label: string) {
    if (this.#offset + size > this.#view.byteLength) {
      throw new AnchorLinkError(`Unexpected end of payload while reading ${label}`);
    }
  }
}

export function encodeAnchorLink(
  model: AnchorLinkModel
): AnchorLinkResult<string> {
  try {
    validateModel(model);

    const writer = new BinaryWriter();
    writer.writeU8(ModelType.OneDimensional);
    writer.writeF32(model.length);
    writer.writeU8(indexOfUnit(LENGTH_UNITS, model.lengthUnit, "length unit"));
    writer.writeU8(indexOfUnit(FORCE_UNITS, model.forceUnit, "force unit"));
    writer.writeU8(model.firstPoint.isFixed);
    writer.writeU8(model.lastPoint.isFixed);

    writer.writeU8(model.profileType);
    writeProfile(writer, model);
    writeMaterial(writer, model.material);

    writer.writeU8(model.loads.length);
    for (const load of model.loads) {
      writer.writeU8(LoadType.Point);
      writer.writeU8(load.anchor);
      writer.writeF32(load.offset);
      writer.writeF32(load.value);
      writer.writeF32(load.angle);
    }

    return ok(`#${PREFIX}${bytesToBase64Url(writer.toBytes())}`);
  } catch (error) {
    return fail(errorMessage(error));
  }
}

export function decodeAnchorLink(
  anchorLink: string
): AnchorLinkResult<AnchorLinkModel> {
  try {
    const payload = getPayload(anchorLink);
    const reader = new BinaryReader(base64UrlToBytes(payload));

    const modelType = reader.readU8("model type");
    if (modelType !== ModelType.OneDimensional) {
      throw new AnchorLinkError(`Unsupported model type: ${modelType}`);
    }

    const length = readFiniteF32(reader, "beam length");
    const lengthUnit = readLengthUnit(reader);
    const forceUnit = readForceUnit(reader);
    const firstPoint: BeamEnd = { isFixed: readFixation(reader, "left fixation") };
    const lastPoint: BeamEnd = { isFixed: readFixation(reader, "right fixation") };
    const profile = readProfile(reader);
    const material = readMaterial(reader);
    const loads = readLoads(reader, length);

    if (reader.offset !== reader.length) {
      throw new AnchorLinkError(
        `Unexpected trailing payload bytes: ${reader.length - reader.offset}`
      );
    }

    const model: AnchorLinkModel = {
      length,
      lengthUnit,
      forceUnit,
      firstPoint,
      lastPoint,
      ...profile,
      material,
      loads,
    };
    validateModel(model);
    return ok(model);
  } catch (error) {
    const message = errorMessage(error);
    console.error("Failed to decode anchor link", message);
    return fail(message);
  }
}

function writeProfile(writer: BinaryWriter, profile: AnchorLinkProfile) {
  switch (profile.profileType) {
    case ProfileType.CYLINDRICAL:
      writer.writeF32(profile.profileData.outerDiameter);
      break;
    case ProfileType.ROUND_TUBE:
      writer.writeF32(profile.profileData.outerDiameter);
      writer.writeF32(profile.profileData.innerDiameter);
      break;
    case ProfileType.RECTANGLE:
      writer.writeF32(profile.profileData.width);
      writer.writeF32(profile.profileData.height);
      break;
    case ProfileType.RECTANGULAR_TUBE:
      writer.writeF32(profile.profileData.width!);
      writer.writeF32(profile.profileData.height!);
      writer.writeF32(profile.profileData.thickness!);
      break;
    case ProfileType.I_BEAM:
      writer.writeF32(profile.profileData.width!);
      writer.writeF32(profile.profileData.depth!);
      writer.writeF32(profile.profileData.flangeThickness!);
      writer.writeF32(profile.profileData.webThickness!);
      break;
  }
}

function readProfile(reader: BinaryReader): AnchorLinkProfile {
  const profileType = reader.readU8("profile type");
  switch (profileType) {
    case ProfileType.CYLINDRICAL:
      return {
        profileType,
        profileData: { outerDiameter: readFiniteF32(reader, "outer diameter") },
      };
    case ProfileType.ROUND_TUBE:
      return {
        profileType,
        profileData: {
          outerDiameter: readFiniteF32(reader, "outer diameter"),
          innerDiameter: readFiniteF32(reader, "inner diameter"),
        },
      };
    case ProfileType.RECTANGLE:
      return {
        profileType,
        profileData: {
          width: readFiniteF32(reader, "width"),
          height: readFiniteF32(reader, "height"),
        },
      };
    case ProfileType.RECTANGULAR_TUBE:
      return {
        profileType,
        profileData: {
          width: readFiniteF32(reader, "width"),
          height: readFiniteF32(reader, "height"),
          thickness: readFiniteF32(reader, "thickness"),
        },
      };
    case ProfileType.I_BEAM:
      return {
        profileType,
        profileData: {
          width: readFiniteF32(reader, "width"),
          depth: readFiniteF32(reader, "depth"),
          flangeThickness: readFiniteF32(reader, "flange thickness"),
          webThickness: readFiniteF32(reader, "web thickness"),
        },
      };
    default:
      throw new AnchorLinkError(`Unsupported profile type: ${profileType}`);
  }
}

function writeMaterial(writer: BinaryWriter, material: Material) {
  if (material.id !== undefined) {
    assertU16(material.id, "material id");
    if (!getMaterialById(material.id)) {
      throw new AnchorLinkError(`Unknown material id: ${material.id}`);
    }
    writer.writeU8(MaterialEncoding.BuiltInId);
    writer.writeU16(material.id);
    return;
  }

  writer.writeU8(MaterialEncoding.Custom);
  writer.writeF32(material.E);
  writer.writeF32(material.G);
  writer.writeF32(material.density);
}

function readMaterial(reader: BinaryReader): Material {
  const materialEncoding = reader.readU8("material encoding");
  switch (materialEncoding) {
    case MaterialEncoding.BuiltInId: {
      const id = reader.readU16("material id");
      const material = getMaterialById(id);
      if (!material) {
        throw new AnchorLinkError(`Unknown material id: ${id}`);
      }
      return material;
    }
    case MaterialEncoding.Custom:
      return {
        categories: ["Custom"],
        name: "Custom",
        E: readFiniteF32(reader, "custom material E"),
        G: readFiniteF32(reader, "custom material G"),
        density: readFiniteF32(reader, "custom material density"),
      };
    default:
      throw new AnchorLinkError(
        `Unsupported material encoding: ${materialEncoding}`
      );
  }
}

function readLoads(reader: BinaryReader, length: number): PointLoad[] {
  const count = reader.readU8("load count");
  const loads: PointLoad[] = [];
  for (let index = 0; index < count; index++) {
    const loadType = reader.readU8(`load ${index} type`);
    if (loadType !== LoadType.Point) {
      throw new AnchorLinkError(`Unsupported load type: ${loadType}`);
    }

    const anchor = readAnchor(reader, index);
    const load: PointLoad = {
      anchor,
      offset: readFiniteF32(reader, `load ${index} offset`),
      value: readFiniteF32(reader, `load ${index} value`),
      angle: readFiniteF32(reader, `load ${index} angle`),
    };
    validateLoad(load, length);
    loads.push(load);
  }
  return loads;
}

function validateModel(model: AnchorLinkModel) {
  assertPositiveFinite(model.length, "beam length");
  indexOfUnit(LENGTH_UNITS, model.lengthUnit, "length unit");
  indexOfUnit(FORCE_UNITS, model.forceUnit, "force unit");
  validateFixation(model.firstPoint.isFixed, "left fixation");
  validateFixation(model.lastPoint.isFixed, "right fixation");
  validateProfile(model);
  validateMaterial(model.material);

  if (model.loads.length > 255) {
    throw new AnchorLinkError("Too many loads: v0 supports at most 255");
  }
  for (const load of model.loads) {
    validateLoad(load, model.length);
  }
}

function validateProfile(profile: AnchorLinkProfile) {
  switch (profile.profileType) {
    case ProfileType.CYLINDRICAL:
      assertPositiveFinite(profile.profileData.outerDiameter, "outer diameter");
      break;
    case ProfileType.ROUND_TUBE:
      assertPositiveFinite(profile.profileData.outerDiameter, "outer diameter");
      assertPositiveFinite(profile.profileData.innerDiameter, "inner diameter");
      if (profile.profileData.innerDiameter >= profile.profileData.outerDiameter) {
        throw new AnchorLinkError("Inner radius must be less than outer diameter");
      }
      break;
    case ProfileType.RECTANGLE:
      assertPositiveFinite(profile.profileData.width, "width");
      assertPositiveFinite(profile.profileData.height, "height");
      break;
    case ProfileType.RECTANGULAR_TUBE:
      assertPositiveFinite(profile.profileData.width, "width");
      assertPositiveFinite(profile.profileData.height, "height");
      assertPositiveFinite(profile.profileData.thickness, "thickness");
      if (
        profile.profileData.thickness * 2 >=
        Math.min(profile.profileData.width, profile.profileData.height)
      ) {
        throw new AnchorLinkError(
          "Rectangular tube thickness must be less than half of width and height"
        );
      }
      break;
    case ProfileType.I_BEAM:
      assertPositiveFinite(profile.profileData.width, "width");
      assertPositiveFinite(profile.profileData.depth, "depth");
      assertPositiveFinite(profile.profileData.flangeThickness, "flange thickness");
      assertPositiveFinite(profile.profileData.webThickness, "web thickness");
      if (profile.profileData.flangeThickness * 2 >= profile.profileData.depth) {
        throw new AnchorLinkError(
          "I-beam flange thickness must be less than half of depth"
        );
      }
      if (profile.profileData.webThickness >= profile.profileData.width) {
        throw new AnchorLinkError("I-beam web thickness must be less than width");
      }
      break;
  }
}

function validateMaterial(material: Material) {
  if (material.id !== undefined) {
    assertU16(material.id, "material id");
    if (!getMaterialById(material.id)) {
      throw new AnchorLinkError(`Unknown material id: ${material.id}`);
    }
  }
  assertPositiveFinite(material.E, "material E");
  assertNonNegativeFinite(material.G, "material G");
  assertPositiveFinite(material.density, "material density");
}

function validateLoad(load: PointLoad, length: number) {
  validateAnchor(load.anchor);
  assertFiniteNumber(load.offset, "load offset");
  assertFiniteNumber(load.value, "load value");
  assertFiniteNumber(load.angle, "load angle");

  if (load.anchor !== AnchorPoint.MIDDLE) {
    if (load.offset < 0 || load.offset > length) {
      throw new AnchorLinkError("Load offset must be within the beam span");
    }
  }
}

function readLengthUnit(reader: BinaryReader): Length {
  const index = reader.readU8("length unit");
  const unit = LENGTH_UNITS[index];
  if (!unit) {
    throw new AnchorLinkError(`Unsupported length unit: ${index}`);
  }
  return unit;
}

function readForceUnit(reader: BinaryReader): Force {
  const index = reader.readU8("force unit");
  const unit = FORCE_UNITS[index];
  if (!unit) {
    throw new AnchorLinkError(`Unsupported force unit: ${index}`);
  }
  return unit;
}

function readFixation(reader: BinaryReader, label: string): FixationEnum {
  const value = reader.readU8(label);
  validateFixation(value, label);
  return value;
}

function readAnchor(reader: BinaryReader, index: number): AnchorPoint {
  const value = reader.readU8(`load ${index} anchor`);
  validateAnchor(value);
  return value;
}

function readFiniteF32(reader: BinaryReader, label: string): number {
  const value = reader.readF32(label);
  assertFiniteNumber(value, label);
  return value;
}

function validateFixation(value: number, label: string): asserts value is FixationEnum {
  if (
    value !== FixationEnum.NONE &&
    value !== FixationEnum.FIXED &&
    value !== FixationEnum.ROLLER &&
    value !== FixationEnum.PIN
  ) {
    throw new AnchorLinkError(`Unsupported ${label}: ${value}`);
  }
}

function validateAnchor(value: number): asserts value is AnchorPoint {
  if (
    value !== AnchorPoint.START &&
    value !== AnchorPoint.END &&
    value !== AnchorPoint.MIDDLE
  ) {
    throw new AnchorLinkError(`Unsupported load anchor: ${value}`);
  }
}

function indexOfUnit<T extends string>(
  units: ReadonlyArray<T>,
  unit: T,
  label: string
): number {
  const index = units.indexOf(unit);
  if (index < 0) {
    throw new AnchorLinkError(`Unsupported ${label}: ${unit}`);
  }
  return index;
}

function assertPositiveFinite(value: number | undefined, label: string) {
  assertFiniteNumber(value, label);
  if (value <= 0) {
    throw new AnchorLinkError(`${label} must be greater than zero`);
  }
}

function assertNonNegativeFinite(value: number | undefined, label: string) {
  assertFiniteNumber(value, label);
  if (value < 0) {
    throw new AnchorLinkError(`${label} must not be negative`);
  }
}

function assertFiniteNumber(
  value: number | undefined,
  label: string
): asserts value is number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new AnchorLinkError(`${label} must be finite`);
  }
}

function assertU16(value: number, label: string) {
  if (!Number.isInteger(value) || value < 0 || value > 0xffff) {
    throw new AnchorLinkError(`${label} must fit u16`);
  }
}

function getPayload(anchorLink: string): string {
  const withoutHash = anchorLink.startsWith("#")
    ? anchorLink.slice(1)
    : anchorLink;

  if (!withoutHash.startsWith(PREFIX)) {
    throw new AnchorLinkError("Missing required v0- anchor-link prefix");
  }

  const payload = withoutHash.slice(PREFIX.length);
  if (payload.length === 0) {
    throw new AnchorLinkError("Anchor-link payload is empty");
  }
  return payload;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(offset, offset + chunkSize));
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(payload: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(payload)) {
    throw new AnchorLinkError("Payload must be unpadded base64url");
  }
  if (payload.length % 4 === 1) {
    throw new AnchorLinkError("Invalid base64url payload length");
  }

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  let binary: string;
  try {
    binary = atob(padded);
  } catch {
    throw new AnchorLinkError("Invalid base64url payload");
  }

  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function ok<T>(data: T): AnchorLinkResult<T> {
  return { error: false, data, message: "" };
}

function fail<T>(message: string): AnchorLinkResult<T> {
  return { error: true, data: null, message };
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

