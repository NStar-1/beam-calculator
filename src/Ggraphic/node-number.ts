import BaseD3Component from "./base-component";
import * as d3 from "d3";
import { Selection } from "d3";

export default class NodeNumber extends BaseD3Component {
  circle: Selection<SVGCircleElement, null, null, null>;

  init() {
    this.root = d3.create("svg:g");
    this.circle = this.root
      .append("circle")
      .attr("r", 10)
      .attr("x", 0)
      .attr("y", 0)
      .attr("stroke-width", 2)
      .attr("stroke", "black");
  }

  update() {}
}
