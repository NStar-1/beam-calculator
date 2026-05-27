<script lang="ts">
  import ImgRoller from "$lib/assets/fixations/roller.svg?component";
  export let x: number;
  export let y: number;
  export let orientation: "left" | "right";
</script>

<ImgRoller x={-40 + x} y={-8 + y} width={80} height={80} viewBox="0 0 96 96" />
