<script lang="ts">
  import Select, { Option } from "@smui/select";
  import { loads, points, getLastPointId } from "../store";
  import { _ } from "svelte-i18n";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  
  import type { LoadType } from "../store";

  let loadType: LoadType = "pointed";
  let offsetPosition = "left";
  let offset = 0;
  let angle = 90;
  let load = 0;

  const addPointLoad = () => {
    const pointLoadId = getLastPointId() + 1;
    $points = [
      ...$points,
      {
        id: pointLoadId,
        isFixed: 0,
        x: Number(offset),
        y: 0,
        z: 0,
      },
    ];
    $loads = [
      ...$loads,
      {
        type: loadType,
        node: pointLoadId,
        offset,
        angle,
        load,
        loadValueType: "force",
      },
    ];
  };
</script>

<div>
  <div class="loadTypeSelector">
    <label class="radioLabel">
      <input
        type="radio"
        bind:group={loadType}
        name="loadType"
        class="loadTypeInput"
        value="pointed"
      />
      <img alt="pointed load icon" src="../assets/icons/point_load_32.svg" />
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
        src="../assets/icons/distributed_load_32.svg"
      />
    </label>
  </div>
  <div class="loadPosition">
    <label class="radioLabel">
      <input
        type="radio"
        bind:group={offsetPosition}
        name="offsetPosition"
        class="loadTypeInput"
        value="left"
      />
      <img alt="pointed load icon" src="../assets/icons/left_side_32.svg" />
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
        src="../assets/icons/middle_point_32.svg"
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
        src="../assets/icons/right_side_32.svg"
      />
    </label>
    <Textfield
      bind:value={offset}
      label={$_("loadCaseForm.offset.label")}
      required
    />
  </div>
  <div class="loadAngle">
    <Textfield
      bind:value={angle}
      label={$_("loadCaseForm.angle.label")}
      required
    />
  </div>
  <div class="loadAmount">
    <Textfield
      bind:value={load}
      label={$_("loadCaseForm.load.label")}
      required
    />
  </div>
  <div class="actions">
    <IconButton class="material-icons" on:click={addPointLoad}>check_circle</IconButton>
  </div>
</div>

<style>
  .loadTypeSelector {
    display: flex;
  }

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
  }
</style>
