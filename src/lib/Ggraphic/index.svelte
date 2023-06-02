<script lang="ts">
  import {
    isPhone,
    material,
    length,
    firstPoint,
    lastPoint,
    results,
    newresults,
    loads,
    FixationEnum,
    tempLoad,
  } from "$lib/store";
  import { scaleLinear, path, type Path } from "d3";
  import DimensionLine from "./dimension-line.svelte";
  import Point from "./Point.svelte";
  import ForceLine from "./force-line.svelte";
  import NodeNumber from "./node-number.svelte";
  import Markers from "./markers.svelte";
  import { fixationConst } from "../Options/constants";
  import { _ } from "svelte-i18n";
  import { getLoadAbsPos } from "$lib/store-utils";
  let clientWidth: number;
  let clientHeight: number;
  const marginRight = 70;
  let drawingOffset: number;

  let drawingWidth;

  let drawingHeight: number;
  $: drawingHeight = clientHeight - drawingOffset;

  let fixationLeft;
  let fixationRight;
  $: fixationLeft = fixationConst.find((d) => d.value === $firstPoint.isFixed);
  $: fixationRight = fixationConst.find((d) => d.value === $lastPoint.isFixed);

  let uniform = scaleLinear();
  let curve: Path;
  $: {
    drawingOffset = $isPhone ? 50 : 100;
    drawingWidth = clientWidth - drawingOffset - marginRight;
    uniform = uniform.range([0, drawingWidth]).domain([0, $length]);
    curve = path();
    curve.moveTo(0, 0);

    // Use cubic Hermite spline to Bezier (https://math.stackexchange.com/a/4139433)
    let prev = $newresults[0];
    $newresults.forEach((d, idx) => {
      // Skip the first point
      if (idx === 0) return;
      let curr = d;
      const dx = curr.x - prev.x;
      // Start/end slopes (first derivatives)
      const d0 = -prev.displacement.zz;
      const d1 = -curr.displacement.zz;
      console.log(dx);
      // Kind of cubic Hermite...
      curve.bezierCurveTo(
        uniform(prev.x + dx / 3),
        uniform(-prev.displacement.y + (d0 * dx) / 3),

        uniform(curr.x - dx / 3),
        uniform(-curr.displacement.y - (d1 * dx) / 3),

        uniform(curr.x),
        uniform(-curr.displacement.y)
      );
      prev = curr;
    });
  }

  let loadsPos: Array<{}>;
  $: loadsPos = $loads.map((load) => {
    const x = getLoadAbsPos(load, $length)
    const result = $newresults.find((d) => d.x === x)
    console.log(result)
    return {
      x,
      y: result ? -result.displacement.y : 0
    }
  })
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
        {#each $newresults as r}
          <Point x={uniform(r.x)} y={uniform(-r.displacement.y)} />
          {#if r.displacement.y !== 0}
            <DimensionLine
              x0={r.x}
              y0={0}
              x1={r.x}
              y1={-r.displacement.y}
              scale={uniform}
            />
          {/if}
        {/each}

        {#each loadsPos as pos, idx}
          <NodeNumber
            x={uniform(pos.x)}
            y={uniform(pos.y) - 23}
            text={String(idx)}
          />
        {/each}

        <!--{#if $points.length !== 0}
          {#each $points as point}
            <NodeNumber
              x={uniform(point.x)}
              y={uniform(0) - 20}
              text={String(point.id)}
            />
            {#if $loads && $loads.length > 0}
              <ForceLine
                x0={point.x}
                y0={0}
                x1={point.x -
                  (Math.sin(
                    ($loads.find((load) => load.node === point.id).angle *
                      Math.PI) /
                      180
                  ) *
                    $loads.find((load) => load.node === point.id).load) /
                    100}
                y1={(Math.cos(
                  ($loads.find((load) => load.node === point.id).angle *
                    Math.PI) /
                    180
                ) *
                  $loads.find((load) => load.node === point.id).load) /
                  100}
                label={"F = " +
                  $loads.find((load) => load.node === point.id)?.load}
                scale={uniform}
              />
            {/if}
          {/each}
        {/if}
        {#if $tempLoad.node !== -1}

        <ForceLine
          x0={$tempLoad.offset}
          y0={0}
          x1={$tempLoad.offset -
            (Math.sin(
              ($tempLoad.angle *
                Math.PI) /
                180
            ) *
              $tempLoad.load) /
              100}
          y1={(Math.cos(
            ($tempLoad.angle *
              Math.PI) /
              180
          ) *
            $tempLoad.load) /
            100}
          label={"F = " +
            $tempLoad.load}
          scale={uniform}
        />
        {/if}-->
        <DimensionLine x0={0} y0={0} x1={$length} y1={0} scale={uniform} />
        <image
          href={fixationRight.src ?? ""}
          height={fixationRight.height}
          x={uniform($length) *
            ($lastPoint.isFixed === FixationEnum.FIXED ? -1 : 1) +
            fixationRight.leftX}
          y={fixationRight.leftY}
          style={$lastPoint.isFixed === FixationEnum.FIXED
            ? "transform: scaleX(-1)"
            : ""}
        />
      </g>
    </g>
  </svg>
</div>

<style>
  * {
    font-family: "GOST type A";
  }

  .graphic-container {
    width: 100%;
    height: 100%;
    background-color: white;
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
    font-size: 20px;
  }
</style>
