<script>
    export let angle
</script>


<svg viewBox="0 0 100 100" style="cursor: auto;">
    <defs>
        <filter id="inset-shadow">
          <feFlood flood-color="black"/>
          <feComposite operator="out" in2="SourceGraphic"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite operator="atop" in2="SourceGraphic"/>
        
        </filter>
        </defs>
    <circle filter="url(#inset-shadow)" cx="50" cy="50" r="40" fill="white" stroke="#ff8d48"/>
    <circle filter="url(#inset-shadow)" cx="50" cy="50" r="2" fill="black" stroke="none"/>
    <line x1="50" y1="50" x2={50 + Math.sin(angle * Math.PI/180) * 40} y2={50 - Math.cos(angle * Math.PI/180) * 40} style="stroke:rgb(0,0,0);stroke-width:1" />
</svg>

<style></style>