import builtinMaterials from "./materials.json";
import otherMaterials from "./materials_other.json";

export type Material = {
  /** Built-in materials have explicit sequential u16 ids. Custom materials do not have an id. */
  id?: number;
  categories: Array<string>;
  name: string;
  E: number;
  G: number;
  density: number;
};

export const materials: Material[] = (builtinMaterials as Material[]).concat(
  otherMaterials as Material[]
);

export function getMaterialById(id: number): Material | undefined {
  return materials.find((material) => material.id === id);
}
