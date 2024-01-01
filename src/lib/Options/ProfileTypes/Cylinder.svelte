<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { t } from "$lib/translations";
</script>

<Textfield
  type="number"
  label={$t("options.profile.radius")}
  bind:value={$profileData.outerRadius}
/>
