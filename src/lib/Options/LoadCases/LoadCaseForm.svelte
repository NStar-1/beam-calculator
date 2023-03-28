<script lang="ts">
  import { base } from "$app/paths";
  import {
    loads,
    length,
    fixationType,
    points,
    getNextPointId,
    selectedLoad,
    type PointLoad,
    type Point,
  } from "../../store";
  import { waitLocale, _ } from "svelte-i18n";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  import AngleComponent from "../AngleComponent/AngleComponent.svelte";
  import type { LoadType } from "../../store";
  import { convertFixation, shiftNode } from "../../store-utils";
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

  let isEdit = $selectedLoad >= 0;
  let isFormVisible = isEdit;

  let currentLoad: number | undefined;
  $: if ($selectedLoad >= 0 && currentLoad !== $selectedLoad) {
    const sLoad = $loads[$selectedLoad];
    loadType = sLoad.type;
    offset = sLoad.offset;
    realOffset = offset;
    angle = sLoad.angle;
    load = sLoad.load;
    isEdit = true;
    isFormVisible = true;
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
    loadType = "pointed";
    offsetPosition = "left";
    offset = 0;
    angle = 0;
    load = 0;
    isFormVisible = false;
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
    console.log(offsetValidation);
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

    const firstPoint = realOffset === 0;
    const lastPoint = realOffset === $length;

    // FIXME: Need completely rewrite editing, fixation should be replaced by two separate dedicated points, last and first, which would then combined together with all points
    if (isEdit) {
      const pointId = $points[$selectedLoad].id;
      if (firstPoint) {
        $points = [
          {
            ...$points[$selectedLoad],
            x: 0,
            id: 1,
            isFixed: convertFixation($fixationType.left),
          },
          ...$points.slice(0, $selectedLoad),
          ...$points.slice($selectedLoad + 1).map(shiftNode),
        ];
        $loads = [
          {
            ...$loads[$selectedLoad],
            type: loadType,
            node: 1,
            offset: 0,
            angle,
            load,
          },
          ...$loads.slice(0, $selectedLoad),
          ...$loads.slice($selectedLoad + 1).map(shiftNode),
        ];
      } else if (lastPoint) {
        $points = [
          ...$points.slice(0, $selectedLoad).map(shiftNode),
          { ...$points[$selectedLoad], x: 0, id: 1 },
        ];
        $loads = [
          ...$loads.slice(0, $selectedLoad).map(shiftNode),
          {
            ...$loads[$selectedLoad],
            type: loadType,
            node: getNextPointId(),
            offset: $length,
            angle,
            load,
          },
        ];
      } else {
        $points[$selectedLoad] = {
          ...$points[$selectedLoad],
          x: Number(realOffset),
        };
        $points = [...$points];
        $loads[$selectedLoad] = {
          ...$loads[$selectedLoad],
          type: loadType,
          node: pointId,
          offset: realOffset,
          angle,
          load,
        };
        $loads = [...$loads];
      }
    } else {
      let pointLoadId = getNextPointId();
      let fixation: 0 | 1 = 0;
      if (firstPoint) {
        pointLoadId = 1;
        fixation = convertFixation($fixationType.left);
      } else if (lastPoint) {
        fixation = convertFixation($fixationType.right);
      }

      const newPoint: Point = {
        id: pointLoadId,
        isFixed: fixation,
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
      $points = firstPoint ? [newPoint, ...$points] : [...$points, newPoint];
      $loads = firstPoint ? [newLoad, ...$loads] : [...$loads, newLoad];

      console.log($points);
      console.log($loads);
    }
    cancelEditing();
  };
</script>

{#if isFormVisible != true}
  <div>
    <IconButton
      class="material-icons"
      on:click={() => {
        isFormVisible = true;
        isEdit = false;
        $selectedLoad = -1;
      }}>add_circle</IconButton
    >
  </div>
{:else}
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
        disabled={formInvalid}>check_circle</IconButton
      >
      <IconButton class="material-icons" on:click={cancelEditing}
        >cancel</IconButton
      >
    </div>
  </div>
{/if}

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
