<script lang="ts">
  export let x0: number;
  export let y0: number;
  export let x1: number;
  export let y1: number;
  export let label: string;
  export let scale: (n: number) => number;
  export let isActive: boolean;

  let dx: number, dy: number;
  $: dx = x1 - x0;
  $: dy = y1 - y0;
</script>

<g transform="translate({scale(x0)}, {scale(y0)})">
  <line
    class="force-line"
    class:active={isActive}
    class:inactive={!isActive}
    y1={0}
    x1={0}
    x2={scale(dx)}
    y2={scale(dy)}
  />
  <text
    class="force-label"
    class:active-label={isActive}
    x={20}
    y={scale(dy) + 5}>{label}</text
  >
</g>

<style>
  .active {
    stroke-width: 4;
  }

  .inactive {
    stroke-width: 3;
  }

  .force-line {
    stroke: currentColor;
    marker-end: url(#triangle);
  }

  .active-label {
    font-weight: 600;
  }

  .force-label {
    font-family: "GOST Type A";
    fill: currentColor;
    font-size: 18px;
  }
</style>
