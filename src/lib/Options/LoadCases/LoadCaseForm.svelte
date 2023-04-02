<script lang="ts">
  import { base } from "$app/paths";
  import {
    loads,
    length,
    points,
    getNextPointId,
    selectedLoad,
    type PointLoad,
    type Point,
    newEmptyLoadObj,
  } from "../../store";
  import { waitLocale, _ } from "svelte-i18n";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  import AngleComponent from "../AngleComponent/AngleComponent.svelte";
  import { tempLoad, type LoadType } from "../../store";
  import validate, { type ValidationResult } from "../../../utils/validation";
  import { angleRules, createOffsetRules, loadRules } from "./validatiors";
  import HelperText from "@smui/textfield/helper-text";

  let loadType: LoadType = "pointed";
  let offsetPosition = "left";
  let prevOffsetPositon = offsetPosition;
  let offset = 0;
  let realOffset = offset;
  let angle = 0;
  let load = 0;

  $:$tempLoad.node = $loads.length + 2 
  $: $tempLoad.angle = angle
  $: $tempLoad.offset = offset
  $: $tempLoad.load = load

  let isEdit = $selectedLoad >= 0;

  let currentLoad: number | undefined;
  $: if ($selectedLoad >= 0 && currentLoad !== $selectedLoad) {
    const sLoad = $loads[$selectedLoad];
    loadType = sLoad.type;
    offset = sLoad.offset;
    realOffset = offset;
    angle = sLoad.angle;
    load = sLoad.load;
    isEdit = true;
    currentLoad = $selectedLoad;
  }

  $: {
    if (prevOffsetPositon === "middle") {
      offset = 0;
    }

    switch (offsetPosition) {
      case "left":
        realOffset = offset;
        break;
      case "middle":
        realOffset = $length / 2;
        offset = realOffset;
        break;
      case "right":
        realOffset = $length - offset;
        break;
    }

    prevOffsetPositon = offsetPosition;
  }

  const cancelEditing = () => {
    $tempLoad = newEmptyLoadObj()
    loadType = "pointed";
    offsetPosition = "left";
    offset = 0;
    angle = 0;
    load = 0;
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
      offsetPosition === "left" || offsetPosition === "center"
        ? offset
        : $length - offset
    );
  };

  const validateAngle = () => {
    angleValidation = validate(angleRules, angle);
  };

  const validateLoad = () => {
    loadValidation = validate(loadRules, load);
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
      const pointId = $points[$selectedLoad].id;

      $points[$selectedLoad] = {
        ...$points[$selectedLoad],
        x: Number(realOffset),
      };
      $loads[$selectedLoad] = {
        ...$loads[$selectedLoad],
        type: loadType,
        node: pointId,
        offset: realOffset,
        angle,
        load,
      };
    } else {
      let pointLoadId = getNextPointId();

      const newPoint: Point = {
        id: pointLoadId,
        isFixed: 0,
        x: Number(realOffset),
        y: 0,
        z: 0,
      };
      const newLoad: PointLoad = {
        type: loadType,
        node: pointLoadId,
        offset: realOffset,
        angle,
        load,
        loadValueType: "force",
      };

      $points = [...$points, newPoint];
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
      disabled={offsetPosition === "middle"}
      label={$_("options.loadCaseForm.offset.label")}
      required
      invalid={!offsetValidation.valid}
      on:blur={validateOffset}
    >
      <HelperText validationMsg slot="helper"
        >{offsetValidation.errors.join(", ")}</HelperText
      >
    </Textfield>
    <div class="offsetSelector">
      <label class="radioLabel">
        <input
          type="radio"
          bind:group={offsetPosition}
          name="offsetPosition"
          class="loadTypeInput"
          value="left"
        />
        <img
          alt="pointed load icon"
          src="{base}/assets/icons/left_side_32.svg"
        />
      </label>
      <label class="radioLabel">
        <input
          type="radio"
          bind:group={offsetPosition}
          name="offsetPosition"
          class="loadTypeInput"
          value="middle"
          disabled={$loads.some((l) => l.offset === Math.round($length / 2))}
        />
        <img
          alt="distributed load icon"
          src="{base}/assets/icons/middle_point_32.svg"
        />
      </label>
      <label class="radioLabel">
        <input
          type="radio"
          bind:group={offsetPosition}
          name="offsetPosition"
          class="loadTypeInput"
          value="right"
        />
        <img
          alt="distributed load icon"
          src="{base}/assets/icons/right_side_32.svg"
        />
      </label>
    </div>
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
  <div class="loadAmount">
    <Textfield
      type="number"
      bind:value={load}
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
  .loadTypeInput {
    display: none;
  }

  .loadTypeInput:checked + img {
    border: 2px solid #ff9859;
  }

  .loadTypeInput + img {
    padding: 2px;
    width: 100%;
    border: 2px solid #ababab;
  }

  .radioLabel {
    width: 40px;
  }

  .loadPosition {
    display: flex;
    padding-top: 15px;
  }
  .angleComponent {
    width: 40%;
  }

  .offsetSelector {
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: end;
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
