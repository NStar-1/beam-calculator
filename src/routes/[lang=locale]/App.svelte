<script>
  import Calculator from "$lib/Calculator.svelte";
  import { t } from "$lib/translations";
</script>

<h1>{$t("app.title")}</h1>
<p>{$t("page.main.helpText")}</p>
<Calculator />
