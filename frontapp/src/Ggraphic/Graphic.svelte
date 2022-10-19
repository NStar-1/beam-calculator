
<div id="chart">

</div>

<script>
    import * as d3 from 'd3';
    import {onMount, afterUpdate, beforeUpdate} from "svelte";
    import { writable } from 'svelte/store';
    let data = [{x: 1, y: 10},{x: 2, y: 16},{x: 3, y: 20}, {x: 4, y: 7}, {x: 5, y: 39},{x: 6, y: 13}];

    let divSize = {width: 0, height: 0};
    let svg;
    beforeUpdate(()=> {

    })
    onMount(()=> {
        console.log(divSize)
        let margin = {top: 10, right: 30, bottom: 30, left: 60};
        svg = d3.select("#chart")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


    });
    // beforeUpdate(()=>{
    //     try{
    //         divSize = {width: document.getElementById("chart").offsetWidth, height:document.getElementById("chart").offsetHeight};
    //     }catch(e){
    //         divSize = {}
    //     }
    //     console.log(divSize)
    // })
    afterUpdate(()=> {
        try{
            divSize = { height:document.getElementById("chart").offsetHeight, width:document.getElementById("chart").offsetWidth};
            console.log(divSize)
            let margin = {top: 10, right: 30, bottom: 30, left: 60},
                width = divSize.width - margin.left - margin.right,
                height = divSize.height - margin.top - margin.bottom;
            svg.attr("width", width)
                .attr("height", height)
            //  debugger

            // Add X axis --> it is a date format
            let x = d3.scaleTime()
                .domain(d3.extent(data, function(d) { return d.x; }))
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            let y = d3.scaleLinear()
                .domain( [0, 100])
                .range([ height, 0 ]);
            svg.append("g")
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

            // create a tooltip
            let Tooltip = d3.select("#my_dataviz")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")
        }catch(e){
            divSize = {}
        }
        console.log(divSize)


    });

    // setTimeout(()=> {
    //
    // }, 1000)
    // append the svg object to the body of the page
        // Three function that change the tooltip when user hover / move / leave a cell
        // let mouseover = function(d) {
        //     Tooltip
        //         .style("opacity", 1)
        // }
        // let mousemove = function(d) {
        //     Tooltip
        //         .html("Exact value: " + d.value)
        //         .style("left", (d3.mouse(this)[0]+70) + "px")
        //         .style("top", (d3.mouse(this)[1]) + "px")
        // }
        // let mouseleave = function(d) {
        //     Tooltip
        //         .style("opacity", 0)
        // }

        // // Add the points
        // svg
        //     .append("g")
        //     .selectAll("dot")
        //     .data(data)
        //     .enter()
        //     .append("circle")
        //     .attr("class", "myCircle")
        //     .attr("cx", function(d) { return x(d.date) } )
        //     .attr("cy", function(d) { return y(d.value) } )
        //     .attr("r", 8)
        //     .attr("stroke", "#69b3a2")
        //     .attr("stroke-width", 3)
        //     .attr("fill", "white")
        //     .on("mouseover", mouseover)
        //     .on("mousemove", mousemove)
        //     .on("mouseleave", mouseleave)

</script>

<style>
    #chart{
        box-sizing: content-box;
        height: 100%;
        font: 10px sans-serif;
        text-align: right;
    }
</style>

