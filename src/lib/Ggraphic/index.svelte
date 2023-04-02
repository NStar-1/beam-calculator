<script lang="ts">
  import {
    isPhone,
    material,
    length,
    firstPoint,
    lastPoint,
    results,
    points,
    loads,
    FixationEnum,
    tempLoad
  } from "$lib/store";
  import { scaleLinear, path } from "d3";
  import DimensionLine from "./dimension-line.svelte";
  import ForceLine from "./force-line.svelte";
  import NodeNumber from "./node-number.svelte";
  import Markers from "./markers.svelte";
  import { fixationConst } from "../Options/constants";
  import { _ } from "svelte-i18n";
  let clientWidth: number;
  let clientHeight: number;
  const marginRight = 70;
  let drawingOffset: number;

  let drawingWidth;

  let drawingHeight;
  $: drawingHeight = clientHeight - drawingOffset;

  let fixationLeft;
  $: fixationLeft = fixationConst.find((d) => d.value === $firstPoint.isFixed);

  let fixationRight;
  $: fixationRight = fixationConst.find((d) => d.value === $lastPoint.isFixed);

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
        <NodeNumber x={uniform($length) + 20} y={uniform(0) - 20} text="2" />

        {#if $points.length !== 0}
          {#each $points as point}
            <NodeNumber
              x={uniform(point.x)}
              y={uniform(0) - 20}
              text={String(point.id + 1)}
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
        <NodeNumber
        x={uniform($tempLoad.offset)}
        y={uniform(0) - 20}
        text={String($tempLoad.node + 1)}
      />

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
        {/if}
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
            x={uniform($length) * ($firstPoint.isFixed === FixationEnum.FIXED ? -1 : 1) +
              fixationRight.leftX}
            y={fixationRight.leftY}
            style={$lastPoint.isFixed === FixationEnum.FIXED
              ? "transform: scaleX(-1)"
              : ""}
          />
        {/if}
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
