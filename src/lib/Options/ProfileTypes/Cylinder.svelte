<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { _ } from "svelte-i18n";
</script>

<Textfield
  type="number"
  label={$_("options.profile.radius")}
  bind:value={$profileData.outerRadius}
/>
