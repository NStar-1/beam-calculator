<script>
    import {fixationConst} from "./constants";
    import {fixationType} from "../store";

</script>

<style>
    .fixationWrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        column-gap: 5px;
    }
    .fixationItem{
        border: 1px solid #ababab;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    .fixationItemTitle{
        margin: 0;
        padding: 10px;
        border: 1px solid #ababab;
        background-color: #ababab;
        text-align: center;
        font-weight: bold;
        box-sizing: content-box;
        color: white;
    }
    .fixationItemContent{
        margin:5px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
    .inline{
        padding: 0;
        display: flex;
        flex-direction: row;
        height: 100%;
        column-gap: 10px;
    }
    img{
        width:80%;
    }
</style>


<div class="fixationWrapper">
    <div class="fixationItem">
        <div class="fixationItemTitle">
            Left
        </div>
        <form class="fixationItemContent">
            {#each fixationConst as fixation, i}
                <div class="inline">
                    <input type="radio" name="left" bind:group={$fixationType.left} value={i}/>
                    {#if fixation.src === 'none'}
                            <div>none</div>
                        {:else}
                            <img alt="strong" src={fixation.src}/>
                        {/if}
                </div>
            {/each}
        </form>
    </div>
    <div class="fixationItem">
        <div class="fixationItemTitle">
            Right
        </div>
        <form class="fixationItemContent">
            {#each fixationConst as fixation, i}
                <div class="inline">
                    <input type="radio" name="right" bind:group={$fixationType.right} value={i}/>
                    {#if fixation.src === 'none'}
                        <div>none</div>
                    {:else}
                        <img alt="strong" src={fixation.src} style="transform: scaleX(-1)"/>
                    {/if}
                </div>
            {/each}
        </form>
    </div>
</div>