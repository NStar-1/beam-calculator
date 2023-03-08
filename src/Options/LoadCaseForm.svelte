<script lang="ts">
  import {
    loads,
    length,
    fixationType,
    points,
    getNextPointId,
    selectedLoad,
  } from "../store";
  import { _ } from "svelte-i18n";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";

  import type { LoadType } from "../store";
  import { shiftNode } from "../utils/store-utils";

  let loadType: LoadType = "pointed";
  let offsetPosition = "left";
  let prevOffsetPositon = offsetPosition;
  let offset = 0;
  let realOffset = offset;
  let angle = 0;
  let load = 0;

  let isEdit = $selectedLoad >= 0;
  let isFormVisible = isEdit;

  let currentLoad;
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

  const addPointLoad = () => {
    const firstPoint = realOffset === 0;
    const lastPoint = realOffset === $length;

    if (isEdit) {
      const pointId = $points[$selectedLoad].id;
      if (firstPoint) {
        $points = [
          { ...$points[$selectedLoad], x: 0, id: 1, isFixed: $fixationType.left },
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
        fixation = $fixationType.left;
      } else if (lastPoint) {
        fixation = $fixationType.right;
      }

      $points = [
        ...$points,
        {
          id: pointLoadId,
          isFixed: fixation,
          x: Number(realOffset),
          y: 0,
          z: 0,
        },
      ];
      $loads = [
        ...$loads,
        {
          type: loadType,
          node: pointLoadId,
          offset: realOffset,
          angle,
          load,
          loadValueType: "force",
        },
      ];
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
      />
      <div class="offsetSelector">
        <label class="radioLabel">
          <input
            type="radio"
            bind:group={offsetPosition}
            name="offsetPosition"
            class="loadTypeInput"
            value="left"
          />
          <img alt="pointed load icon" src="assets/icons/left_side_32.svg" />
        </label>
        <label class="radioLabel">
          <input
            type="radio"
            bind:group={offsetPosition}
            name="offsetPosition"
            class="loadTypeInput"
            value="middle"
          />
          <img
            alt="distributed load icon"
            src="assets/icons/middle_point_32.svg"
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
            src="assets/icons/right_side_32.svg"
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
      />
    </div>
    <div class="loadAmount">
      <Textfield
        type="number"
        bind:value={load}
        label={$_("options.loadCaseForm.load.label")}
        required
      />
    </div>
    <div class="actions">
      <IconButton class="material-icons" on:click={addPointLoad}
        >check_circle</IconButton
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

  .offsetSelector {
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  .actions {
    padding-top: 5px;
  }
</style>
