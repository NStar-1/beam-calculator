<script>
  import Button, { Label, Icon } from "@smui/button";
  import List, { Item, Separator } from "@smui/list";
  import LoadCase from "./LoadCase.svelte";
  import LoadCaseForm from "./LoadCaseForm.svelte";
  import { _ } from "svelte-i18n";
  import { loads, newEmptyLoadObj, selectedLoad } from "$lib/store";
  import { menuRoute } from "../menuRouter";

  $selectedLoad = $loads.length > 0 ? 0 : null;

  function addLoad() {
    $selectedLoad = $loads.length;
    $loads = [...$loads, newEmptyLoadObj()];
  }

  function onGoBack() {
    selectedLoad.set(null);
    menuRoute.set("main");
  }
</script>

<!-- TODO replace with paper -->
<div class="smui-paper smui-paper--raised smui-paper--elevation-z1">
  <Button on:click={onGoBack}>
    <Icon class="material-icons">arrow_back</Icon>
    <Label>{$_("options.loadCaseForm.back")}</Label>
  </Button>

  <div class="loads ">
    <div class="subtitle">{$_("options.loadCaseForm.loads")}:</div>
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
      <Label>{$_("options.loadCaseForm.add")}</Label>
    </Button>

    {#if $selectedLoad !== null}
      <div class="subtitle">{$_("options.loadCaseForm.editing")}: #{$selectedLoad}</div>
      <LoadCaseForm loadId={$selectedLoad} />
    {/if}
  </div>
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
