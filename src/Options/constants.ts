import { _ } from "svelte-i18n";
import { base } from "$app/paths";

export const fixationConst = [
  { key: "NONE", src: null, desc: "none", height: 0 },
  {
    key: "FIXED",
    src: `${base}/assets/other/svg (14).svg`,
    desc: "fixed end",
    leftX: -68,
    leftY: -60,
    height: 120,
  },
  {
    key: "PIN",
    src: `${base}/assets/other/svg (10).svg`,
    desc: "pin",
    leftX: -32,
    leftY: 0,
    height: 50,
  },
  {
    key: "ROLLER",
    src: `${base}/assets/other/svg (9).svg`,
    desc: "roller",
    leftX: -36,
    leftY: 0,
    height: 50,
  },
];
