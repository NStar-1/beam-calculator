<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { _ } from "svelte-i18n";
</script>

<Textfield
  type="number"
  label={$_("options.profile.width")}
  bind:value={$profileData.width}
/>
<Textfield
  type="number"
  label={$_("options.profile.depth")}
  bind:value={$profileData.depth}
/>
<Textfield
  type="number"
  label={$_("options.profile.flangeThickness")}
  bind:value={$profileData.flangeThickness}
/>
<Textfield
  type="number"
  label={$_("options.profile.webThickness")}
  bind:value={$profileData.webThickness}
/>
