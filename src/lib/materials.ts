import materials from './materials.json'

export type Material = {
  categories: Array<string>;
  name: string;
  E: number;
  G: number;
  density: number;
};

export default <Array<Material>>materials;
