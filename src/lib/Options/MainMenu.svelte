<script lang="ts">
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import Cut from "./Cut.svelte";
  import Fixation from "./Fixation.svelte";
  import HelperText from "@smui/textfield/helper-text";
  import Material from "./Material.svelte";
  import OptionTitle from "./OptionTitle.svelte";
  import ProfileIcon from "./ProfileTypes/ProfileIcon.svelte";
  import Textfield from "@smui/textfield";
  import Toggler from "./Toggler.svelte";
  import validate from "../../utils/validation";
  import { Icon } from "@smui/icon-button";
  import { _ } from "svelte-i18n";
  import { createLengthRules } from "./validators";
  import { length, profileInfo, material, loads } from "../store";
  import { menuRoute } from "./menuRouter"

  import type { ValidationResult } from "../../utils/validation";

  let panel1Open = true;
  let panel2Open = false;
  let panel3Open = false;

  let lengthValidation: ValidationResult = { valid: true, errors: [] };

  const validateLength = () => {
    lengthValidation = validate(
      createLengthRules(
        $loads && $loads.length > 0 ? $loads[$loads.length - 1].offset : -1
      ),
      $length
    );
  };
</script>

<Accordion>
  <Panel bind:open={panel1Open}>
    <Header>
      <OptionTitle title={$_("options.config.title")}>
        <span slot="info"
          >{!Number.isNaN($length.valueOf()) && `l=${$length}`}</span
        >
      </OptionTitle>
      <Toggler isOpen={panel1Open} slot="icon" />
    </Header>
    <Content>
      <Textfield
        type="number"
        label={$_("options.config.length")}
        bind:value={$length}
        required
        invalid={!lengthValidation.valid}
        on:blur={validateLength}
        variant="outlined"
      >
        <HelperText validationMsg slot="helper"
          >{lengthValidation.errors.join(", ")}</HelperText
        >
      </Textfield>
      <div style="margin: 10px 0">{$_("options.config.fixType.title")}</div>
      <Fixation />
    </Content>
  </Panel>
  <Panel bind:open={panel2Open}>
    <Header>
      <OptionTitle title={$_("options.profile.title")}
        ><div class="profileIcon" slot="icon"><ProfileIcon /></div>
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
      <OptionTitle title={$_("options.material.title")}
        ><span slot="info">{$material.name}</span></OptionTitle
      >
      <Toggler isOpen={panel3Open} slot="icon" />
    </Header>
    <Content>
      <Material />
    </Content>
  </Panel>
  <Panel>
    <Header on:click={() => menuRoute.set("loads")}>
      <OptionTitle title={$_("options.load.title")}
        ><span slot="info">{`n=${$loads.length || 0}`}</span></OptionTitle
      >
      <Icon slot="icon" class="material-icons">arrow_forward</Icon>
    </Header>
  </Panel>
</Accordion>

<style>
  :global(.smui-accordion__header__title) {
    padding: 10px 15px;
  }

  .profileIcon {
    width: 30px;
  }
</style>
