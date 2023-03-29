import { _ } from "svelte-i18n";
import { base } from "$app/paths";
import {FixationEnum} from "$lib/store";

export const fixationConst = [
  { key: "NONE", value: FixationEnum.NONE, src: null, desc: "none", height: 0 },
  {
    key: "FIXED",
    value: FixationEnum.FIXED,
    src: `${base}/assets/other/svg (14).svg`,
    desc: "fixed end",
    leftX: -68,
    leftY: -60,
    height: 120,
  },
  {
    key: "PIN",
    value: FixationEnum.PIN,
    src: `${base}/assets/other/svg (10).svg`,
    desc: "pin",
    leftX: -32,
    leftY: 0,
    height: 50,
  },
  {
    key: "ROLLER",
    value: FixationEnum.ROLLER,
    src: `${base}/assets/other/svg (9).svg`,
    desc: "roller",
    leftX: -36,
    leftY: 0,
    height: 50,
  },
];
