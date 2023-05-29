<script lang="ts">
  import {
    loads,
    length,
    selectedLoad,
    AnchorPoint,
    type PointLoad,
    newEmptyLoadObj,
  } from "$lib/store";
  import { _ } from "svelte-i18n";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  import AngleComponent from "../AngleComponent/AngleComponent.svelte";
  import { tempLoad, type LoadType } from "../../store";
  import validate, { type ValidationResult } from "../../../utils/validation";
  import { angleRules, createOffsetRules, loadRules } from "./validatiors";
  import HelperText from "@smui/textfield/helper-text";
  import IconLeftSide from "$lib/assets/icons/leftSide.svg";
  import IconRightSide from "$lib/assets/icons/rightSide.svg";
  import IconMiddlePoint from "$lib/assets/icons/middlePoint.svg";
  import LoadSelector from "./LoadSelector.svelte";

  let anchor = AnchorPoint.START;
  let offset = 0;
  let realOffset = offset;
  let angle = 0;
  let value = 0;

  $: $tempLoad.angle = angle;
  $: $tempLoad.offset = offset;
  $: $tempLoad.value = value;

  let isEdit = $selectedLoad >= 0;

  let currentLoad: number | undefined;
  $: if ($selectedLoad >= 0 && currentLoad !== $selectedLoad) {
    const sLoad = $loads[$selectedLoad];
    //loadType = sLoad.type;
    offset = sLoad.offset;
    realOffset = offset;
    angle = sLoad.angle;
    value = sLoad.value;
    isEdit = true;
    currentLoad = $selectedLoad;
  }

  const cancelEditing = () => {
    $tempLoad = newEmptyLoadObj();
    offset = 0;
    angle = 0;
    value = 0;
    $selectedLoad = -1;
    currentLoad = undefined;
  };

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
    if ($selectedLoad > -1) {
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

  const savePointLoad = () => {
    validateForm();
    if (!isFormValid()) {
      return;
    }

    if (isEdit) {
      $loads[$selectedLoad] = {
        ...$loads[$selectedLoad],
        offset,
        anchor,
        angle,
        value,
      };
    } else {
      const newLoad: PointLoad = {
        offset: offset,
        anchor,
        angle,
        value: value,
      };

      $loads = [...$loads, newLoad];
    }
    cancelEditing();
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
  <div class="loadPosition">
    <Textfield
      type="number"
      bind:value={offset}
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
  </div>
  <div class="loadAngle">
    <Textfield
      type="number"
      bind:value={angle}
      label={$_("options.loadCaseForm.angle.label")}
      required
      invalid={!angleValidation.valid}
      on:blur={validateAngle}
    >
      <HelperText validationMsg slot="helper"
        >{angleValidation.errors.join(", ")}</HelperText
      >
    </Textfield>
    <div class="angleComponent">
      <AngleComponent {angle} />
    </div>
  </div>
  <LoadSelector bind:selected={anchor} />
  <div class="loadAmount">
    <Textfield
      type="number"
      bind:value
      label={$_("options.loadCaseForm.load.label")}
      required
      invalid={!loadValidation.valid}
      on:blur={validateLoad}
    >
      <HelperText validationMsg slot="helper"
        >{loadValidation.errors.join(", ")}</HelperText
      >
    </Textfield>
  </div>
  <div class="actions">
    <IconButton
      class="material-icons"
      on:click={savePointLoad}
      disabled={formInvalid}>add_circle</IconButton
    >
  </div>
</div>

<style>
  .loadPosition {
    display: flex;
    padding-top: 15px;
  }
  .angleComponent {
    width: 40%;
  }

  .actions {
    padding-top: 5px;
  }
  .loadAngle {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 480px) {
    .angleComponent {
      width: 30%;
    }
  }
</style>
