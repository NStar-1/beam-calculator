<script lang="ts">
  export let x0: number;
  export let y0: number;
  export let x1: number;
  export let y1: number;
  export let scale: (n: number) => number;

  let dx: number, dy: number;
  $: dx = x1 - x0;
  $: dy = y1 - y0;
</script>

<g transform="translate({scale(x0)}, {scale(y0)})">
  <line class="force-line" y1={0} x1={0} x2={scale(dx)} y2={scale(dy)} />
  <text class="force-label" x={-75} y={scale(dy) + 5}> F = 10H </text>
</g>

<style>
  .force-line {
    stroke: black;
    stroke-width: 3;
    marker-end: url(#triangle);
  }

  .force-label {
    fill: black;
    font-size: 18px;
  }
</style>
