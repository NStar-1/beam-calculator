<script lang="ts">
  import { Icon } from "@smui/icon-button";
  export let isOpen = false
</script>

{#if isOpen}
  <Icon class="material-icons" on>expand_less</Icon>
{:else}
  <Icon class="material-icons">expand_more</Icon>
{/if}
