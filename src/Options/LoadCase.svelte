<script>
  import IconButton from "@smui/icon-button";
  import { loads, points, selectedLoad } from "../store";

  export let loadId;

  $: load = $loads[loadId];
  $: loadTypeIcon =
    load?.type === "pointed" ? "point_load_32.svg" : "distributed_load_32.svg";

  const deleteLoad = (evt) => {
    evt.stopPropagation();

    const removeItem = (num, arr) => {
      if (arr.length === 1) {
        return [];
      }
      const shiftNodes = (el) => {
        if (el.id) {
          el.id = el.id - 1;
        } else {
          el.node = el.node - 1;
        }
        return el;
      };

      return num > 0
        ? [...arr.slice(0, num), ...arr.slice(num + 1).map(shiftNodes)]
        : [...arr.slice(num + 1).map(shiftNodes)];
    };

    $loads = removeItem(loadId, $loads);
    $points = removeItem(loadId, $points);

    if ($loads.length === 0) {
      $selectedLoad = -1;
    }
    console.log($loads);
    console.log($points);
  };
</script>

{#if load}
  <div class="loadItem">
    <img alt="load type icon" src={`assets/icons/${loadTypeIcon}`} />
    <div>#{load.node - 1} |</div>
    <div>{load.offset} |</div>
    <div>{load.angle} |</div>
    <div>{load.load} |</div>
    <div>{load.loadValueType} |</div>
    <IconButton class="material-icons" on:click={() => ($selectedLoad = loadId)}
      >edit</IconButton
    >
    <IconButton class="material-icons" on:click={deleteLoad}>delete</IconButton>
  </div>
{/if}

<style>
  .loadItem {
    display: flex;
    width: 100%;
  }
</style>
