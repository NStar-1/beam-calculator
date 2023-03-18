<script>
  import { _ } from "svelte-i18n";
  import Graph from "$lib/Ggraphic/index.svelte";
  import Options from "$lib/Options/Options.svelte";
  import { isPhone } from "$lib/store";
</script>

<h1>{$_("app.title")}</h1>
<div class="CalculatorWrapper">
  {#if $isPhone}
    <div class="PictureWrapper">
      <Graph />
    </div>
    <div class="OptionsWrapper">
      <Options />
    </div>
  {:else}
    <div class="OptionsWrapper">
      <Options />
    </div>
    <div class="PictureWrapper">
      <Graph />
    </div>
  {/if}
</div>

<style>

  .CalculatorWrapper {
    height: 65vh;
    border: #ff8d48 1px solid;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    column-gap: 2%;
    padding: 2%;
    justify-content: space-between;
  }
  .OptionsWrapper {
    height: content-box;
    padding: 5px;
    width: 300px;
    min-width: 30%;
    overflow-y: scroll;
  }
  .PictureWrapper {
    width: 70%;
    height: content-box;
    border: #ff8d48 1px solid;
    background-color: white;
  }
  @media (max-width: 480px) {
  
    .CalculatorWrapper {
      border: none;
      column-gap: 0;
      row-gap: 10px;
      padding: 0;
      flex-direction: column;
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
    }
  }
</style>
