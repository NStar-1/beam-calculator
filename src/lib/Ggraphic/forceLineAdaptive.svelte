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
  let radAngle: number;
  $: radAngle = deg2rad(angle);
  $: x1 = x + forceScale(force) * Math.sin(radAngle);
  $: y1 = y + forceScale(force) * Math.cos(radAngle);
</script>

<ForceLine x0={x} y0={y} {x1} {y1} {label} {scale} {isActive} />

<style>
</style>
