<script>
  export let load;
  const loadTypeIcon = load.type === "pointed" ? "point_load_32.svg" : "distributed_load_32.svg";   
</script>

<div class="loadItem">
  <img
    alt="load type icon"
    src={`../assets/icons/${loadTypeIcon}`}
  />
  <div>{load.node}</div>
  <div>{load.offset}</div>
  <div>{load.angle}</div>
  <div>{load.load}</div>
  <div>{load.loadValueType}</div>
</div>

<style>
  .loadItem {
    display: flex;
    width: 100%;
  }

</style>
