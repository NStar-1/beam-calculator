<script>
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
  <title>Structural calculator</title>
  <meta name="description" content="Static structural analysis of simple 2d frames based on Frame3DD" />
</svelte:head>

<App />
