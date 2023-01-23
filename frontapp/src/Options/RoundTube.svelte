<script>
	import Textfield from "@smui/textfield";
	import { profileData } from "../store.ts";
	import { _ } from "svelte-i18n";
</script>

<Textfield
	type="number"
	label={$_("options.profile.roundTube.outer")}
	bind:value={$profileData.outerRadius}
/>
<Textfield
	type="number"
	label={$_("options.profile.roundTube.inner")}
	bind:value={$profileData.innerRadius}
/>
