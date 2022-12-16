<script>
  import Textfield from "@smui/textfield";
  import { profileData } from "../store.ts";
</script>

<Textfield label="Diameter" bind:value={$profileData.outerRadius} />
