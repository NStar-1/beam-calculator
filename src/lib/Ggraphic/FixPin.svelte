<script lang="ts">
  import ImgPin from "$lib/assets/fixations/pin.svg?component";
  export let x: number;
  export let y: number;
  export let orientation: "left" | "right";
</script>

<ImgPin x={-40 + x} y={-13 + y} width={80} height={80} viewBox="0 0 96 96" />
