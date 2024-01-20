<script>
  import Graph from "$lib/Ggraphic/index.svelte";
  import Options from "$lib/Options/Options.svelte";
  import { subscribeAutoRefresh } from "$lib/store";
  import { onMount } from "svelte";
  import { t } from "$lib/translations";

  onMount(() => {
    subscribeAutoRefresh();
  });
</script>

<h1>{$t("app.title")}</h1>
<p>{$t("page.main.helpText")}</p>
<div class="CalculatorWrapper">
  <div class="OptionsWrapper">
    <Options />
  </div>
  <div class="PictureWrapper">
    <Graph />
  </div>
</div>

<style>
  .CalculatorWrapper {
    border: #ff8d48 1px solid;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    padding: 1rem;
    justify-content: space-between;
  }

  .OptionsWrapper {
    padding: 5px;
    width: 300px;
    min-width: 30%;
    overflow-y: scroll;
  }

  .PictureWrapper {
    width: 70%;
    height: content-box;
    border: #ff8d48 1px solid;
  }

  @media (max-width: 480px) {
    .CalculatorWrapper {
      border: none;
      column-gap: 0;
      row-gap: 10px;
      padding: 0;
      flex-direction: column-reverse;
      justify-content: unset;
      height: auto;
    }
    .OptionsWrapper {
      width: 100%;
      overflow: unset;
    }
    .PictureWrapper {
      width: 100%;
      min-height: 35vh;
      border: none;
    }
  }
</style>
