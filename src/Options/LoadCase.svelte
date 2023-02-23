<script>
  import { loads } from "../store";
  export let loadId;
  const load = $loads[loadId];
  const loadTypeIcon =
    load.type === "pointed" ? "point_load_32.svg" : "distributed_load_32.svg";

  const deleteLoad = () => {
    if ($loads.length === 1) {
      $loads = [];
    } else {
      $loads =
        loadId > 0
          ? [...$loads.slice(0, loadId), ...$loads.slice(loadId + 1)]
          : [...$loads.slice(loadId + 1)];
    }
  };
</script>

<div class="loadItem">
  <img alt="load type icon" src={`../assets/icons/${loadTypeIcon}`} />
  <div>{load.node} |</div>
  <div>{load.offset} |</div>
  <div>{load.angle} |</div>
  <div>{load.load} |</div>
  <div>{load.loadValueType} |</div>
  <div on:click={deleteLoad}>X</div>
</div>

<style>
  .loadItem {
    display: flex;
    width: 100%;
  }
</style>
