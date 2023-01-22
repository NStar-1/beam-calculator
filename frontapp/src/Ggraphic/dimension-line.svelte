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
    let effectiveLength: number;
    let effectiveX0: number;
    let effectiveY0: number;
    $: {
        effectiveLength = scale(length);
        effectiveX0 = scale(x0);
        effectiveY0 = scale(y0);
    }
</script>

<g
    transform="
        rotate({rot}, {effectiveX0}, {effectiveY0})
        translate({effectiveX0} {effectiveY0})
    "
>
    <line
        x1={5}
        y1={linePosY}
        x2={effectiveLength - 5}
        y2={linePosY}
        class="dimension"
    />

    <line
        x1={0}
        y1={-tickOffset}
        x2={0}
        y2={-tickOffset - tickLength}
        class="tick"
    />

    <line
        x1={effectiveLength}
        y1={-tickOffset}
        x2={effectiveLength}
        y2={-tickOffset - tickLength}
        class="tick"
    />

    <text x={effectiveLength / 2} y={-tickOffset - tickLength}> {text}</text>
</g>

<style>
    .dimension {
        stroke: black;
        stroke-width: 2;
        marker-start: url(#triangle);
        marker-end: url(#triangle);
    }

    .tick {
        stroke: black;
        stroke-width: 2;
    }

    text {
        font-family: monospace;
        text-anchor: middle;
        font-size: 18px;
        fill: black;
    }
</style>
