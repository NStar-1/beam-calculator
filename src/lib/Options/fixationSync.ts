import type { FixationEnum } from "$lib/model";

/**
 * Mirror state between the numeric model value and the SMUI select, which
 * only deals in strings.
 *
 * SMUI refreshes the selected label only when its options mount, so a value
 * that changes from the outside — a preset applied on a solve page or an
 * anchor link — has to remount the select, which the `{#key selectKey}` block
 * in the component does. A change made by the user does not remount: the
 * select has already updated its own label.
 *
 * There is deliberately no stored string here: the component derives it from
 * `lastPushed` on every render. Svelte re-sends a computed prop whenever the
 * state object changes identity, and SMUI pushes any value it receives into
 * MDC, which emits a change event for it — so a string that lags one step
 * behind would make the select undo the user's own selection.
 */
export type FixationSync = {
  /** Last value pushed out, either by the user or from the outside. */
  lastPushed: FixationEnum;
  /** Key wrapping the select; a new value remounts it. */
  selectKey: FixationEnum;
};

export function createFixationSync(value: FixationEnum): FixationSync {
  return { lastPushed: value, selectKey: value };
}

/**
 * Applies a change that came from outside the component.
 *
 * Only call it when the external value differs from `sync.lastPushed`; that
 * last pushed value doubles as the guard, so the user's own selection — which
 * Svelte feeds back into the reactive statement — never causes a remount.
 */
export function applyExternalChange(
  sync: FixationSync,
  value: FixationEnum
): FixationSync {
  return { lastPushed: value, selectKey: value };
}

/**
 * Applies a change made by the user in the select.
 *
 * Only `lastPushed` moves: the select already shows the new label, so
 * remounting it (a new key) would only cost a re-render — and would restart
 * the very interaction the user is in the middle of.
 */
export function applyUserChange(
  sync: FixationSync,
  value: FixationEnum
): FixationSync {
  return { ...sync, lastPushed: value };
}
