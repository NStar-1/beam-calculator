<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { t } from "$lib/translations";
</script>

<Textfield
  type="number"
  label={$t("options.profile.height")}
  bind:value={$profileData.height}
/>
<Textfield
  type="number"
  label={$t("options.profile.width")}
  bind:value={$profileData.width}
/>
<Textfield
  type="number"
  label={$t("options.profile.thickness")}
  bind:value={$profileData.thickness}
/>
