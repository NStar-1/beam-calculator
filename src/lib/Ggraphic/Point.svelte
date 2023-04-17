<script lang="ts">
  export let x = 0
  export let y = 0
</script>

<g transform="translate({x}, {y})">
  <circle class="outer" r="8" cx="0" cy="0"/>
  <circle r="3" cx="0" cy="0"/>
</g>

<style>
circle {
  stroke: blue;
  stroke-width: 2px;
  fill: blue;
}
.outer {
  fill: none;
}
</style>
