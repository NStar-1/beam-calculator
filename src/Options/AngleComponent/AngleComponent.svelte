<script>
    export let angle
</script>


<svg viewBox="0 0 80 80" style="cursor: auto;">
        <g filter="url(#filter0_i_102_9)">
        <rect width="80" height="80" rx="40" fill="white"/>
        </g>
        <rect x="0.5" y="0.5" width="79" height="79" rx="39.5" stroke="#FF8D48" fill="none"/>
        <defs>
        <filter id="filter0_i_102_9" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="4"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_102_9"/>
        </filter>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto-start-reverse" fill={angle % 180 === 0? "red": "black"}>
              <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
          </defs>
        
   
    <line x1="40" y1="40" x2={40 + Math.sin(angle * Math.PI/180) * 40} y2={40 - Math.cos(angle * Math.PI/180) * 40} 
    style={`stroke: ${angle % 180 === 0? "red":"black"};stroke-width:1`}
    marker-start="url(#arrowhead)"/>
</svg>

<style>

</style>