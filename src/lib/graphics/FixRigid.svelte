<script lang="ts">
  import ImgFixed from "$lib/assets/fixations/fixed.svg?component";
  export let x: number;
  export let y: number;
  export let orientation: "left" | "right";
</script>

<ImgFixed
  x={-52 + x}
  y={-50 + y}
  width={120}
  height={120}
  transform="rotate({orientation === 'right' ? 180 : 0}, {x}, {y})"
/>
