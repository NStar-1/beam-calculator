<script>
  import { fixationType } from "../store";
  import FixationDropdown from './FixationDropdown.svelte'
</script>

<div class="fixationWrapper">
  <FixationDropdown bind:value={$fixationType.left} side="left" />
  <FixationDropdown bind:value={$fixationType.right} side="right" />
</div>

<style>
  .fixationWrapper {
    display: flex;
    margin: 0;
    flex-direction: row;
    justify-content: left;
    column-gap: 5px;
    width: 100%;
  }
</style>
