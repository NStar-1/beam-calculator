<script>
  import { length, profileInfo, material, loads } from "../store";
  import Cut from "./Cut.svelte";
  import Fixation from "./Fixation.svelte";
  import Textfield from "@smui/textfield";
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import { Icon } from "@smui/icon-button";
  import Material from "./Material.svelte";
  import LoadCases from "./LoadCases.svelte";
  import OptionTitle from "./OptionTitle.svelte";
  import { _ } from "svelte-i18n";
  import ProfileIcon from "./ProfileTypes/ProfileIcon.svelte";
  console.log(
    document.getElementsByClassName(".smui-accordion__header__title")
  );

  let panel1Open = true;
  let panel2Open = false;
  let panel3Open = false;
  let panel4Open = false;
</script>

<Accordion>
  <Panel bind:open={panel1Open}>
    <Header>
      <OptionTitle title={$_("options.config.title")}>
        <span slot="info"
          >{!Number.isNaN($length.valueOf()) && `l=${$length}`}</span
        >
      </OptionTitle>
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
      <OptionTitle title={$_("options.profile.title")}
        ><div class="profileIcon" slot="icon"><ProfileIcon /></div>
        <span style="font-style: italic;" slot="info">{$profileInfo}</span>
      </OptionTitle>
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
      <OptionTitle title={$_("options.material.title")}
        ><span slot="info">{$material.name}</span></OptionTitle
      >
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
      <OptionTitle title={$_("options.load.title")} />
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

  .profileIcon {
    width: 30px;
  }
</style>
