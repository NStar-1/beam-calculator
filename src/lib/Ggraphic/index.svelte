<script lang="ts">
  import {
    length,
    firstPoint,
    lastPoint,
    loads,
    minMaxForce,
    newresults,
    selectedLoad,
  } from "$lib/store";
  import Graph from "./Graph.svelte";
</script>

<Graph
  firstPoint={$firstPoint}
  lastPoint={$lastPoint}
  length={$length}
  loads={$loads}
  minMaxForce={$minMaxForce}
  selectedLoad={$selectedLoad}
  results={$newresults}
/>
