<script>
  import { length } from "../store";
  import Cut from "./Cut.svelte";
  import Fixation from "./Fixation.svelte";
  import Textfield from "@smui/textfield";
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import Material from "./Material.svelte";
  import LoadCases from "./LoadCases.svelte";
  import { _ } from "svelte-i18n";
  console.log(
    document.getElementsByClassName(".smui-accordion__header__title")
  );
</script>

<Accordion>
  <Panel open>
    <Header>{$_("options.config.title")}</Header>
    <Content>
      <Textfield
        type="number"
        label={$_("options.config.length")}
        bind:value={$length}
      />
      <div style="margin: 10px 0">{$_("options.config.fixType.title")}</div>
      <Fixation />
    </Content>
  </Panel>
  <Panel>
    <Header>{$_("options.profile.title")}</Header>
    <Content>
      <Cut />
    </Content>
  </Panel>
  <Panel>
    <Header>{$_("options.material.title")}</Header>
    <Content>
      <Material />
    </Content>
  </Panel>
  <Panel>
    <Header>{$_("options.load.title")}</Header>
    <Content>
      <LoadCases />
    </Content>
  </Panel>
</Accordion>

<style>
  :global(.smui-accordion__header__title) {
    padding: 10px 15px;
  }
</style>
