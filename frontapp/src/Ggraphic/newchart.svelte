<script language="ts">
  import { material, length, fixationType, results } from "src/store";
  import { scaleLinear, path } from "d3";
  import DimensionLine from "./dimension-line.svelte";
  import ForceLine from "./force-line.svelte";
  import NodeNumber from "./node-number.svelte";
  import Markers from "./markers.svelte";
  let clientWidth;
  let clientHeight;
  const marginRight = 50;
  const drawingOffset = 100;

  let drawingWidth;

  let drawingHeight;
  $: drawingHeight = clientHeight - drawingOffset;

  let uniform = scaleLinear();
  let curve;
  let deflection;
  $: {
    deflection = $results.D ? -$results.D[1].y : 50;
    console.log(deflection);
    drawingWidth = clientWidth - drawingOffset - marginRight;
    uniform = uniform.range([0, drawingWidth]).domain([0, $length]);
    curve = path();
    curve.moveTo(0, 0);
    curve.bezierCurveTo(
      uniform($length / 1.33),
      0,
      uniform($length),
      uniform(deflection),
      uniform($length),
      uniform(deflection)
    );
  }
</script>

<div bind:clientWidth bind:clientHeight class="graphic-container">
  <svg width="100%" height="100%" shape-rendering="geometricPrecision">
    <Markers />
    <g
      class="drawing"
      transform="translate({drawingOffset / 2}, {drawingOffset / 2})"
    >
      <text class="material-info">
        <tspan x={0} dy=".6em">Material: {$material.name}</tspan>
        <tspan x={0} dy="1.2em">E: {$material.E}</tspan>
        <tspan x={0} dy="1.2em">G: {$material.G}</tspan>
      </text>

      <g class="drawing-local" transform="translate(0, {drawingHeight / 2})">
        <g class="x-dimension" />
        <line class="line" x1={0} y1={0} x2={uniform($length)} y2="0" />
        <path class="loaded-beam" d={curve} />
        <NodeNumber x={uniform(0) + 20} y={uniform(0) - 20} text="1" />
        <NodeNumber x={uniform($length) - 20} y={uniform(0) - 20} text="2" />
        <DimensionLine x0={0} y0={0} x1={$length} y1={0} scale={uniform} />
        <DimensionLine
          x0={$length}
          y0={0}
          x1={$length}
          y1={deflection}
          scale={uniform}
        />
        <ForceLine
          x0={$length}
          y0={deflection}
          x1={$length}
          y1={deflection * 2}
          scale={uniform}
        />
      </g>
    </g>
  </svg>
</div>

<style>
  .graphic-container {
    width: 100%;
    height: 100%;
  }

  .line {
    stroke: black;
    stroke-width: 3;
  }

  .loaded-beam {
    stroke: cornflowerblue;
    stroke-width: 4;
    fill: none;
  }

  .material-info {
    font-size: 18px;
    font-family: monospace;
  }
</style>
