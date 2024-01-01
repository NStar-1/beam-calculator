<script lang="ts">
  import IconButton from "@smui/icon-button";
  import { loads, selectedLoad } from "../../store";
  import { shiftNode } from "$lib/store-utils";
  import IconPointLoad from "$lib/assets/icons/pointLoad.svg?component";
  import { t } from "$lib/translations";

  export let loadId: number;

  $: load = $loads[loadId];
  // TODO Other load types
  $: loadTypeIcon = "point_load_32.svg"; // : "distributed_load_32.svg";

  const deleteLoad = (evt: Event) => {
    evt.stopPropagation();

    const removeItem = (num: number, arr: any[]) => {
      if (arr.length === 1) {
        return [];
      }

      if (num === 0 && (arr[num].id === 1 || arr[num].node === 1)) {
        return arr.slice(1);
      }

      if (num === arr.length - 1) {
        return arr.slice(0, -1);
      }

      return num > 0
        ? [...arr.slice(0, num), ...arr.slice(num + 1).map(shiftNode)]
        : [...arr.slice(num + 1).map(shiftNode)];
    };

    $loads = removeItem(loadId, $loads);

    if ($loads.length === 0) {
      $selectedLoad = null;
    } else if ($selectedLoad === loadId) {
      $selectedLoad -= 1;
    }
  };
</script>

{#if load}
  <div class="loadItem" on:click={() => ($selectedLoad = loadId)}>
    <IconPointLoad />
    <div>#{loadId} |</div>
    <div>{load.offset} |</div>
    <div>{load.angle} |</div>
    <div>{load.value} |</div>
    <IconButton title="{$t('options.loadCaseForm.delete')}" class="material-icons" on:click={deleteLoad}>delete</IconButton>
  </div>
{/if}

<style>
  .loadItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
