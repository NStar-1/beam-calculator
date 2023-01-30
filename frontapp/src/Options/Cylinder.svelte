<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "../store.ts";
  import { _ } from "svelte-i18n";
</script>

<Textfield
  type="number"
  label={$_("options.profile.cylinder.diametre")}
  bind:value={$profileData.outerRadius}
/>
