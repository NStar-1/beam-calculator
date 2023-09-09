<script>
  import { profileType, ProfileType } from "../store";
  import Cylinder from "./ProfileTypes/Cylinder.svelte";
  import RoundTube from "./ProfileTypes/RoundTube.svelte";
  import Rectangle from "./ProfileTypes/Rectangle.svelte";
  import RectangularTube from "./ProfileTypes/RectangularTube.svelte";
  import IBeam from "./ProfileTypes/IBeam.svelte";
  import Custom from "./ProfileTypes/Custom.svelte";
  import * as ProfileIcon from "$lib/assets/xsection"

  const options = [ 
    {
      component: Cylinder,
      type: ProfileType.CYLINDRICAL,
      icon: ProfileIcon.Cylinder,
    },
    {
      component: RoundTube,
      type: ProfileType.ROUND_TUBE,
      icon: ProfileIcon.Tube,
    },
    {
      component: Rectangle,
      type: ProfileType.RECTANGLE,
      icon: ProfileIcon.Sqw,
    },
    {
      component: RectangularTube,
      type: ProfileType.RECTANGULAR_TUBE,
      icon: ProfileIcon.SqwTube,
    },
    {
      component: IBeam,
      type: ProfileType.I_BEAM,
      icon: ProfileIcon.IBeam,
    },
    {
      component: Custom,
      type: ProfileType.CUSTOM,
      icon: ProfileIcon.Custom,
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
    cursor: pointer;
  }
</style>
