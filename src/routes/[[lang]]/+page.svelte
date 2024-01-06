<script>
  import { t } from '$lib/translations'
  import App from "./App.svelte"
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  const rp = $page.data

  if (browser && rp !== undefined && rp.route === "/") {
    goto(`/${rp.lang}`, { replaceState: true });
  }
</script>

<svelte:head>
  <title>{$t("page.main.title")}</title>
  <meta name="description" content="{$t('page.main.desc')}" />
</svelte:head>

<App />
