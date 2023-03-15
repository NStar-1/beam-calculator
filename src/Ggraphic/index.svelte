<script language="ts">
  import { isPhone, material, length, fixationType, results } from "src/store";
  import { scaleLinear, path } from "d3";
  import DimensionLine from "./dimension-line.svelte";
  import ForceLine from "./force-line.svelte";
  import NodeNumber from "./node-number.svelte";
  import Markers from "./markers.svelte";
  import { fixationConst } from "../Options/constants";
  import { _ } from "svelte-i18n";
  let clientWidth;
  let clientHeight;
  const marginRight = 70;
  let drawingOffset;

  let drawingWidth;

  let drawingHeight;
  $: drawingHeight = clientHeight - drawingOffset;

  let fixationLeft;
  $: fixationLeft = fixationConst[$fixationType.left];

  let fixationRight;
  $: fixationRight = fixationConst[$fixationType.right];

  let uniform = scaleLinear();
  let curve;
  let deflection;
  $: {
    drawingOffset = $isPhone ? 50 : 100;
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
        <tspan x={0} dy=".6em">{$_("graph.material")}: {$material.name}</tspan>
        <tspan x={0} dy="1.2em">E: {$material.E} {" " + $_("graph.gpa")}</tspan>
        <tspan x={0} dy="1.2em">G: {$material.G} {" " + $_("graph.gpa")}</tspan>
      </text>

      <g class="drawing-local" transform="translate(0, {drawingHeight / 2})">
        <g class="x-dimension" />
        {#if fixationLeft.src}
          <image
            href={fixationLeft.src}
            height={fixationLeft.height}
            x={fixationLeft.leftX}
            y={fixationLeft.leftY}
          />
        {/if}
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
        {#if fixationRight.src}
          <image
            href={fixationRight.src ?? ""}
            height={fixationRight.height}
            x={uniform($length) * ($fixationType.right === 1 ? -1 : 1) +
              fixationRight.leftX}
            y={fixationRight.leftY}
            style={$fixationType.right === 1 ? "transform: scaleX(-1)" : ""}
          />
        {/if}

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
