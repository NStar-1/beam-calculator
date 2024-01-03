<script lang="ts">
  import { Icon } from "@smui/icon-button";
  export let isOpen = false
</script>

<Icon class="material-icons" on={isOpen}>{isOpen ? "expand_less" : "expand_more"}</Icon>
