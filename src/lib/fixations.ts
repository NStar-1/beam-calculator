import { FixationEnum } from "$lib/store";
import ImgFixed from "$lib/assets/fixations/fixed.svg?component";
import ImgRoller from "$lib/assets/fixations/roller.svg?component";
import ImgPin from "$lib/assets/fixations/pin.svg?component";

export const fixations = [
  { value: FixationEnum.NONE, label: "none" },
  {
    value: FixationEnum.FIXED,
    icon: ImgFixed,
    label: "fixed end",
  },
  {
    value: FixationEnum.PIN,
    icon: ImgPin,
    label: "pin",
  },
  {
    value: FixationEnum.ROLLER,
    icon: ImgRoller,
    label: "roller",
  },
];
