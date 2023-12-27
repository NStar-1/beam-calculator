<script lang="ts">
  import { deg2rad } from "$lib/store-utils";

  import ForceLine from "./force-line.svelte";
  export let x: number;
  export let y: number;
  export let angle: number;
  export let force: number;
  export let label: string;
  export let scale: (n: number) => number;
  export let forceScale: (n: number) => number;
  export let isActive: boolean;

  let x1: number;
  let y1: number;
  let x0: number;
  let y0: number;
  let radAngle: number;
  $: radAngle = deg2rad(angle);
  $: x0 = scale(x);
  $: y0 = scale(y);
  $: x1 = x0 + forceScale(force) * Math.sin(radAngle);
  $: y1 = y0 + forceScale(force) * Math.cos(radAngle);
</script>

<ForceLine {x0} {y0} {x1} {y1} {label} {isActive} />

<style>
</style>
