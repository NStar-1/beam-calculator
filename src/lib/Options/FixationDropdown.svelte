<script lang="ts">
  import { fixations } from "../fixations";
  import {
    applyExternalChange,
    applyUserChange,
    createFixationSync,
  } from "./fixationSync";
  import Select, { Option } from "@smui/select";
  import { t } from "$lib/translations";
  import type { FixationEnum } from "$lib/store";

  export let value: FixationEnum;
  export let side: string;

  // The decision rules live in fixationSync.ts. The `value !== sync.lastPushed`
  // guard keeps a change the user made from remounting the select they are
  // using: applyUserChange() already recorded it as pushed out.
  let sync = createFixationSync(value);

  $: if (value !== sync.lastPushed) {
    sync = applyExternalChange(sync, value);
  }

  function handleChange(event: CustomEvent<{ value: string; index: number }>) {
    const next = +event.detail.value as FixationEnum;
    sync = applyUserChange(sync, next);
    value = next;
  }
</script>

{#key sync.selectKey}
  <!--
    The value must stay derived from sync.lastPushed: Svelte re-sends a
    computed prop whenever `sync` changes identity, and SMUI pushes any value
    it receives into MDC, which emits a change event for it. A stored string
    lagging one step behind would make the select undo the user's selection.
  -->
  <Select
    value={"" + sync.lastPushed}
    on:SMUISelect:change={handleChange}
    label={$t(`options.config.${side}`)}
    style="width: 50%"
  >
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
{/key}

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
