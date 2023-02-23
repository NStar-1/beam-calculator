<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "../../store";
  import { _ } from "svelte-i18n";
</script>

<Textfield
  type="number"
  label={$_("options.profile.iBeam.flangeThickness")}
  bind:value={$profileData.flangeThickness}
/>
<Textfield
  type="number"
  label={$_("options.profile.iBeam.webThickness")}
  bind:value={$profileData.webThickness}
/>
<Textfield
  type="number"
  label={$_("options.profile.iBeam.width")}
  bind:value={$profileData.width}
/>
<Textfield
  type="number"
  label={$_("options.profile.iBeam.depth")}
  bind:value={$profileData.depth}
/>
