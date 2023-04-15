<script>
  import List, { Item, Separator, Text } from "@smui/list";
  import { loads } from "../../store";
  import { _ } from "svelte-i18n";
  import LoadCase from "./LoadCase.svelte";
  import LoadCaseForm from "./LoadCaseForm.svelte";
</script>

<div class="loads">
  <List>
    {#each $loads as _, i}
      <Item
        style="padding: 10px; text-align: center; justify-content: center"
      >
        <LoadCase loadId={i} />
      </Item>
      <Separator />
    {/each}
    <Item ripple={false} style="height: auto;">
      <LoadCaseForm />
    </Item>
  </List>
</div>

<style>
  .loads {
    border-top: 1px solid #c7c7c7;
  }
</style>
