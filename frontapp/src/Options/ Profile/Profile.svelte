<script>
    import {profileVal, profileInputs, inertiaMoment} from "../../store";
    import Input from "../../Inputs/Input.svelte";
    import {profC} from "../constants";
    import RoundBeam from "./Inputs/RoundBeam.svelte";
    import Pipe from "./Inputs/Pipe.svelte";

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
        {#each Object.keys(profC) as profile}
            <label on:click={()=>{inertiaMoment.set(0);profileInputs.set([])}}>
                <input type="radio" bind:group={$profileVal} name="material" class="materialInput" value={profile}/>
                <img alt={profC[profile].alt} src={profC[profile].img}>
            </label>
        {/each}
    </div>
    {$inertiaMoment}
    {#if $profileVal === "circle1"}
        <RoundBeam/>
    {:else if $profileVal === "circle2"}
        <Pipe/>
    {/if}
    <!--{#each profC[$profileVal].inputs as input, i}-->
    <!--    <Input title={input.placeholder} bind:value={$profileInputs[i]}/>-->
    <!--{/each}-->
</div>