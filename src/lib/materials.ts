import materials from './materials.json'
import other from './materials_other.json'

export type Material = {
  categories: Array<string>;
  name: string;
  E: number;
  G: number;
  density: number;
};

export default (materials as Material[]).concat(other as Material[]);
