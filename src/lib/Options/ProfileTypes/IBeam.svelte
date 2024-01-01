<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { t } from "$lib/translations";
</script>

<Textfield
  type="number"
  label={$t("options.profile.width")}
  bind:value={$profileData.width}
/>
<Textfield
  type="number"
  label={$t("options.profile.depth")}
  bind:value={$profileData.depth}
/>
<Textfield
  type="number"
  label={$t("options.profile.flangeThickness")}
  bind:value={$profileData.flangeThickness}
/>
<Textfield
  type="number"
  label={$t("options.profile.webThickness")}
  bind:value={$profileData.webThickness}
/>
