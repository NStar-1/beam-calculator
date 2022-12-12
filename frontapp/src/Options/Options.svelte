<script>
  import { length } from "../store.ts";
  import Cut from "./Cut.svelte";
  import Fixation from "./Fixation.svelte";
  import Textfield from "@smui/textfield";
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
  import Material from "./Material.svelte";
</script>

<Accordion>
  <Panel>
    <Header>Length</Header>
    <Content>
      <Textfield type="number" label="Length" bind:value={$length} />
    </Content>
  </Panel>
  <Panel>
    <Header>Fixation</Header>
    <Content>
      <Fixation />
    </Content>
  </Panel>
  <Panel>
    <Header>Cut</Header>
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
</Accordion>

<style>
  :global([data-accordion]) {
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
  :global([data-accordion-item] > div) {
    padding: 5%;
  }
  :global([data-accordion-item]) {
    border: 1px solid #ff9859;
    margin-bottom: 1rem;
  }
</style>
