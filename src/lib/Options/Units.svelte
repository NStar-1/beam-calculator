<script lang="ts">
  import Select, { Option } from "@smui/select";
  import { lengthUnit, LengthUnit, forceUnit, ForceUnit } from "$lib/store";
  import { _ } from "svelte-i18n";
</script>

<div class="root">
  <Select label={$_("options.config.unitoflength")} bind:value={$lengthUnit} style="width: 50%">
    {#each Object.entries(LengthUnit) as [key, value]}
      <Option value={key}>{$_(`units.${value}`)}</Option>
    {/each}
  </Select>
  <Select label={$_("options.config.unitofforce")} bind:value={$forceUnit} style="width: 50%">
    {#each Object.entries(ForceUnit) as [key, value]}
      <Option value={key}>{$_(`units.${value}`)}</Option>
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
