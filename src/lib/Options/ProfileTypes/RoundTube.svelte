<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "$lib/store";
  import { t } from "$lib/translations";
</script>

<Textfield
  type="number"
  label={$t("options.profile.outerRadius")}
  bind:value={$profileData.outerRadius}
/>
<Textfield
  type="number"
  label={$t("options.profile.innerRadius")}
  bind:value={$profileData.innerRadius}
/>
