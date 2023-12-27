<script lang="ts">
  import Select, { Option } from "@smui/select";
  import { lengthUnit, LengthUnits, forceUnit, ForceUnits } from "$lib/store";
  import { _ } from "svelte-i18n";
</script>

<div class="root">
  <Select label={$_("options.config.unitoflength")} bind:value={$lengthUnit} style="width: 50%">
    {#each LengthUnits as unit}
      <Option value={unit}>{$_(`units.${unit}`)}</Option>
    {/each}
  </Select>
  <Select label={$_("options.config.unitofforce")} bind:value={$forceUnit} style="width: 50%">
    {#each ForceUnits as unit}
      <Option value={unit}>{$_(`units.${unit}`)}</Option>
    {/each}
  </Select>
</div>

<style>
  .root {
    display: flex;
    margin-bottom: 1rem;
    flex-direction: row;
    justify-content: left;
    column-gap: 5px;
    width: 100%;
  }
</style>
