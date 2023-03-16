import { _ } from "svelte-i18n";
import { base } from "$app/paths";

export const fixationConst = [
  { src: null, desc: "none", height: 0 },
  {
    src: `${base}/assets/other/svg (14).svg`,
    desc: "fixed end",
    leftX: -68,
    leftY: -60,
    height: 120,
  },
  {
    src: `${base}/assets/other/svg (10).svg`,
    desc: "pin",
    leftX: -32,
    leftY: 0,
    height: 50,
  },
  {
    src: `${base}/assets/other/svg (9).svg`,
    desc: "roller",
    leftX: -36,
    leftY: 0,
    height: 50,
  },
];
