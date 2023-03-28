import type {FixationType} from "./store";

export function shiftNode(el) {
  if (el.id && (el.x !== 0 || el.offset !== 0)) {
    el.id = el.id - 1;
  } else {
    el.node = el.node - 1;
  }
  return el;
}

export const convertFixation = (fixation: FixationType): 0 | 1 => {
  switch (fixation) {
    case "NONE":
      return 0;
    case "FIXED":
    case "PIN":
    case "ROLLER":
      return 1;
  }
};
