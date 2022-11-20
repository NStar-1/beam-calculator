<script>

    import {cutVal, cutInputs} from "../store";
    import Input from "../Inputs/Input.svelte";
    import {cutConst} from "./constants";
</script>

<style>
    .materialInput{
        display: none;
    }
    .inline{
        padding: 0;
        display: flex;
        flex-direction: row;
        height: 100%;
        justify-content: space-between;
    }

    .materialInput:checked + img{
        border: 3px solid #ff9859;
    }

    .materialInput + img {
        padding: 2px;
        width: 90%;
        border: 3px solid #ababab;
    }

    .column{
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
</style>

<div class="column">
    <div class="inline" style="column-gap: 3%;">
        {#each cutConst as material, i}
            <label on:click={()=>cutInputs.set([])}>
                <input type="radio" bind:group={$cutVal} name="material" class="materialInput" value={i}/>
                <img alt="square" src={material.src}>
            </label>
        {/each}
    </div>
    {#each cutConst[$cutVal].inputs as input, i}
        <Input title={input} bind:value={$cutInputs[i]}/>
    {/each}
</div>