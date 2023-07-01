<script lang="ts">
  import { results, newresults } from "$lib/store";
</script>

<text>
  <tspan dy="0.6em">Results:</tspan>
  <tspan x="0" dy="1.2em">Displacement:</tspan>
  <tspan x="0" dy="1.2em"> # | x | y | z | xx | yy | zz </tspan>
  {#if $results.D}
    {#each $results.D as d, idx}
      <tspan x="0" dy="1.2em">
        {idx}: {d.x.toFixed(2)} | {d.y.toFixed(2)} | {d.z.toFixed(2)} | {d.xx.toFixed(
          2
        )} | {d.yy.toFixed(2)} | {d.zz.toFixed(2)}
      </tspan>
    {/each}
  {/if}

  <tspan x="0" dy="1.2em">Reactions:</tspan>
  <tspan x="0" dy="1.2em"> # | x | y | z | xx | yy | zz </tspan>
  {#if $results.R}
    {#each $results.R as d, idx}
      <tspan x="0" dy="1.2em">
        {idx}: {d.x.toFixed(2)} | {d.y.toFixed(2)} | {d.z.toFixed(2)} | {d.xx.toFixed(
          2
        )} | {d.yy.toFixed(2)} | {d.zz.toFixed(2)}
      </tspan>
    {/each}
    
  {/if}
</text>

<style>
  text {
    font-size: 20px;
    fill: currentColor;
    transform: translate(0, 320px);
  }
</style>
