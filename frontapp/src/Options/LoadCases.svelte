<script>
    import List, { Item, Separator, Text } from '@smui/list';
    import { length, loads, newEmptyLoadObj} from "../store";
    import Select, { Option } from '@smui/select';
    import Textfield from "@smui/textfield";
    let active = ""
    let nodes = [1, 2]
</script>

<style>
    .loads{
        border: 1px solid #c7c7c7;
        box-shadow: 0 0 10px #c7c7c7;
        margin-bottom: 20px;
    }
    .fields{
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
    .inline{
        display: flex;
        flex-direction: row;
        column-gap: 10px;
    }
</style>


<div class="loads">
    <List>
        {#each $loads as load, i}
            <Item on:SMUI:action={() => {active = i}} style="padding: 10px; text-align: center; justify-content: center">
                <Text>{load.type + " | " + i}</Text>
                <img alt="remove" src="../assets/other/close.svg" style="height:30%; position:fixed; right:10px" on:click={()=>{$loads.splice(i, 1); active=""}}/>
            </Item>
        {/each}
        <Separator/>
        <Item on:SMUI:action={() => {loads.set([...$loads, newEmptyLoadObj()]); return active=$loads.length-1}} style="padding: 10px; text-align: center; justify-content: center">
            <img alt="add load" src="../assets/other/CrossFull.svg" style="height:50%"/>
        </Item>
    </List>
</div>

{#if active !== ""}

    <div class="fields">
        <Select variant="outlined" bind:value={$loads[active].type} label="type" style="width:100%"  on:click={()=>{console.log($loads)}} >
            <Option value="pointed">pointed</Option>
            <Option value="distributed">distributed</Option>
        </Select>
        {#if $loads[active].type==='pointed'}
        <Select label="node" bind:value={$loads[active].x[0]}>
            {#each nodes as node}
                <Option>
                    <Text>
                        {node}
                    </Text>
                </Option>
            {/each}
        </Select>
        {:else}
            <div class="inline">
                <Select style="width:50%" label="start node" bind:value={$loads[active].x[0]}>
                    {#each nodes as node}
                        <Option>
                            <Text>
                                {node}
                            </Text>
                        </Option>
                    {/each}
                </Select>
                <Select style="width:50%" label="end node" bind:value={$loads[active].x[1]}>
                    {#each nodes as node}
                        <Option>
                            <Text>
                                {node}
                            </Text>
                        </Option>
                    {/each}
                </Select>
            </div>
        {/if}
    </div>
    <div class="inline">
        <Textfield type="number" label="angle" bind:value={$loads[active].angle} />
        <Textfield type="number" label="force" bind:value={$loads[active].force} />
    </div>

{/if}
