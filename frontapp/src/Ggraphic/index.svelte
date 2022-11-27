<script>
  import * as d3 from 'd3';
  import {onMount, afterUpdate, beforeUpdate} from "svelte";
  import { initDefs } from './util.ts'
  import DimensionLine from './dimension-line.js'
  import { length } from '../store.ts';
  let svg;
  let clientWidth;
  let clientHeight;

  let currentLen;

  $: console.info(clientWidth, clientHeight)

  length.subscribe((val) => {
    currentLen = val;
  })

  onMount(()=> {
    svg = d3.select("#chart")
        .append("svg")
        .attr("width", "100%")
        .attr('height', "100%")
        .attr('shape-rendering', 'geometricPrecision')

    const height = clientHeight;
    const width = clientWidth;

    svg.call(initDefs)

    const drawingOffset = 200;
    const drawingWidth = width - drawingOffset;
    const drawingHeight = height - drawingOffset;

    const deflection = 50

    const drawing = svg.append('g')
      .attr('class', 'drawing')
      .attr('transform', `translate(${drawingOffset/2}, ${drawingOffset/2})`)

    drawing.append('rect')
      .attr('y', 0)
      .attr('x', 0)
      .attr('width', drawingWidth)
      .attr('height', drawingHeight)
      .style('fill', 'none')
      .style('stroke', 'green')

    const local = drawing.append('g')
      .attr('class', 'drawing-local')
      .attr('transform', `translate(0, ${drawingHeight / 2})`)

    local.append("image")
      .attr("xlink:href", "assets/other/svg%20(14).svg")
      .attr("width", 120)
      .attr("height", 120)
      .attr('y', -60)
      .attr('x', -68)

    drawing.append('g')
      .attr('class', 'x-dimension')

    local.append("line")
      .attr('class', 'line')
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr('shape-rendering', 'crispedges')

    const curveEl = local.append('path')
      .attr('stroke', 'blue')
      .attr("stroke-width", 3)
      .attr("fill", "none")

    local.append('line')
      .attr('class', 'force-line')
      .attr("y1", 0)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("marker-end", "url(#triangle)")

    const forceLabel = local.append('text')
      .attr('fill', 'black')
      .style('font-size', "18px")
      .text('F = 10H')

    drawing.append('g')
      .attr('class', 'd1')

    const xTicks = d3.axisBottom()

    drawing.append('g')
      .attr('class', 'x-axis')

    const dimLimeXEl = local.append('g')
    const dimLimeYEl = local.append('g')

    const dimLineX = new DimensionLine()
      .start({x: 0, y: 0})

    const dimLineY = new DimensionLine()
    const uniform = d3.scaleLinear()
      .range([0, drawingWidth])

    length.subscribe((val) => {
      uniform.domain([0, val])

      xTicks.scale(uniform)
      dimLineX
        .scale(uniform)
        .end({x: val, y: 0})

      dimLineY
        .start({x: val, y: 0})
        .end({x: val, y: deflection})
        .scale(uniform)

      const curve = d3.path()
      curve.moveTo(0, 0)
      curve.bezierCurveTo(
        uniform(val/1.33), 0,
        uniform(val), uniform(deflection),
        uniform(val), uniform(deflection)
      )
      curveEl.attr('d', curve)

      svg.select('.line')
        .attr('x2', uniform(val))

      svg.select('.force-line')
        .attr('x1', uniform(val))
        .attr('y1', uniform(deflection))
        .attr('x2', uniform(val))
        .attr('y2', 2 * uniform(deflection))

      svg.select('.x-axis')
        .call(xTicks)

      forceLabel
        .attr('x', uniform(val) + 15)
        .attr('y', uniform(deflection) + 50)

      dimLimeXEl.call(dimLineX)
      dimLimeYEl.call(dimLineY)
    })

  });

  afterUpdate(function() {
    console.log('UPD')
  })

</script>
<style>
    #chart{
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
</style>

<div id="chart" bind:clientWidth bind:clientHeight></div>
