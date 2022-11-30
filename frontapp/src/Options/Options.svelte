<script>
    import { Accordion, AccordionItem } from "svelte-accessible-accordion";
    import Input from '../Inputs/Input.svelte';
    import { length } from '../store.ts';
    import Icon from "svelte-icon";
    import Profile from "./ Profile/Profile.svelte";
    import Fixation from "./Fixation.svelte";
</script>

<style>
    :global([data-accordion]){
        list-style: none;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    :global([data-accordion-item] button) {
        border-radius: 0;
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
    :global([data-accordion-item] > div){
        padding:5%;
    }
    :global([data-accordion-item]) {

        border: 1px solid #ff9859;
        margin-bottom: 1rem;
    }


</style>

<Accordion>
    <AccordionItem  title="Length"><Input title="type length" bind:value={$length} /></AccordionItem>
    <AccordionItem  title="Fixation">
        <Fixation/>
    </AccordionItem>
    <AccordionItem title="Profile">
        <Profile/>
    </AccordionItem>
</Accordion>
