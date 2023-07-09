<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { _ } from "svelte-i18n";
</script>

<Textfield
  type="number"
  label={$_("options.profile.height")}
  bind:value={$profileData.height}
/>
<Textfield
  type="number"
  label={$_("options.profile.width")}
  bind:value={$profileData.width}
/>
<Textfield
  type="number"
  label={$_("options.profile.thickness")}
  bind:value={$profileData.thickness}
/>
