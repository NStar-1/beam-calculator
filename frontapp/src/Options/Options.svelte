<script>

  import { length } from "../store.ts";
  import Cut from "./Cut.svelte";
  import Fixation from "./Fixation.svelte";
  import Textfield from "@smui/textfield";
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
  import Material from "./Material.svelte";
  import LoadCases from "./LoadCases.svelte";
  import {loads} from "../store";
</script>

<Accordion>
  <Panel open>
    <Header>Beam configuration</Header>
    <Content>
      <Textfield type="number" label="Length" bind:value={$length} />
      <div style="margin: 10px 0">fixation type:</div>
      <Fixation />
    </Content>
  </Panel>
  <Panel>
    <Header>Profile</Header>
    <Content>
      <Cut />
    </Content>
  </Panel>
  <Panel>
    <Header>Material</Header>
    <Content>
      <Material />
    </Content>
  </Panel>
  <Panel>
    <Header>Load cases</Header>
    <Content>
      <LoadCases/>
    </Content>
  </Panel>
</Accordion>

<style>

</style>
