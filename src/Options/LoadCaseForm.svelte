<script lang="ts">
  import { loads, points, getNextPointId, selectedLoad } from "../store";
  import { _ } from "svelte-i18n";
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";

  import type { LoadType } from "../store";

  let loadType: LoadType = "pointed";
  let offsetPosition = "left";
  let offset = 0;
  let angle = 0;
  let load = 0;

  let isFormVisible = false;
  let isEdit = $selectedLoad >= 0;

  let currentLoad;
  $: if ($selectedLoad >= 0 && currentLoad !== $selectedLoad) {
    const sLoad = $loads[$selectedLoad];
    loadType = sLoad.type;
    offset = sLoad.offset;
    angle = sLoad.angle;
    load = sLoad.load;
    isEdit = true;
    isFormVisible = true;
    currentLoad = $selectedLoad;
  }

  const addPointLoad = () => {
    if (isEdit) {
      const pointId = $points[$selectedLoad].id;
      $points[$selectedLoad] = {
        ...$points[$selectedLoad],
        x: Number(offset),
      };
      $points = [...$points];
      $loads[$selectedLoad] = {
        ...$loads[$selectedLoad],
        type: loadType,
        node: pointId,
        offset,
        angle,
        load,
      };
      $loads = [...$loads];
    } else {
      const pointLoadId = getNextPointId();
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
      console.log($points);
      console.log($loads);
    }
  };

  const cancelEditing = () => {
    loadType = "pointed";
    offsetPosition = "left";
    offset = 0;
    angle = 0;
    load = 0;
    isFormVisible = false;
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
  <div class="loadForm">
    <div class="loadTypeSelector">
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
        <img alt="distributed load icon" src="assets/icons/right_side_32.svg" />
      </label>
      <Textfield
        bind:value={offset}
        label={$_("options.loadCaseForm.offset.label")}
        required
      />
    </div>
    <div class="loadAngle">
      <Textfield
        bind:value={angle}
        label={$_("options.loadCaseForm.angle.label")}
        required
      />
    </div>
    <div class="loadAmount">
      <Textfield
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
  .loadForm {
    height: 300px;
  }

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
