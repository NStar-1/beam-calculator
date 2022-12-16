<script>
    import {fixationConst} from "./constants";
    import {fixationType} from "../store";
    import TextField from "@smui/textfield";
    import {Accordion, AccordionItem, TreeView} from "carbon-components-svelte";
    import "carbon-components-svelte/css/g10.css";

</script>

<style>
    .fixationWrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        column-gap: 5px;
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
    :global([bx--accordion__item]){
        width: 100%;
    }
</style>



<div class="fixationWrapper">
<!--    <div class="fixationItem">-->
        <Accordion size="sm">
            <div style="display: flex; flex-direction: row; width:100%">
                <AccordionItem title="Left" style="width:100%">
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
                </AccordionItem>
                <AccordionItem title="Right" style="width:100%">
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
                </AccordionItem>
            </div>

        </Accordion>

<!--        <div class="fixationItemTitle">-->
<!--            Left-->
<!--        </div>-->
<!--        <form class="fixationItemContent">-->
<!--            {#each fixationConst as fixation, i}-->
<!--                <div class="inline">-->
<!--                    <input type="radio" name="left" bind:group={$fixationType.left} value={i}/>-->
<!--                    {#if fixation.src === 'none'}-->
<!--                        <div>none</div>-->
<!--                    {:else}-->
<!--                        <img alt="strong" src={fixation.src}/>-->
<!--                    {/if}-->
<!--                </div>-->
<!--            {/each}-->
<!--        </form>-->

<!--    </div>-->
<!--    <div class="fixationItem">-->
<!--        <div class="fixationItemTitle">-->
<!--            Right-->
<!--        </div>-->
<!--        <form class="fixationItemContent">-->
<!--            {#each fixationConst as fixation, i}-->
<!--                <div class="inline">-->
<!--                    <input type="radio" name="right" bind:group={$fixationType.right} value={i}/>-->
<!--                    {#if fixation.src === 'none'}-->
<!--                        <div>none</div>-->
<!--                    {:else}-->
<!--                        <img alt="strong" src={fixation.src} style="transform: scaleX(-1)"/>-->
<!--                    {/if}-->
<!--                </div>-->
<!--            {/each}-->
<!--        </form>-->
<!--    </div>-->
</div>