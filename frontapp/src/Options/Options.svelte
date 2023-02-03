<script>
  import { length } from "../store";
  import Cut from "./Cut.svelte";
  import Fixation from "./Fixation.svelte";
  import Textfield from "@smui/textfield";
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import IconButton, { Icon } from "@smui/icon-button";
  import Material from "./Material.svelte";
  import LoadCases from "./LoadCases.svelte";
  import { _ } from "svelte-i18n";
  console.log(
    document.getElementsByClassName(".smui-accordion__header__title")
  );

  let panel1Open = true;
  let panel2Open = false;
  let panel3Open = false;
  let panel4Open = false;
</script>

<Accordion multiple>
  <Panel bind:open={panel1Open}>
    <Header>
      {$_("options.config.title")}
      <div class="toggleIcon">
        {#if panel1Open}
          <Icon class="material-icons" on>expand_less</Icon>
        {:else}
          <Icon class="material-icons">expand_more</Icon>
        {/if}
      </div>
    </Header>
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
  <Panel bind:open={panel2Open}>
    <Header>
      {$_("options.profile.title")}
      <div class="toggleIcon">
        {#if panel2Open}
          <Icon class="material-icons" on>expand_less</Icon>
        {:else}
          <Icon class="material-icons">expand_more</Icon>
        {/if}
      </div>
    </Header>
    <Content>
      <Cut />
    </Content>
  </Panel>
  <Panel bind:open={panel3Open}>
    <Header>
      {$_("options.material.title")}
      <div class="toggleIcon">
        {#if panel3Open}
          <Icon class="material-icons" on>expand_less</Icon>
        {:else}
          <Icon class="material-icons">expand_more</Icon>
        {/if}
      </div>
    </Header>
    <Content>
      <Material />
    </Content>
  </Panel>
  <Panel bind:open={panel4Open}>
    <Header>
      {$_("options.load.title")}
      <div class="toggleIcon">
        {#if panel3Open}
          <Icon class="material-icons" on>expand_less</Icon>
        {:else}
          <Icon class="material-icons">expand_more</Icon>
        {/if}
      </div>
    </Header>
    <Content>
      <LoadCases />
    </Content>
  </Panel>
</Accordion>

<style>
  :global(.smui-accordion__header__title) {
    padding: 10px 15px;
  }
  
  .toggleIcon {
    float: right;
  }
</style>
