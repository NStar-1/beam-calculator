<script>
    import {profileVal, profileInputs} from "../store";
    import Input from "../Inputs/Input.svelte";
    import {profileConst} from "./constants";
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
        {#each profileConst as material, i}
            <label on:click={()=>profileInputs.set([])}>
                <input type="radio" bind:group={$profileVal} name="material" class="materialInput" value={i}/>
                <img alt="square" src={material.src}>
            </label>
        {/each}
    </div>
    {#each profileConst[$profileVal].inputs as input, i}
        <Input title={input} bind:value={$profileInputs[i]}/>
    {/each}
</div>