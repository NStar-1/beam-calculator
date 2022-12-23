<script>
    import {fixationConst} from "./constants";
    import "@smui/select"
    import Select, {Option} from "@smui/select";
    //make var in the store to store it :)
    let leftIndex
    let rightIndex

</script>

<style>
    .fixationWrapper{
        display: flex;
        margin: 0;
        flex-direction: row;
        justify-content: left;
        column-gap: 5px;
        width: 100%;
    }
    img{
        height: 60%;
    }
    .label{
        padding: 0;
        margin: 0;
        text-align: left;
    }
</style>



<div class="fixationWrapper">
    <Select bind:value={leftIndex} label="Left" style="width: 50%">
        {#each fixationConst as fixation, i}
            <Option value={i} >
                {#if fixation.src === 'none'}
                    <div></div>
                    <div class="label">{fixation.desc}</div>
                {:else}
                    <img alt={fixation.desc} src={fixation.src}/>
                    <div class="label">{fixation.desc}</div>
                {/if}
            </Option>
        {/each}

    </Select>
    <Select bind:value={rightIndex} label="Right" style="width: 50%">
        {#each fixationConst as fixation, i}
            <Option value={i}  >
                {#if fixation.src === 'none'}
                    <div></div>
                    <div class="label">{fixation.desc}</div>
                {:else}
                    <img alt={fixation.desc} src={fixation.src} style={fixation.desc === "fixed end"?"transform: scaleX(-1)":null}/>
                    <div class="label">{fixation.desc}</div>
                {/if}
            </Option>
        {/each}
    </Select>
</div>