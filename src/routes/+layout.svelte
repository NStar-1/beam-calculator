<script lang="ts">
  import { dictionary, locale, _ } from "svelte-i18n";
  import { dict } from "$lib/dictionary";
  import { onMount } from "svelte";
  import { isPhone } from "$lib/store";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  dictionary.set(dict);
  locale.set("En");

  onMount(() => {
    isPhone.set(window.matchMedia("(max-width: 480px)").matches);
  });
</script>

<div class="AppWrapper">
  <div>
    <Header />

    <div class="InlinePage">
      <div class="ContentPage">
        <slot />
      </div>
      <div class="ContentPage adv">advertising</div>
    </div>
  </div>
  <div class="adv bottom ">
    ADV BOTTOM
  </div>
  <Footer />
</div>

<style>
  .AppWrapper{
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;

  }
  .ContentPage {
    padding: 30px;
    border-radius: 5px;
    width: 70%;
    box-shadow: 0 0 10px rgba(153, 153, 153, 0.28);
  }
  .adv {
    width: 10%;
    height: fit-content;
    box-shadow: none;
  }
  .bottom{
    display: flex;
    width: auto;
    height: 215px;
    background-color: bisque;
    margin: 40px;

  }

  .InlinePage {
    display: flex;
    flex-direction: row;
    margin: 30px auto 0 auto;
    column-gap: 10px;
    height: auto;
    width: 100%;
    justify-content: center;
  }
  
 

  @media (max-width: 480px) {
    .InlinePage {
      margin: 0;
      column-gap: 0;
      width: 100%;
      height: auto;
    }
    .ADV {
      display: none;
    }

    .ContentPage {
      width: 100%;
      height: 100%;
    }
  }
</style>
