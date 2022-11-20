import * as d3 from "d3";

type Point = { x: number; y: number };

export function dimensionLine([{ x: x0, y: y0 }, { x: x1, y: y1 }]: [
  Point,
  Point
]) {
  const dx = x0 - x1;
  const dy = y0 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const text = String(Math.round(length))
  const rot = Math.atan2(-dy, -dx) * 180 / Math.PI;

  const group = d3
    .create("svg:g")
    .attr("transform", `rotate(${rot}, ${x0}, ${y0}) translate(${x0}, ${y0})`);

  // Configuration
  const lineOffset = 10; // From the top of the tick
  const tickLength = 45; // Overall tick length
  const tickOffset = 10; // distance betweeb the Point and tick start position

  // Calculated
  const linePosY = -tickLength - tickOffset + lineOffset

  group
    .append("line")
    .attr("x1", 5) // few pixel to hide overlap with arrow
    .attr("y1", linePosY)
    .attr("x2", length - 5) // few pixel to hide overlap with arrow
    .attr("y2", linePosY)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("marker-start", "url(#triangle)")
    .attr("marker-end", "url(#triangle)");

  group
    .append("line")
    .attr("x1", 0)
    .attr("y1", -tickOffset)
    .attr("x2", 0)
    .attr("y2", -tickOffset - tickLength)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  group
    .append("line")
    .attr("x1", length)
    .attr("y1", -tickOffset)
    .attr("x2", length)
    .attr("y2", -tickOffset - tickLength)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  group
    .append("text")
    .attr("x", length / 2)
    .attr("y", -tickOffset - tickLength)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text(text);

  return group;
}
