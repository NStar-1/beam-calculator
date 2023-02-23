<script>
  import * as d3 from "d3";
  import { onMount, afterUpdate } from "svelte";
  import { initDefs } from "./util.ts";
  import DimensionLine from "./dimension-line.js";
  import NodeNumber from "./node-number.ts";
  import { length, fixationType, results } from "../store.ts";
  import { fixationConst } from "../Options/constants";
  let svg;

  const xTicks = d3.axisBottom();

  const dimLineX = new DimensionLine().start({ x: 0, y: 0 });
  const dimLineY = new DimensionLine();
  const nodeNumber = new NodeNumber();

  let clientWidth;
  let clientHeight;
  let currentLeftFix;
  let deflection;

  fixationType.subscribe((value) => {
    currentLeftFix = fixationConst[value.left];
  });

  onMount(() => {
    svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("shape-rendering", "geometricPrecision");
    svg.call(initDefs);

    const drawing = svg.append("g").attr("class", "drawing");

    drawing.append("rect").attr("y", 0).attr("x", 0).style("fill", "none");

    const local = drawing.append("g").attr("class", "drawing-local");

    local
      .append("image")
      .attr("id", "leftFix")
      //.attr("xlink:href", "assets/other/svg%20(14).svg")
      .attr("xlink:href", fixationConst[$fixationType.left].src)
      //.attr("width", 120)
      .attr("height", fixationConst[$fixationType.left].height)
      .attr("y", fixationConst[$fixationType.left].leftY)
      .attr("x", fixationConst[$fixationType.left].leftX);

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

    local
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

    local
      .append("text")
      .attr("class", "force-label")
      .attr("fill", "black")
      .style("font-size", "18px")
      .text("F = 10H");

    drawing.append("g").attr("class", "d1");

    drawing.append("g").attr("class", "x-axis");

    local.append("g").attr("class", "dimension-x");
    local.append("g").attr("class", "dimension-y");
  });

  afterUpdate(() => {
    const height = clientHeight;
    const width = clientWidth;
    const marginRight = 50;
    const drawingOffset = 100;
    const drawingWidth = width - drawingOffset - marginRight;
    const drawingHeight = height - drawingOffset;

    const image = document.getElementById("leftFix");
    image.href.baseVal = currentLeftFix.src;
    image.y.baseVal.value = currentLeftFix.leftY;
    image.x.baseVal.value = currentLeftFix.leftX;
    image.height.baseVal.value = currentLeftFix.height;
    // local
    //     .append("image")
    //     .attr("id", "leftFix")
    //     //.attr("xlink:href", "assets/other/svg%20(14).svg")
    //     .attr("xlink:href", fixationConst[$fixationType.left].src)
    //     .attr("width", 120)
    //     .attr("height", 120)
    //     .attr("y", -60)
    //     .attr("x", -68);

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

    results.subscribe((res) => {
      deflection = res.D ? -res.D[1].y : 50;
      update();
    });

    function update() {
      const val = $length;
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
      local.call(nodeNumber);
    }
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
