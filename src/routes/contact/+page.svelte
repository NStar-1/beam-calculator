<script>
    import Button from "@smui/button/src/Button.svelte";
    import Textfield from "@smui/textfield";
    import {_} from "svelte-i18n"

    let name = ''
</script>

<div class="contact-wrapper">
    <h2>{$_('contact.title')}</h2>
    <div>
        <div>
            <p>{$_('contact.name')}</p>
            <Textfield
                bind:value={name}
                variant="outlined"
                required
                
            />
        </div>
    </div>
    <Button variant="raised">{$_('contact.button')}</Button>
</div>

<style>
    .contact-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 24px;
        & button{
            align-self: flex-end;
        }
    }
</style>