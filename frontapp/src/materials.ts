export type Material = {
  category: string;
  subcategory: string;
  name: string;
  E: number;
  G: number;
  density: number;
};

export default <Array<Material>>[
  {
    category: "steel",
    subcategory: "n/a",
    name: "Ст3",
    E: 200_000,
    G: 74_000,
    density: 7_850,
  },
  {
    category: "steel",
    subcategory: "instrumental",
    name: "У10",
    E: 208_000,
    G: 81_000,
    density: 7_810,
  },
  {
    category: "steel",
    subcategory: "reinfrorcement",
    name: "26Г2С",
    E: 200_000,
    G: 77_000,
    density: 7_850,
  },
  {
    category: "alluminium",
    subcategory: "reinfrorcement",
    name: "26Г2С",
    E: 200_000,
    G: 77_000,
    density: 7_850,
  },
  {
    category: "alluminium",
    subcategory: "reinfrorcement",
    name: "26Г2С",
    E: 200_000,
    G: 77_000,
    density: 7_850,
  },

];
