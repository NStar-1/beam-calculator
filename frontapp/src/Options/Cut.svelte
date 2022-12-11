<script>
  import { profileType, ProfileType } from "../store";
  import Cylinder from "./Cylinder.svelte";
  import RoundTube from "./RoundTube.svelte";

  const options = {
    [ProfileType.CYLINDRICAL]: {
      component: Cylinder,
      img: "CircShtr",
    },
    [ProfileType.ROUND_TUBE]: {
      component: RoundTube,
      img: "CircCircShtr",
    },
  };
</script>

<div class="column">
  <div class="inline" style="column-gap: 10%;">
    {#each Object.entries(options) as [pType, data]}
      <label>
        <input
          type="radio"
          bind:group={$profileType}
          name="material"
          class="materialInput"
          value={pType}
        />
        <img alt="square" src={"assets/razrez/" + data.img + ".svg"} />
      </label>
    {/each}
  </div>

  <svelte:component this={options[$profileType].component} />
</div>

<style>
  .materialInput {
    display: none;
  }
  .inline {
    padding: 0;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
  }

  .materialInput:checked + img {
    border: 3px solid #ff9859;
  }

  .materialInput + img {
    padding: 2px;
    width: 100%;
    border: 3px solid #ababab;
  }

  .column {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
</style>
