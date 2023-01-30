import * as d3 from "d3";

export default class DimensionLine extends Function {
  isMounted = false;

  // Input
  _scale = undefined;
  x0 = 0;
  y0 = 0;
  x1 = 0;
  y1 = 0;

  // SVG elements
  group = undefined;
  line = undefined;
  tick0 = undefined;
  ticke1 = undefined;
  textEl = undefined;

  constructor() {
    super("...args", "return this._bound._call(...args)");
    this._bound = this.bind(this);
    this.init.call(this._bound);
    return this._bound;
  }

  init() {
    this.group = d3.create("svg:g");

    // Configuration
    const lineOffset = 10; // From the top of the tick
    const tickLength = 45; // Overall tick length
    const tickOffset = 10; // distance betweeb the Point and tick start position

    // Calculated
    const linePosY = -tickLength - tickOffset + lineOffset;

    this.line = this.group
      .append("line")
      .attr("x1", 5) // few pixel to hide overlap with arrow
      .attr("y1", linePosY)
      .attr("y2", linePosY)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("marker-start", "url(#triangle)")
      .attr("marker-end", "url(#triangle)");

    this.tick0 = this.group
      .append("line")
      .attr("x1", 0)
      .attr("y1", -tickOffset)
      .attr("x2", 0)
      .attr("y2", -tickOffset - tickLength)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    this.tick1 = this.group
      .append("line")
      .attr("y1", -tickOffset)
      .attr("y2", -tickOffset - tickLength)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    this.textEl = this.group
      .append("text")
      .attr("y", -tickOffset - tickLength)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", "18px");
  }

  mount(selection) {
    this.isMounted = true;
    selection.append(() => this.group.node());
  }

  update() {
    const dx = this.x0 - this.x1;
    const dy = this.y0 - this.y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const text = String(Math.round(length));
    const rot = (Math.atan2(-dy, -dx) * 180) / Math.PI;

    // Screen-space coordinates
    const effectiveLength = this._scale(length);
    const effectiveX0 = this._scale(this.x0);
    const effectiveY0 = this._scale(this.y0);

    this.group.attr(
      "transform",
      `
        rotate(${rot}, ${effectiveX0}, ${effectiveY0})
        translate(${effectiveX0}, ${effectiveY0})
      `
    );

    this.line.attr("x2", effectiveLength - 5); // few pixel to hide overlap with arrow
    this.tick1.attr("x1", effectiveLength).attr("x2", effectiveLength);
    this.textEl.attr("x", effectiveLength / 2).text(text);
  }

  start(point) {
    this.x0 = point.x;
    this.y0 = point.y;
    return this;
  }

  end(point) {
    this.x1 = point.x;
    this.y1 = point.y;
    return this;
  }

  scale(scale) {
    this._scale = scale;
    return this;
  }

  _call(context) {
    const selection = context.selection ? context.selection() : context;
    if (!this.isMounted) this.mount(selection);
    this.update();
    return this;
  }
}
