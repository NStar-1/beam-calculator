<script>
  import { t } from '$lib/translations'
  import App from "./App.svelte"
</script>

<svelte:head>
  <title>{$t("page.main.title")}</title>
  <meta name="description" content="{$t('page.main.desc')}" />
</svelte:head>

<App />
