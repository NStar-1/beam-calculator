<script>
  import { t } from '$lib/translations'
  import App from "./App.svelte"
</script>

<svelte:head>
  <title>{$t("page.main.title")}</title>
  <meta name="description" content="{$t('page.main.desc')}" />
  <meta name="sitemap:changefreq" content="weekly" />
  <meta name="sitemap:priority" content="1.0" />
</svelte:head>

<App />
