<script>
  import * as d3 from 'd3';
  import './chart'
  import {onMount, afterUpdate, beforeUpdate} from "svelte";
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
      .attr("orient", "auto")
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

    svg.append("line")
      .attr("x1", 100)
      .attr("y1", 250)
      .attr("x2", 500)
      .attr("y2", 250)
      .attr("stroke", "black")
      .attr("stroke-width", 3)

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
