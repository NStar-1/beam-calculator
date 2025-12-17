<script lang="ts">
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import Cut from "./Cut.svelte";
  import Material from "./Material.svelte";
  import OptionTitle from "./OptionTitle.svelte";
  import ProfileIcon from "./ProfileTypes/ProfileIcon.svelte";
  import Toggler from "./Toggler.svelte";
  import { Icon } from "@smui/icon-button";
  import { t } from "$lib/translations";
  import { length, lengthUnit, profileInfo, material, loads } from "../store";
  import { menuRoute } from "./menuRouter";
  import BeamConfig from "./BeamConfig.svelte";

  let panel1Open = true;
  let panel2Open = false;
  let panel3Open = false;
  $: lengthUnitName = $t("units." + $lengthUnit);
</script>

<Accordion>
  <Panel bind:open={panel1Open}>
    <Header>
      <OptionTitle title={$t("options.config.title")}>
        <span slot="info">
          {!Number.isNaN($length.valueOf()) &&
            `l=${$length.toLocaleString()}${lengthUnitName}`}
        </span>
      </OptionTitle>
      <Toggler isOpen={panel1Open} slot="icon" />
    </Header>
    <Content>
      <BeamConfig />
    </Content>
  </Panel>
  <Panel bind:open={panel2Open}>
    <Header>
      <OptionTitle title={$t("options.profile.title")}>
        <div class="profileIcon" slot="icon">
          <ProfileIcon />
        </div>
        <span slot="info">{$profileInfo}</span>
      </OptionTitle>
      <Toggler isOpen={panel2Open} slot="icon" />
    </Header>
    <Content>
      <Cut />
    </Content>
  </Panel>
  <Panel bind:open={panel3Open}>
    <Header>
      <OptionTitle title={$t("options.material.title")}>
        <span slot="info">{$material.name}</span>
      </OptionTitle>
      <Toggler isOpen={panel3Open} slot="icon" />
    </Header>
    <Content>
      <Material />
    </Content>
  </Panel>
  <Panel>
    <Header on:click={() => menuRoute.set("loads")}>
      <OptionTitle title={$t("options.load.title")}>
        <span slot="info">{`n=${$loads.length || 0}`}</span>
      </OptionTitle>
      <Icon slot="icon" class="material-icons">arrow_forward</Icon>
    </Header>
  </Panel>
</Accordion>

<style>
  :global(.smui-accordion__header__title) {
    padding: 10px 15px;
  }

  .profileIcon {
    margin-right: 8px;
    margin-top: -4px;
  }
</style>
