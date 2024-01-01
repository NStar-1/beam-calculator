<script lang="ts">
  import Select, { Option } from "@smui/select";
  import { lengthUnit, LengthUnits, forceUnit, ForceUnits } from "$lib/store";
  import { t } from "$lib/translations";
</script>

<div class="root">
  <Select label={$t("options.config.unitoflength")} bind:value={$lengthUnit} style="width: 50%">
    {#each LengthUnits as unit}
      <Option value={unit}>{$t(`units.${unit}`)}</Option>
    {/each}
  </Select>
  <Select label={$t("options.config.unitofforce")} bind:value={$forceUnit} style="width: 50%">
    {#each ForceUnits as unit}
      <Option value={unit}>{$t(`units.${unit}`)}</Option>
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
