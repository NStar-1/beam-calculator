<div>
  <h2>Q: How the app works?</h2>
  <p>
    A: This app is using Open Source stress analysis tool named Frame3DD under
    the hood. This tool capable of static and dynamic simulations, but we only
    allow a narrow subset of simulation modes. Frame3DD is originally written in
    C, however we use WebAssembly to migrate it to the js domain.
  </p>
  <h2>Q: What is Frame3Dd</h2>
  <p>
    A: <a href="https://frame3dd.sourceforge.net/">Official documentation</a> says:
    "Frame3DD is free open-source software for static and dynamic structural analysis
    of 2D and 3D frames and trusses with elastic and geometric stiffness. It computes
    the static deflections, reactions, internal element forces, natural frequencies,
    mode shapes and modal participation factors of two- and three- dimensional elastic
    structures using direct stiffness and mass assembly."
  </p>
  <h2>Q: Can I use underlying tools directly?</h2>
  <p>
    A: Yes, you can use <a href="https://github.com/NStar-1/frame3dd-wasm-js"
      >WASM version of Frame3DD</a
    >
    or alternativetely you can use
    <a href="https://github.com/unrealsolver/frame3dd"
      >updated version of Frame3Dd</a
    >
  </p>
</div>
