<script lang="ts">
  export let x: number;
  export let y: number;
  export let text: string;

  const r = 12;
</script>

<g transform="translate({x}, {y})">
  <circle x={0} y={0} r={r} />
  <text x={-r/2} y={r/2}>{text}</text>
</g>

<style>
  circle {
    stroke: green;
    stroke-width: 2;
    fill: none;
  }

  text {
    font-size: 20px;
    font-family: monospace;
    fill: green;
  }
</style>
