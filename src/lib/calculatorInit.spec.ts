import { describe, expect, it } from "vitest";
import { resolveInitialState } from "./calculatorInit";
import { cantileverEndLoad } from "./problems/cantilever-end-load";
import { resolvePreset } from "./problems/presets";
import type { AnchorLinkModel, AnchorLinkResult } from "./modelSerialization";

// A realistic model to stand in for whatever the hash or the page decoded.
const model = resolvePreset(cantileverEndLoad.preset);

/** A preset from a different problem, to prove the precedence rules. */
const otherModel: AnchorLinkModel = {
  ...model,
  length: 9999,
};

const ok: AnchorLinkResult<AnchorLinkModel> = {
  error: false,
  data: model,
  message: "",
};

const broken: AnchorLinkResult<AnchorLinkModel> = {
  error: true,
  data: null,
  message: "not a valid anchor link",
};

describe("resolveInitialState", () => {
  it("applies the decoded anchor link", () => {
    expect(resolveInitialState(ok, null)).toEqual({
      source: "hash",
      model,
    });
  });

  it("prefers the anchor link over the preset", () => {
    expect(resolveInitialState(ok, otherModel)).toEqual({
      source: "hash",
      model,
    });
  });

  it("reports a broken anchor link instead of falling back to the preset", () => {
    // A shared link that no longer decodes must not silently show a different
    // model than the one it was copied from.
    expect(resolveInitialState(broken, otherModel)).toEqual({
      source: "hash-error",
      message: "not a valid anchor link",
    });
  });

  it("applies the preset when the URL carries no hash", () => {
    expect(resolveInitialState(null, model)).toEqual({
      source: "preset",
      model,
    });
  });

  it("applies nothing when there is neither hash nor preset", () => {
    // The calculator keeps whatever the stores already hold, which is the
    // default model on the home page.
    expect(resolveInitialState(null, null)).toEqual({ source: "empty" });
  });
});
