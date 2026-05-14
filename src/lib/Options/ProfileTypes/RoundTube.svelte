<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { t } from "$lib/translations";
</script>

<Textfield
  type="number"
  label={$t("options.profile.roundTube.outer")}
  bind:value={$profileData.outerDiameter}
/>
<Textfield
  type="number"
  label={$t("options.profile.roundTube.inner")}
  bind:value={$profileData.innerDiameter}
/>
