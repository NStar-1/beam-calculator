<script>
    import { Accordion, AccordionItem } from "svelte-accessible-accordion";
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
        padding:1rem;
    }
    :global([data-accordion-item]) {
        border-radius: 10px;
        border: 1px solid #ff9859;
        margin-bottom: 1rem;
    }

</style>

<Accordion>
    <AccordionItem title="Title 1">Content 1</AccordionItem>
    <AccordionItem title="Title 2">Content 2</AccordionItem>
    <AccordionItem title="Title 3">Content 3</AccordionItem>
</Accordion>
