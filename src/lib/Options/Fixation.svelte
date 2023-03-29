<script>
  import { firstPoint, lastPoint } from "../store";
  import FixationDropdown from './FixationDropdown.svelte'
</script>

<div class="fixationWrapper">
  <FixationDropdown bind:value={$firstPoint.isFixed} side="left" />
  <FixationDropdown bind:value={$lastPoint.isFixed} side="right" />
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
