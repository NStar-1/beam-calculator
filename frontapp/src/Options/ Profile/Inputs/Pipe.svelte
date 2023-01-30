<script>
  import { inertiaMoment } from "../../../store";
  import Input from "../../../Inputs/Input.svelte";
  let D = "0";
  let innerD = "0";
  $: console.log($inertiaMoment);
  function countInertiaMoment() {
    inertiaMoment.set(
      0.0491 * (Math.pow(parseFloat(D), 4) - Math.pow(parseFloat(innerD), 4))
    );
  }
</script>

<p>Outer diameter</p>
<Input bind:value={D} onChange={countInertiaMoment} />
<p>Inner diameter</p>
<Input bind:value={innerD} onChange={countInertiaMoment} />

<style>
</style>
