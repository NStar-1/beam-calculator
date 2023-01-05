<script>
    import {inertiaMoment} from "../../../store"
    import Input from "../../../Inputs/Input.svelte";
    let D = "0";
   $: console.log($inertiaMoment)
    function countInertiaMoment(){
        inertiaMoment.set(0.0491 * Math.pow(parseFloat(D), 4))
    }
</script>

<style>

</style>
<p>Diameter</p>
<Input bind:value={D} onChange={countInertiaMoment}/>
