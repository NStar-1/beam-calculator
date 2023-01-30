export default abstract class BaseD3Component extends Function {
  private _bound: typeof this;
  private isMounted = false;
  root: any;

  constructor() {
    super("...args", "return this._bound._call(...args)");
    this._bound = this.bind(this);
    this.init.call(this._bound);
    return this._bound;
  }

  abstract init(): void;

  abstract update(): void;

  mount(selection: any, element: any) {
    this.isMounted = true;
    selection.append(() => element.node());
  }

  _call(context: any) {
    const selection = context.selection ? context.selection() : context;
    if (!this.isMounted) this.mount(selection, this.root);
    this.update();
    return this;
  }
}
