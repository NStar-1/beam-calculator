<script>
    import {afterUpdate} from "svelte";
    export let title;
    export let value = '';
    console.log(value)
</script>

<style>
    input{
        border: 2px solid #ababab;
        width: 100%;
        outline:none;
    }
    input:focus-visible {
        border-color: #656565;
    }
</style>

<input placeholder={title} bind:value={value}/>
