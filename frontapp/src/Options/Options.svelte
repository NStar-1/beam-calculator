<script>
    import { Accordion, AccordionItem } from "svelte-accessible-accordion";
    import Input from '../Inputs/Input.svelte';
    import { length } from '../store.ts';

    let val = 0;
</script>

<style>
    :global([data-accordion]){
        list-style: none;
        width: 100%;
        padding: 0;
    }
    :global([data-accordion-item] button) {
        border-radius: 10px;
        border: 1px solid #ff9859;
        background: #ff9859;
        font: inherit;
        line-height: inherit;
        cursor: pointer;
        padding: 0.5rem 1rem;
        width: 100%;
        text-align: left;
        margin: 0;
        color: white;

    }
    :global([data-accordion-item] button):hover {
        background: #ff8d48;
    }
    :global([data-accordion-item] div){
        padding:10px;
    }
    :global([data-accordion-item]) {
        border-radius: 10px;
        border: 1px solid #ff9859;
        margin-bottom: 1rem;
    }
    .fixationWrapper{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        column-gap: 5px;
    }
    .fixationItem{
        border: 1px solid #ababab;
        border-radius: 10px;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    .fixationItemTitle{
        margin: 0;
        border: 1px solid #ababab;
        background-color: #ababab;
        border-radius: 8px;
        box-sizing: content-box;
        color: white;
    }
    .fixationItemContent{
        margin:5px;
    }
    .inline{
        display: flex;
        flex-direction: row;
        height: 100%;
        padding: 5px;
        justify-content: space-between;
    }
    img{
        width:80%;
    }

</style>

<Accordion>
    <AccordionItem title="Length"><Input title="type length" bind:value={$length} /></AccordionItem>
    <AccordionItem title="Fixation">
        <div class="fixationWrapper">
            <div class="fixationItem">
                <div class="fixationItemTitle">
                    left
                </div>
                <form class="fixationItemContent">
                    <div class="inline">
                        <input type="radio"/>
                        <img alt="strong" src="assets/other/svg (14).svg"/>
                    </div>
                    <div class="inline">
                        <input type="radio"/>
                        <img alt="strong" src="assets/other/svg (10).svg"/>
                    </div>
                    <div class="inline">
                        <input type="radio"/>
                        <img alt="strong" src="assets/other/svg (9).svg"/>
                    </div>
                </form>
            </div>
            <div class="fixationItem">
                <div class="fixationItemTitle">
                    right
                </div>
                <form class="fixationItemContent">
                    <div class="inline">
                        <input type="radio"/>
                        <img alt="strong" src="assets/other/svg (14).svg" style="rotate: 180deg"/>
                    </div>
                    <div class="inline">
                        <input type="radio"/>
                        <img alt="strong" src="assets/other/svg (10).svg"/>
                    </div>
                    <div class="inline">
                        <input type="radio"/>
                        <img alt="strong" src="assets/other/svg (9).svg"/>
                    </div>
                </form>
            </div>
        </div>
    </AccordionItem>
    <AccordionItem title="Title 3">Content 3</AccordionItem>
</Accordion>
