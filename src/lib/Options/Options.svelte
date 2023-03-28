<script lang="ts">
  import { length, profileInfo, material, loads, solve_model } from "../store";
  import Cut from "./Cut.svelte";
  import Fixation from "./Fixation.svelte";
  import Textfield from "@smui/textfield";
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import { Icon } from "@smui/icon-button";
  import Button from "@smui/button";
  import Material from "./Material.svelte";
  import LoadCases from "./LoadCases/LoadCases.svelte";
  import OptionTitle from "./OptionTitle.svelte";
  import { _ } from "svelte-i18n";
  import ProfileIcon from "./ProfileTypes/ProfileIcon.svelte";
  import validate from "../../utils/validation";
  import { createLengthRules } from "./validators";
  import HelperText from "@smui/textfield/helper-text";

  import type { ValidationResult } from "../../utils/validation";

  let panel1Open = true;
  let panel2Open = false;
  let panel3Open = false;
  let panel4Open = false;

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
        required
        invalid={!lengthValidation.valid}
        on:blur={validateLength}
      >
        <HelperText validationMsg slot="helper"
          >{lengthValidation.errors.join(", ")}</HelperText
        >
      </Textfield>
      />
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
      <OptionTitle title={$_("options.load.title")}
        ><span slot="info">{`n=${$loads.length || 0}`}</span></OptionTitle
      >
      <div class="toggleIcon">
        {#if panel3Open}
          <Icon class="material-icons" on>expand_less</Icon>
        {:else}
          <Icon class="material-icons">expand_more</Icon>
        {/if}
      </div>
    </Header>
    <Content style="padding: 0;">
      <LoadCases />
    </Content>
  </Panel>
</Accordion>
<Button on:click={solve_model}>Calculate</Button>

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
