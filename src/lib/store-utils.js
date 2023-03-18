export function shiftNode(el) {
  if (el.id && (el.x !== 0 || el.offset !== 0)) {
    el.id = el.id - 1;
  } else {
    el.node = el.node - 1;
  }
  return el;
}
