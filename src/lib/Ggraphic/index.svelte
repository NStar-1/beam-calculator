<script lang="ts">
  import {
    isPhone,
    material,
    length,
    firstPoint,
    lastPoint,
    loads,
    minMaxForce,
    newresults,
    FixationEnum,
    selectedLoad,
  } from "$lib/store";
  import { scaleLinear, path, type Path } from "d3";
  import DimensionLine from "./dimension-line.svelte";
  import Point from "./Point.svelte";
  import ForceLineAdaptive from "./forceLineAdaptive.svelte";
  import NodeNumber from "./node-number.svelte";
  import Markers from "./markers.svelte";
  import { _ } from "svelte-i18n";
  import { getLoadAbsPos } from "$lib/store-utils";
  import FixRigid from "./FixRigid.svelte";
  import FixRoller from "./FixRoller.svelte";
  import FixPin from "./FixPin.svelte";
  import type { ComponentType } from "svelte";
  let clientWidth: number;
  let clientHeight: number;
  const marginRight = 70;
  let drawingOffset: number;

  let drawingWidth;

  let drawingHeight: number;
  $: drawingHeight = clientHeight - drawingOffset;

  const fixationComonent: { [key in FixationEnum]?: any } = {
    [FixationEnum.NONE]: null,
    [FixationEnum.FIXED]: FixRigid,
    [FixationEnum.ROLLER]: FixRoller,
    [FixationEnum.PIN]: FixPin,
  };

  let fixationLeft: ComponentType | null;
  let fixationRight: ComponentType | null;
  $: fixationLeft = fixationComonent[$firstPoint.isFixed];
  $: fixationRight = fixationComonent[$lastPoint.isFixed];

  let forceScale = scaleLinear().range([100, 250]);

  let uniform = scaleLinear();
  let curve: Path;
  $: {
    drawingOffset = $isPhone ? 50 : 100;
    drawingWidth = clientWidth - drawingOffset - marginRight;
    uniform = uniform.range([0, drawingWidth]).domain([0, $length]);
    forceScale = forceScale.domain($minMaxForce);
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
    const x = getLoadAbsPos(load, $length);
    const result = $newresults.find((d) => d.x === x);
    return {
      x,
      y: result ? -result.displacement.y : 0,
    };
  });
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

        {#if fixationLeft}
          <svelte:component
            this={fixationLeft}
            x={0}
            y={0}
            orientation="left"
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
            isActive={idx === $selectedLoad}
          />
        {/each}

        {#each $loads as load, idx}
          <ForceLineAdaptive
            x={loadsPos[idx].x}
            y={loadsPos[idx].y}
            angle={load.angle}
            force={load.value}
            label={"F = " + load.value}
            scale={uniform}
            {forceScale}
            isActive={idx === $selectedLoad}
          />
        {/each}

        <DimensionLine x0={0} y0={0} x1={$length} y1={0} scale={uniform} />

        {#if fixationRight}
          <svelte:component
            this={fixationRight}
            x={uniform($length)}
            y={0}
            orientation="right"
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
    stroke: currentColor;
    stroke-width: 3;
  }

  .loaded-beam {
    stroke: cornflowerblue;
    stroke-width: 4;
    fill: none;
  }

  .material-info {
    font-size: 20px;
    fill: currentColor;
  }
</style>
