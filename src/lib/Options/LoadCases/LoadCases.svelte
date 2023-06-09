<script>
  import Button, { Label, Icon } from "@smui/button";
  import List, { Item, Separator } from "@smui/list";
  import LoadCase from "./LoadCase.svelte";
  import LoadCaseForm from "./LoadCaseForm.svelte";
  import { _ } from "svelte-i18n";
  import { loads, newEmptyLoadObj, selectedLoad } from "$lib/store";
  import { menuRoute } from "../menuRouter";
  import IconButton from "@smui/icon-button";

  function addLoad() {
    $selectedLoad = $loads.length;
    $loads = [...$loads, newEmptyLoadObj()];
  }
</script>

<Button on:click={() => menuRoute.set("main")}>
  <Icon class="material-icons">arrow_back</Icon>
  <Label>Back</Label>
</Button>

<div class="loads">
  <div class="subtitle">Loads:</div>
  {#each $loads as _, i}
    <Item
      style="padding: 10px; text-align: center; justify-content: center"
      selected={i === $selectedLoad}
      on:SMUI:action={() => ($selectedLoad = i)}
    >
      <LoadCase loadId={i} />
    </Item>
    <Separator />
  {/each}
  {#if $loads.length === 0}
    <div class="placeholder">-- empty --</div>
  {/if}
  <Button on:click={addLoad}>
    <Icon class="material-icons">add</Icon>
    <Label>Add</Label>
  </Button>

  {#if $selectedLoad !== null}
    <div class="subtitle">Editing: #{$selectedLoad}</div>
    <LoadCaseForm loadId={$selectedLoad} />
  {/if}
</div>

<style>
  .subtitle {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 0.5rem;
    text-transform: uppercase;
  }

  .placeholder {
    font-style: italic;
    font-size: 1rem;
    line-height: 1.5rem;
  }
</style>
