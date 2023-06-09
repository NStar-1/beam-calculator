<script>
  import { base } from "$app/paths";
  import { profileType, ProfileType } from "../store";
  import Cylinder from "./ProfileTypes/Cylinder.svelte";
  import RoundTube from "./ProfileTypes/RoundTube.svelte";
  import Rectangle from "./ProfileTypes/Rectangle.svelte";
  import RectangularTube from "./ProfileTypes/RectangularTube.svelte";
  import IBeam from "./ProfileTypes/IBeam.svelte";
  import * as ProfileIcon from "$lib/assets/xsection"

  const options = [ 
    {
      component: Cylinder,
      img: "CircShtr",
      type: ProfileType.CYLINDRICAL,
      icon: ProfileIcon.CircShtr,
    },
    {
      component: RoundTube,
      img: "CircCircShtr",
      type: ProfileType.ROUND_TUBE,
      icon: ProfileIcon.CircCircShtr,
    },
    {
      component: Rectangle,
      img: "SquareShtr",
      type: ProfileType.RECTANGLE,
      icon: ProfileIcon.SquareShtr,
    },
    {
      component: RectangularTube,
      img: "SqwSqwShtr",
      type: ProfileType.RECTANGULAR_TUBE,
      icon: ProfileIcon.SqwSqwFull,
    },
    {
      component: IBeam,
      img: "IShtr",
      type: ProfileType.I_BEAM,
      icon: ProfileIcon.IShtr,
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
          name="profile"
          class="materialInput"
          value={profile.type}
        />
        <svelte:component this={profile.icon} />
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
