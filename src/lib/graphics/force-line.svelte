<script lang="ts">
  export let x0: number;
  export let y0: number;
  export let x1: number;
  export let y1: number;
  export let label: string;
  export let isActive: boolean;
</script>

<g>
  <line
    class="force-line"
    class:active={isActive}
    class:inactive={!isActive}
    x1={x0}
    y1={y0}
    x2={x1}
    y2={y1}
  />
  <text class="force-label" class:active-label={isActive} x={x0 + 15} y={y1 + 5}
    >{label}</text
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
