<script lang="ts">
  import { material, profile } from "$lib/store";
  import { _ } from "svelte-i18n";
  import Sub from "./Sub.svelte";
</script>

<text class="material-info">
  <tspan x={0} dy=".6em">{$_("graph.material")}: {$material.name}</tspan>
  <tspan x={0} dy="1.2em">E: {$material.E} {" " + $_("graph.gpa")}</tspan>
  <tspan x={0} dy="1.2em">G: {$material.G} {" " + $_("graph.gpa")}</tspan>
</text>

<text class="profile-info">
  <tspan x={0} dy=".6em">A<Sub>x</Sub>: {$profile.Ax.toFixed(2)}</tspan>
  <tspan x={0} dy="1.2em">A<Sub>sy</Sub>: {$profile.Asy.toFixed(2)}</tspan>
  <tspan x={0} dy="1.2em">A<Sub>sz</Sub>: {$profile.Asz.toFixed(2)}</tspan>
</text>

<text class="profile-info-2">
  <tspan x={0} dy=".6em">J<Sub>x</Sub>: {$profile.Jx.toFixed(2)}</tspan>
  <tspan x={0} dy="1.2em">I<Sub>y</Sub>: {$profile.Iy.toFixed(2)}</tspan>
  <tspan x={0} dy="1.2em">I<Sub>z</Sub>: {$profile.Iz.toFixed(2)}</tspan>
</text>

<style>
  text {
    font-size: 20px;
    fill: currentColor;
  }

  .material-info {
  }

  .profile-info {
    transform: translate(150px, 0);
  }

  .profile-info-2 {
    transform: translate(275px, 0);
  }
</style>
