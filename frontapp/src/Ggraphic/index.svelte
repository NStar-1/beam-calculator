<script>
  import * as d3 from 'd3';
  import {onMount, afterUpdate, beforeUpdate} from "svelte";
  import { dimensionLine } from './util.ts'
  let svg;

  onMount(()=> {
    svg = d3.select("#chart")
        .append("svg")
        .attr("width", "100%")
        .attr('height', "100%")
        .attr('shape-rendering', 'geometricPrecision')

    svg.append("svg:defs").append("svg:marker")
      .attr("id", "triangle")
      .attr("refX", 3)
      .attr("refY", 3)
      .attr("markerWidth", 12)
      .attr("markerHeight", 12)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 6 3 0 6 1.5 3")
      .style("fill", "black")

    svg.append("image")
      .attr("xlink:href", "assets/other/svg%20(14).svg")
      .attr("width", 120)
      .attr("height", 120)
      .attr('y', 190)
      .attr('x', 32)

    const lcData = [{x: 100, y: 250}, {x: 350, y: 260}, {x: 500, y: 300}]
    const frame = {
      x0: 100,
      y0: 250,
      x1: 500,
      y1: 250
    }

    svg.append("line")
      .attr("x1", frame.x0)
      .attr("y1", frame.y0)
      .attr("x2", frame.x1)
      .attr("y2", frame.y1)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr('shape-rendering', 'crispedges')

    const loadedBeam = d3.line(d => d.x, d => d.y)
      .curve(d3.curveBasis)

    svg.append('path')
      .attr('d', loadedBeam(lcData))
      .attr('stroke', 'blue')
      .attr("stroke-width", 3)
      .attr("fill", "none")

    svg.append('line')
      .attr("x1", 500)
      .attr("y1", 300)
      .attr("x2", 500)
      .attr("y2", 350)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#triangle)")

    svg.append('text')
      .attr('x', 515)
      .attr('y', 350)
      .attr('fill', 'black')
      .style('font-size', "18px")
      .text('F = 10H')

    svg.append(() => dimensionLine([{x: frame.x0, y: frame.y0}, {x: frame.x1, y: frame.y1}]).node())
    svg.append(() => dimensionLine([{x: frame.x1, y: frame.y1}, {x: lcData[2].x, y: lcData[2].y}]).node())
  });

  afterUpdate(function() {

  })
</script>
<style>
    #chart{
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
</style>

<div id="chart">
</div>
