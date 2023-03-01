<script>
  import IconButton from "@smui/icon-button";
  import { loads, points, selectedLoad } from "../store";

  export let loadId;

  $: load = $loads[loadId];
  $: loadTypeIcon =
    load?.type === "pointed" ? "point_load_32.svg" : "distributed_load_32.svg";

  const deleteLoad = () => {
    const removeItem = (num, arr) => {
      if (arr.length === 1) {
        return [];
      }
      return num > 0
        ? [...arr.slice(0, num), ...arr.slice(num + 1)]
        : [...arr.slice(num + 1)];
    };

    $loads = removeItem(loadId, $loads);
    $points = removeItem(loadId, $points);
  };
</script>

{#if load}
  <div
    class="loadItem"
    on:click={() => {
      $selectedLoad = loadId;
      console.log("selectedLoad triggered");
    }}
  >
    <img alt="load type icon" src={`assets/icons/${loadTypeIcon}`} />
    <div>{load.node} |</div>
    <div>{load.offset} |</div>
    <div>{load.angle} |</div>
    <div>{load.load} |</div>
    <div>{load.loadValueType} |</div>
    <IconButton class="material-icons" on:click={deleteLoad}>delete</IconButton>
  </div>
{/if}

<style>
  .loadItem {
    display: flex;
    width: 100%;
  }
</style>
