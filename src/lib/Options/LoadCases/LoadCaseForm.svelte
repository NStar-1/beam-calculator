<script lang="ts">
  import {
    loads,
    length,
    selectedLoad,
    AnchorPoint,
    type PointLoad,
  } from "$lib/store";
  import { _ } from "svelte-i18n";
  import Textfield from "@smui/textfield";
  import validate, { type ValidationResult } from "../../../utils/validation";
  import { angleRules, createOffsetRules, loadRules } from "./validatiors";
  import HelperText from "@smui/textfield/helper-text";
  import LoadSelector from "./LoadSelector.svelte";
  import Button, { Label, Icon } from "@smui/button";
  export let loadId: number;

  let anchor = AnchorPoint.START;
  let offset = 0;
  let angle = 0;
  let value = 0;

  let currentLoad: number | null;
  $: if (loadId >= 0 && currentLoad !== loadId) {
    const sLoad = $loads[loadId];
    //loadType = sLoad.type;
    offset = sLoad.offset;
    angle = sLoad.angle;
    value = sLoad.value;
    currentLoad = $selectedLoad;
  }

  let offsetValidation: ValidationResult = { valid: true, errors: [] };
  let angleValidation: ValidationResult = { valid: true, errors: [] };
  let loadValidation: ValidationResult = { valid: true, errors: [] };

  const isFormValid = () =>
    [offsetValidation, angleValidation, loadValidation].every((v) => v.valid);

  let formInvalid = false;

  $: {
    formInvalid = [offsetValidation, angleValidation, loadValidation].some(
      (v) => !v.valid
    );
  }

  const validateOffset = () => {
    let previousOffset = -1;
    if (loadId > -1) {
      $loads.forEach((_load, i) => {
        if (i === $selectedLoad && i > 0) {
          previousOffset = $loads[i - 1].offset;
        }
      });
    } else {
      previousOffset =
        $loads.length > 0 ? $loads[$loads.length - 1].offset : -1;
    }

    offsetValidation = validate(
      createOffsetRules($length, previousOffset),
      anchor === AnchorPoint.START || anchor === AnchorPoint.END
        ? offset
        : $length - offset
    );
  };

  const validateAngle = () => {
    angleValidation = validate(angleRules, angle);
  };

  const validateLoad = () => {
    loadValidation = validate(loadRules, value);
  };

  const validateForm = () => {
    validateOffset();
    validateAngle();
    validateLoad();
  };
</script>

<div>
  <!--  <div class="loadTypeSelector">
      <label class="radioLabel">
        <input
          type="radio"
          bind:group={loadType}
          name="loadType"
          class="loadTypeInput"
          value="pointed"
        />
        <img alt="pointed load icon" src="assets/icons/point_load_32.svg" />
      </label>
      <label class="radioLabel">
        <input
          type="radio"
          bind:group={loadType}
          name="loadType"
          class="loadTypeInput"
          value="distributed"
        />
        <img
          alt="distributed load icon"
          src="assets/icons/distributed_load_32.svg"
        />
      </label>
    </div> -->
  <div class="load-selector">
    <LoadSelector bind:selected={$loads[loadId].anchor} />
  </div>
  <div class="grid">
    <Textfield
      type="number"
      bind:value={$loads[loadId].offset}
      disabled={anchor === AnchorPoint.MIDDLE}
      label={$_("options.loadCaseForm.offset.label")}
      required
      invalid={!offsetValidation.valid}
      on:blur={validateOffset}
    >
      <HelperText validationMsg slot="helper"
        >{offsetValidation.errors.join(", ")}</HelperText
      >
    </Textfield>
    <Textfield
      type="number"
      bind:value={$loads[loadId].value}
      label={$_("options.loadCaseForm.load.label")}
      required
      invalid={!loadValidation.valid}
      on:blur={validateLoad}
    >
      <HelperText validationMsg slot="helper"
        >{loadValidation.errors.join(", ")}</HelperText
      >
    </Textfield>
    <Textfield
      type="number"
      bind:value={$loads[loadId].angle}
      label={$_("options.loadCaseForm.angle.label")}
      required
      invalid={!angleValidation.valid}
      on:blur={validateAngle}
    >
      <HelperText validationMsg slot="helper"
        >{angleValidation.errors.join(", ")}</HelperText
      >
    </Textfield>
  </div>
  <div class="actions">
    <Button on:click={() => ($selectedLoad = null)}>
      <Icon class="material-icons">close</Icon>
      <Label>Close</Label>
    </Button>
  </div>
</div>

<style>
  .actions {
    padding-top: 5px;
  }

  .load-selector {
    margin: 5px auto;
  }

  .grid {
    display: flex;
    gap: 16px;
  }
</style>
