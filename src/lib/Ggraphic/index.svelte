<script lang="ts">
  import {
    isPhone,
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
  import { max, min } from "d3-array";
  import DimensionLine from "./dimension-line.svelte";
  import Point from "./Point.svelte";
  import ForceLineAdaptive from "./forceLineAdaptive.svelte";
  import NodeNumber from "./node-number.svelte";
  import Markers from "./markers.svelte";
  import { getLoadAbsPos } from "$lib/store-utils";
  import FixRigid from "./FixRigid.svelte";
  import FixRoller from "./FixRoller.svelte";
  import FixPin from "./FixPin.svelte";
  import Info from "./Info.svelte";
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

  let forceScale = scaleLinear().range([25, 50]);

  $: {
    const values = $loads.map((d) => d.value);
    forceScale = forceScale.domain([min(values)!, max(values)!]);
  }

  let uniform = scaleLinear();
  let curve: Path;
  let minDisplacement: number; // Used to define offset when beam has negative deflection
  let maxDisplacement: number; // Same as above but for positive offset

  $: {
    // min/max must start with 0 for proper negative/positive capturing
    minDisplacement = 0;
    maxDisplacement = 0;
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
      console.log($newresults);
      const dx = curr.x - prev.x;
      // Start/end slopes (first derivatives)
      const d0 = -prev.displacement.zz;
      const d1 = -curr.displacement.zz;
      // Update minimal (negative) and max (positive) displacement
      if (minDisplacement > -curr.displacement.y)
        minDisplacement = -curr.displacement.y;
      if (maxDisplacement < -curr.displacement.y)
        maxDisplacement = -curr.displacement.y;
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

  let totalHeight: string = "50%";
  let topOffset = 0;
  // If there is a negative displacement, than offset is smaller
  $: topOffset = minDisplacement < 0 ? 75 : 125;
  const bottomOffset = 100;

  // -minDisplacement is less than zero hence '-' inverts it
  $: totalHeight = `${
    topOffset + bottomOffset + uniform(maxDisplacement - minDisplacement)
  }px`;

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
  <svg width="100%" height={totalHeight} shape-rendering="geometricPrecision">
    <Markers />
    <g
      class="drawing"
      transform="translate({drawingOffset / 2 + 10}, {-uniform(
        minDisplacement
      )})"
    >
      <g class="drawing-local" transform="translate(0, {topOffset})">
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
            on:click={() => ($selectedLoad = idx)}
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
  <Info />
</div>

<style>
  svg {
    overflow: visible;
  }

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
</style>
