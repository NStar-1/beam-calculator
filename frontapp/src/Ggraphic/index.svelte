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
      .attr("refX", 5)
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

    const points = [{x: 55, y: 155}, {x: 400, y: 155}]

    const x0 = points[0].x
    const y0 = points[0].y
    const x1 = points[1].x
    const y1 = points[1].y
    const dim = svg.append('g')
      .attr(
        'transform', 
        `rotate(10, ${x0}, ${y0}) translate(${x0}, ${y0})`
      )

    const dx = x0 - points[1].x
    const dy = y0 - points[1].y
    const length = Math.sqrt((dx * dx) + (dy * dy))
    const offset = 30

    dim.append('line')
      .attr('x1', 0)
      .attr('y1', -offset)
      .attr('x2', length)
      .attr('y2', -offset)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("marker-start", "url(#triangle)")
      .attr("marker-end", "url(#triangle)")

    dim.append('line')
      .attr('x1', 0)
      .attr('y1', -offset - 10)
      .attr('x2', 0)
      .attr('y2', -offset + 35)
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    dim.append('line')
      .attr('x1', length)
      .attr('y1', -offset - 10)
      .attr('x2', length)
      .attr('y2', -offset + 35)
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    dim.append('text')
      .attr('x', length / 2)
      .attr('y', -40)
      .attr('fill', 'black')
      .style('font-size', "18px")
      .text('Text')
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
