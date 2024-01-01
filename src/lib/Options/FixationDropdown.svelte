<script lang="ts">
  import { fixations } from "../fixations";
  import Select, { Option } from "@smui/select";
  import { t } from "$lib/translations";
  import type { FixationEnum } from "$lib/store";

  export let value: FixationEnum;
  export let side: string;
  let strVal: string;

  // Strings could only be used with Select component
  strVal= "" + value

  // Map value back
  $: value = +strVal;
</script>

<Select bind:value={strVal} label={$t(`options.config.${side}`)} style="width: 50%">
  {#each fixations as fixation}
    <Option value={"" + fixation.value}>
      {#if fixation.icon === undefined}
        <div />
        <div class="label">
          {$t(`options.config.fixType.${fixation.label}`)}
        </div>
      {:else}
        <svelte:component this={fixation.icon} width="32" height="32" viewBox="6 6 90 90"/>
        <div class="label">
          {$t(`options.config.fixType.${fixation.label}`)}
        </div>
      {/if}
    </Option>
  {/each}
</Select>

<style>
  img {
    height: 60%;
  }
  .label {
    position: absolute;
    left: 50%;
    padding: 0;
    margin: 0;
    text-align: left;
  }
</style>
