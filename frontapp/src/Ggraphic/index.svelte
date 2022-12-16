<script>
  import * as d3 from "d3";
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import { initDefs } from "./util.ts";
  import DimensionLine from "./dimension-line.js";
  import { length } from "../store.ts";
  let svg;

  const xTicks = d3.axisBottom();

  const dimLineX = new DimensionLine().start({ x: 0, y: 0 });

  const dimLineY = new DimensionLine();

  let clientWidth;
  let clientHeight;

  let currentLen;

  console.info(clientWidth, clientHeight);

  length.subscribe((val) => {
    currentLen = val;
  });

  onMount(() => {
    svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("shape-rendering", "geometricPrecision");

    svg.call(initDefs);

    const height = clientHeight;
    const width = clientWidth;

    const marginRight = 50;
    const drawingOffset = 100;
    const drawingWidth = width - drawingOffset - marginRight;
    const drawingHeight = height - drawingOffset;

    const deflection = 50;

    const drawing = svg.append("g").attr("class", "drawing");

    drawing
      .append("rect")
      .attr("y", 0)
      .attr("x", 0)
      .style("fill", "none")
      .style("stroke", "green");

    const local = drawing.append("g").attr("class", "drawing-local");

    local
      .append("image")
      .attr("xlink:href", "assets/other/svg%20(14).svg")
      .attr("width", 120)
      .attr("height", 120)
      .attr("y", -60)
      .attr("x", -68);

    drawing.append("g").attr("class", "x-dimension");

    local
      .append("line")
      .attr("class", "line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("shape-rendering", "crispedges");

    const curveEl = local
      .append("path")
      .attr("class", "loaded-beam")
      .attr("stroke", "blue")
      .attr("stroke-width", 3)
      .attr("fill", "none");

    local
      .append("line")
      .attr("class", "force-line")
      .attr("y1", 0)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#triangle)");

    const forceLabel = local
      .append("text")
      .attr("class", "force-label")
      .attr("fill", "black")
      .style("font-size", "18px")
      .text("F = 10H");

    drawing.append("g").attr("class", "d1");

    drawing.append("g").attr("class", "x-axis");

    const dimLimeXEl = local.append("g").attr("class", "dimension-x");
    const dimLimeYEl = local.append("g").attr("class", "dimension-y");
  });

  afterUpdate(() => {
    const height = clientHeight;
    const width = clientWidth;

    const marginRight = 50;
    const drawingOffset = 100;
    const drawingWidth = width - drawingOffset - marginRight;
    const drawingHeight = height - drawingOffset;

    const deflection = 50;

    const uniform = d3.scaleLinear().range([0, drawingWidth]);

    const drawing = svg
      .select(".drawing")
      .attr(
        "transform",
        `translate(${drawingOffset / 2}, ${drawingOffset / 2})`
      );

    drawing
      .select("rect")
      .attr("width", drawingWidth)
      .attr("height", drawingHeight);

    const local = drawing
      .select(".drawing-local")
      .attr("transform", `translate(0, ${drawingHeight / 2})`);

    length.subscribe((val) => {
      uniform.domain([0, val]);

      xTicks.scale(uniform);
      dimLineX.scale(uniform).end({ x: val, y: 0 });

      dimLineY
        .start({ x: val, y: 0 })
        .end({ x: val, y: deflection })
        .scale(uniform);

      const curve = d3.path();
      curve.moveTo(0, 0);
      curve.bezierCurveTo(
        uniform(val / 1.33),
        0,
        uniform(val),
        uniform(deflection),
        uniform(val),
        uniform(deflection)
      );
      local.select(".loaded-beam").attr("d", curve);

      svg.select(".line").attr("x2", uniform(val));

      svg
        .select(".force-line")
        .attr("x1", uniform(val))
        .attr("y1", uniform(deflection))
        .attr("x2", uniform(val))
        .attr("y2", 2 * uniform(deflection));

      //svg.select('.x-axis')
      //  .call(xTicks)

      local
        .select(".force-label")
        .attr("x", uniform(val) + 15)
        .attr("y", uniform(deflection) + 50);

      local.select(".dimension-x").call(dimLineX);
      local.select(".dimension-y").call(dimLineY);
    });
  });
</script>

<div id="chart" bind:clientWidth bind:clientHeight />

<style>
  #chart {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
</style>
