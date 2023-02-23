<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "../../store";
  import { _ } from "svelte-i18n";
</script>

<Textfield
  type="number"
  label={$_("options.profile.rectangularTube.thickness")}
  bind:value={$profileData.thickness}
/>
<Textfield
  type="number"
  label={$_("options.profile.rectangularTube.height")}
  bind:value={$profileData.height}
/>
<Textfield
  type="number"
  label={$_("options.profile.rectangularTube.width")}
  bind:value={$profileData.width}
/>
