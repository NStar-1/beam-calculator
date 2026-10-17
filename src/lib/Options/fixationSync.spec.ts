import { describe, expect, it } from "vitest";
import { FixationEnum } from "$lib/model";
import {
  applyExternalChange,
  applyUserChange,
  createFixationSync,
} from "./fixationSync";

/** The state after a change that set both fields to `value`. */
const state = (value: FixationEnum, selectKey: FixationEnum = value) => ({
  lastPushed: value,
  selectKey,
});

describe("createFixationSync", () => {
  it("records the value as both pushed out and mounted", () => {
    expect(createFixationSync(FixationEnum.PIN)).toEqual(
      state(FixationEnum.PIN)
    );
  });
});

describe("applyExternalChange", () => {
  it("remounts the select when a preset changes the value", () => {
    // SMUI refreshes the selected label only when its options mount, so an
    // externally applied value has to reach the {#key} block as well.
    const before = createFixationSync(FixationEnum.NONE);
    const after = applyExternalChange(before, FixationEnum.ROLLER);

    expect(after.selectKey).not.toBe(before.selectKey);
    expect(after).toEqual(state(FixationEnum.ROLLER));
  });
});

describe("applyUserChange", () => {
  it("keeps the select mounted for a change made by the user", () => {
    const before = createFixationSync(FixationEnum.NONE);
    const after = applyUserChange(before, FixationEnum.FIXED);

    // The guard the component checks: the user's own value counts as pushed
    // out, so the reactive statement will not remount the select.
    expect(after.selectKey).toBe(before.selectKey);
    expect(after.lastPushed).toBe(FixationEnum.FIXED);
  });
});

describe("the cycle presets depend on", () => {
  it("keeps both fields agreed through preset → user → preset", () => {
    let sync = createFixationSync(FixationEnum.NONE);

    // A solve page applies its preset.
    sync = applyExternalChange(sync, FixationEnum.PIN);
    expect(sync).toEqual(state(FixationEnum.PIN));

    // The user picks another support; SMUI has already updated its label.
    sync = applyUserChange(sync, FixationEnum.ROLLER);
    expect(sync).toEqual(state(FixationEnum.ROLLER, FixationEnum.PIN));

    // Another preset is applied, e.g. by navigating to the next example.
    sync = applyExternalChange(sync, FixationEnum.FIXED);
    expect(sync).toEqual(state(FixationEnum.FIXED));
  });
});
