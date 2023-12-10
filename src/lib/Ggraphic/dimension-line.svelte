<script lang="ts">
  export let x0: number;
  export let y0: number;
  export let x1: number;
  export let y1: number;
  export let scale: (n: number) => number;

  // Configuration
  const lineOffset = 10; // From the top of the tick
  const tickLength = 45; // Overall tick length
  const tickOffset = 10; // distance betweeb the Point and tick start position
  const minScreenLiength = 40;

  // Calculated
  const linePosY = -tickLength - tickOffset + lineOffset;

  // State
  let dx: number, dy: number, length: number, text: string, rot: number;
  $: {
    dx = x0 - x1;
    dy = y0 - y1;
    length = Math.sqrt(dx * dx + dy * dy);
    text = String(Math.round(length));
    rot = (Math.atan2(-dy, -dx) * 180) / Math.PI;
  }

  // Screen-space coordinates
  let screenLength: number;
  let screenX0: number;
  let screenY0: number;
  let isShort: boolean = false;
  $: {
    screenLength = scale(length);
    screenX0 = scale(x0);
    screenY0 = scale(y0);
    isShort = screenLength < minScreenLiength;
  }
</script>

<g
  transform="
        rotate({rot}, {screenX0}, {screenY0})
        translate({screenX0} {screenY0})
    "
>
  {#if isShort}
    <line
      x1={-40}
      y1={linePosY}
      x2={-5}
      y2={linePosY}
      class="dimension arrow-end"
    />
    <line
      x1={0}
      y1={linePosY}
      x2={screenLength}
      y2={linePosY}
      class="dimension"
    />
    <line
      x1={screenLength + 30}
      y1={linePosY}
      x2={screenLength + 5}
      y2={linePosY}
      class="dimension arrow-end"
    />
  {:else}
    <line
      x1={5}
      y1={linePosY}
      x2={screenLength - 5}
      y2={linePosY}
      class="dimension arrow-both"
    />
  {/if}

  <line
    x1={0}
    y1={-tickOffset}
    x2={0}
    y2={-tickOffset - tickLength}
    class="tick"
  />

  <line
    x1={screenLength}
    y1={-tickOffset}
    x2={screenLength}
    y2={-tickOffset - tickLength}
    class="tick"
  />

  <text x={isShort ? -25 : screenLength / 2} y={-tickOffset - tickLength}
    >{text}</text
  >
</g>

<style>
  * {
    font-family: "GOST type A";
  }

  .dimension {
    stroke: currentColor;
    stroke-width: 1;
    shape-rendering: crispEdges;
  }

  .arrow-both {
    marker-start: url(#triangle);
    marker-end: url(#triangle);
  }

  .arrow-end {
    marker-end: url(#triangle);
  }

  .tick {
    stroke: currentColor;
    stroke-width: 2;
  }

  text {
    text-anchor: middle;
    font-size: 18px;
    fill: currentColor;
  }
</style>
