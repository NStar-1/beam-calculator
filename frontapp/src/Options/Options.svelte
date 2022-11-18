<script>
    import { Accordion, AccordionItem } from "svelte-accessible-accordion";
    import Input from '../Inputs/Input.svelte';
</script>

<style>
    :global([data-accordion]){
        list-style: none;
        width: 100%;
        padding: 0;
    }
    :global([data-accordion-item] button) {

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
        padding: 0;
        height: 100%;
        width: 100%;
    }
    .fixationItemTitle{
        margin: 0;
        border: 1px solid #ababab;
        background-color: #ababab;
        text-align: center;
        font-weight: bold;
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
    <AccordionItem title="Length"><Input title="type length"/></AccordionItem>
    <AccordionItem title="Fixation">
        <div class="fixationWrapper">
            <div class="fixationItem">
                <div class="fixationItemTitle">
                    Left
                </div>
                <form class="fixationItemContent">
                    <div class="inline">
                        <input type="radio" name="left"/>
                        <img alt="strong" src="assets/other/svg (14).svg"/>
                    </div>
                    <div class="inline">
                        <input type="radio" name="left"/>
                        <img alt="strong" src="assets/other/svg (10).svg"/>
                    </div>
                    <div class="inline">
                        <input type="radio" name="left"/>
                        <img alt="strong" src="assets/other/svg (9).svg"/>
                    </div>
                </form>
            </div>
            <div class="fixationItem">
                <div class="fixationItemTitle">
                    Right
                </div>
                <form class="fixationItemContent">
                    <div class="inline">
                        <input type="radio" name="right"/>
                        <img alt="strong" src="assets/other/svg (14).svg" style="transform: scaleX(-1)"/>
                    </div>
                    <div class="inline">
                        <input type="radio" name="right"/>
                        <img alt="strong" src="assets/other/svg (10).svg"/>
                    </div>
                    <div class="inline">
                        <input type="radio" name="right"/>
                        <img alt="strong" src="assets/other/svg (9).svg"/>
                    </div>
                </form>
            </div>
        </div>
    </AccordionItem>
    <AccordionItem title="Title 3">Content 3</AccordionItem>
</Accordion>
