<script>
  import { profileType, ProfileType } from "../store";
  import Cylinder from "./ProfileTypes/Cylinder.svelte";
  import RoundTube from "./ProfileTypes/RoundTube.svelte";
  import Rectangle from "./ProfileTypes/Rectangle.svelte";
  import RectangularTube from "./ProfileTypes/RectangularTube.svelte";
  import IBeam from "./ProfileTypes/IBeam.svelte";

  const options = [ 
    {
      component: Cylinder,
      img: "CircShtr",
      type: ProfileType.CYLINDRICAL,
    },
    {
      component: RoundTube,
      img: "CircCircShtr",
      type: ProfileType.ROUND_TUBE,
    },
    {
      component: Rectangle,
      img: "SquareShtr",
      type: ProfileType.RECTANGLE,
    },
    {
      component: RectangularTube,
      img: "SqwSqwShtr",
      type: ProfileType.RECTANGULAR_TUBE,
    },
    {
      component: IBeam,
      img: "IShtr",
      type: ProfileType.I_BEAM,
    },
  ];
</script>

<div class="column">
  <div class="inline" style="column-gap: 5%;">
    {#each options as profile}
      <label class="profileLabel">
        <input
          type="radio"
          bind:group={$profileType}
          name="material"
          class="materialInput"
          value={profile.type}
        />
        <img alt="square" src={"assets/razrez/" + profile.img + ".svg"} />
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
  }

  .materialInput:checked + img {
    border: 2px solid #ff9859;
  }

  .materialInput + img {
    padding: 2px;
    width: 100%;
    border: 2px solid #ababab;
  }

  .column {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .profileLabel {
    width: 40px;
  }
</style>
