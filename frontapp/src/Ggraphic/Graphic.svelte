

<script>
    import * as d3 from 'd3';
    import Icon from 'svelte-icon'
    import {onMount, afterUpdate, beforeUpdate} from "svelte";
    import  Arrow from '../../iconsBeam/arrow.svg'
    let data = [{x: 1, y: 10},{x: 2, y: 16},{x: 3, y: 20}, {x: 4, y: 7}, {x: 5, y: 39},{x: 6, y: 13}];
    let data2 = [{x: 1, y: 13},{x: 2, y: 5},{x: 3, y: 14}, {x: 4, y: 9}, {x: 5, y: 59},{x: 6, y: 12}];
    let divSize = {width: 0, height: 0};
    let svg;

    beforeUpdate(()=> {

    })
    onMount(()=> {
        console.log(divSize)
        let margin = {top: 10, right: 30, bottom: 30, left: 20};
        svg = d3.select("#chart")
            .append("svg")
            .attr("width", "100%")
            .attr('height', "100%")
            .append("g")
    });

    afterUpdate(()=> {
        try{
            divSize = { height:document.getElementById("chart").offsetHeight, width:document.getElementById("chart").offsetWidth};
            console.log(divSize)
            let margin = {top: 0, right: 30, bottom: 30, left: 20},
                width = divSize.width - margin.left - margin.right,
                height = divSize.height - margin.top - margin.bottom;

            // Add X axis
            let x = d3.scaleLinear()
                .domain([-1, 6])
                .range([ 20, divSize.width -20]);
            svg.append("g")
                .attr("transform", `translate(0,${divSize.height - 20})`)
                .call(d3.axisBottom(x));
            // Add Y axis
            let y = d3.scaleLinear()
                .domain( d3.extent(data2, function(d) { return d.y; }))
                .range([ divSize.height -20, 0 ]);
            svg.append("g")
                .attr('transform', "translate(20, 0)")
                .call(d3.axisLeft(y));

            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .curve(d3.curveBasis) // Just add that to have a curve instead of segments
                    .x(function(d) { return x(d.x) })
                    .y(function(d) { return y(d.y) })
                )
            svg.append("path")
                .datum(data2)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .curve(d3.curveBasis) // Just add that to have a curve instead of segments
                    .x(function(d) { return x(d.x) })
                    .y(function(d) { return y(d.y) })
                )
            svg.append('image')
                .attr('xlink:href', 'assets/arrow1.svg')
                .attr('x', '100')
                .attr('y', '100')
            let Tooltip = d3.select("#my_dataviz")
                .append("div")
                .style("height", "100%")
                .style("width", "100%")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")
            // d3.svg("/assets/arrow1.svg").then(xml=>{
            //     svg.appendChild(xml).height('100').x('100').y('100')
            // })
        }catch(e){
            divSize = {}
        }
    });


</script>

<style>
    #chart{
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
    .svg-content {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
    }
    #arrow{
        height: 400px;
        width: 100px;
    }
</style>

<div id="chart">
</div>

