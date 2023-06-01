<script lang="ts">
  import MainMenu from "./MainMenu.svelte";
  import LoadCases from "./LoadCases/LoadCases.svelte";
  import { menuRoute } from "./menuRouter"
</script>

{#if $menuRoute === "main"}
  <MainMenu />
{:else}
  <LoadCases />
{/if}
