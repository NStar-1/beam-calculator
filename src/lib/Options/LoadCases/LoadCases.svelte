<script>
  import Button, { Label, Icon } from "@smui/button";
  import List, { Item, Separator } from "@smui/list";
  import LoadCase from "./LoadCase.svelte";
  import LoadCaseForm from "./LoadCaseForm.svelte";
  import { _ } from "svelte-i18n";
  import { loads } from "$lib/store";
  import { menuRoute } from "../menuRouter";
</script>

<Button on:click={() => menuRoute.set("main")}>
  <Icon class="material-icons">arrow_back</Icon>
  <Label>Back</Label>
</Button>

<div class="loads">
  <List>
    <div>
      Loads:
    </div>
    {#each $loads as _, i}
      <Item style="padding: 10px; text-align: center; justify-content: center">
        <LoadCase loadId={i} />
      </Item>
      <Separator />
    {/each}
    {#if $loads.length === 0}
      <div>
        - empty -
      </div>
    {/if}
    <div>
    New:
    </div>
    <Item ripple={false} style="height: auto;">
      <LoadCaseForm />
    </Item>
  </List>
</div>

<style>
  .loads {
  }
</style>
