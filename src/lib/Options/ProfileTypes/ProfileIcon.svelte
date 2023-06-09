<script>
  import { profileType, profileNamesLnKeys } from "$lib/store";
</script>

<svelte:component this={profileNamesLnKeys[$profileType].icon} />

<style>
  .profileIcon {
    max-width: 80%;
    max-height: 80%;
  }
</style>
