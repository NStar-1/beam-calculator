<script lang="ts">
  export let x: number;
  export let y: number;
  export let text: string;
  export let isActive: boolean;

  const r = 12;
</script>

<g on:click on:keypress transform="translate({x}, {y})">
  <circle x={0} y={0} {r} class:isActive />
  <text x={-r / 2} y={r / 2}>{text}</text>
</g>

<style>
  g {
    cursor: pointer;
  }

  .isActive {
    fill: limegreen;
  }

  circle {
    stroke: none;
    fill: mediumseagreen;
  }

  text {
    font-size: 20px;
    font-family: monospace;
    font-weight: bold;
    fill: white;
  }
</style>
