<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "../store.ts";
</script>

<Textfield label="Outer Diameter" bind:value={$profileData.outerRadius} />
<Textfield label="Inner Diameter" bind:value={$profileData.innerRadius} />
