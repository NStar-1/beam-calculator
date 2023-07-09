<script>
  import { profileType, profileNamesLnKeys } from "$lib/store";
</script>

<svelte:component this={profileNamesLnKeys[$profileType].icon} />
