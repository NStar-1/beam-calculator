<script>
    import {fixationConst} from "./constants";
    import "@smui/select"
    import Select, {Option} from "@smui/select";
    import {fixationType} from "../store";
    import {_} from "svelte-i18n";
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
        position: absolute;
        left: 50%;
        padding: 0;
        margin: 0;
        text-align: left;
    }
</style>



<div class="fixationWrapper">
    <Select bind:value={$fixationType.left} label={$_('options.config.left')} style="width: 50%">
        {#each fixationConst as fixation, i}
            <Option value={i} >
                {#if fixation.src === 'none'}
                    <div></div>
                    <div class="label">{$_(`options.config.fixType.${fixation.desc}`)}</div>
                {:else}
                    <img alt={$_(`options.config.fixType.${fixation.desc}`)} src={fixation.src}/>
                    <div class="label">{$_(`options.config.fixType.${fixation.desc}`)}</div>
                {/if}
            </Option>
        {/each}

    </Select>
    <Select bind:value={$fixationType.right} label={$_('options.config.right')} style="width: 50%">
        {#each fixationConst as fixation, i}
            <Option value={i}  >
                {#if fixation.src === 'none'}
                    <div></div>
                    <div class="label">{$_(`options.config.fixType.${fixation.desc}`)}</div>
                {:else}
                    <img alt={$_(`options.config.fixType.${fixation.desc}`)} src={fixation.src} style={fixation.desc === "fixed end"?"transform: scaleX(-1)":null}/>
                    <div class="label">{$_(`options.config.fixType.${fixation.desc}`)}</div>
                {/if}
            </Option>
        {/each}
    </Select>
</div>