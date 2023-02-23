<script>
  import List, { Item, Separator, Text } from "@smui/list";
  import { length, loads, newEmptyLoadObj } from "../store";
  import { _ } from "svelte-i18n";
  import LoadCase from "./LoadCase.svelte";
  import LoadCaseForm from "./LoadCaseForm.svelte";
</script>

<div class="loads">
  <List>
    {#each $loads as load, i}
      <Item
        style="padding: 10px; text-align: center; justify-content: center"
      >
        <LoadCase loadId={i} />
      </Item>
    {/each}
    <Separator />
    <Item style="height:300px">
      <LoadCaseForm />
    </Item>
    <Item>
      <img
        alt="add load"
        src="../assets/other/CrossFull.svg"
        style="height:50%"
      />
    </Item>
  </List>
</div>

<style>
  .loads {
    border-top: 1px solid #c7c7c7;
  }
  .fields {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .inline {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  }
</style>
