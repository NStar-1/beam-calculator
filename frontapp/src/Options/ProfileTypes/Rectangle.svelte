<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "../../store";
  import { _ } from "svelte-i18n";
</script>

<Textfield
  type="number"
  label={$_("options.profile.rectangle.height")}
  bind:value={$profileData.thickness}
/>
<Textfield
  type="number"
  label={$_("options.profile.rectangle.width")}
  bind:value={$profileData.height}
/>
