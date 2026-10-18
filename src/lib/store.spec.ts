import { describe, expect, it } from "vitest";
import { get } from "svelte/store";
import {
  applySerializableModel,
  getSerializableModel,
  material,
  profileData,
  selectedLoad,
} from "./store";
import { iBeamMidLoad } from "./problems/i-beam-mid-load";
import { pipeCantileverEndLoad } from "./problems/pipe-cantilever-end-load";
import { simplySupportedTwoLoads } from "./problems/simply-supported-two-loads";
import { resolvePreset } from "./problems/presets";

// These two problems differ in every part a switch could leave behind:
// profile type (I-beam vs. round tube), fixations and load layout.
const iBeamModel = () => resolvePreset(iBeamMidLoad.preset);
const tubeModel = () => resolvePreset(pipeCantileverEndLoad.preset);

describe("applySerializableModel", () => {
  it("replaces the whole state, so switching examples leaves nothing behind", () => {
    // The calculator is a mount-time consumer of global stores, so navigating
    // from one problem page to the next applies a model on top of whatever the
    // previous example left in them.
    applySerializableModel(iBeamModel());
    expect(getSerializableModel()).toEqual(iBeamModel());

    applySerializableModel(tubeModel());
    expect(getSerializableModel()).toEqual(tubeModel());

    // ...and back again, the way navigation between examples goes.
    applySerializableModel(iBeamModel());
    expect(getSerializableModel()).toEqual(iBeamModel());
  });

  it("keeps the catalog read-only while the calculator edits the state", () => {
    const loadsBefore = JSON.stringify(pipeCantileverEndLoad.preset.loads);
    const profileBefore = JSON.stringify(pipeCantileverEndLoad.preset.profile);
    const materialBefore = JSON.stringify(
      resolvePreset(pipeCantileverEndLoad.preset).material
    );

    applySerializableModel(tubeModel());

    // Edits land the way bound inputs make them: in place, on the objects the
    // stores hold.
    const editable = getSerializableModel();
    editable.loads[0].value = -12345;
    profileData.update((current) => ({ ...current, outerDiameter: -1 }));
    // The material selector renames the record in place when a field changes,
    // which would break the name lookup of every later preset.
    get(material).name = "Other";
    get(material).E = -1;

    expect(JSON.stringify(pipeCantileverEndLoad.preset.loads)).toBe(
      loadsBefore
    );
    expect(JSON.stringify(pipeCantileverEndLoad.preset.profile)).toBe(
      profileBefore
    );
    expect(
      JSON.stringify(resolvePreset(pipeCantileverEndLoad.preset).material)
    ).toBe(materialBefore);
  });

  it("keeps the load selection valid when the model is replaced", () => {
    // The reported failure: open a single-load example, add and select a
    // second load, then restore the original preset. The editor still points
    // at index 1, which no longer exists, and reads properties off undefined.
    applySerializableModel(resolvePreset(simplySupportedTwoLoads.preset));
    selectedLoad.set(1);
    expect(get(selectedLoad)).toBe(1);

    applySerializableModel(tubeModel());
    expect(get(selectedLoad)).toBe(0);

    // A model without loads leaves nothing to select.
    applySerializableModel({ ...tubeModel(), loads: [] });
    expect(get(selectedLoad)).toBeNull();

    // Applying a model never opens a selection on its own, and one the new
    // model still covers is left alone.
    applySerializableModel(resolvePreset(simplySupportedTwoLoads.preset));
    expect(get(selectedLoad)).toBeNull();
    selectedLoad.set(1);
    applySerializableModel(resolvePreset(simplySupportedTwoLoads.preset));
    expect(get(selectedLoad)).toBe(1);
  });
});
