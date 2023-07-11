<script lang="ts">
  import { page } from '$app/stores'
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { isPhone } from "$lib/store";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  onMount(() => {
    isPhone.set(window.matchMedia("(max-width: 480px)").matches);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
</script>

<div class="AppWrapper">
  <div>
    <Header />

    <div class="InlinePage">
      <div class="ContentPage">
        <slot />
      </div>
      <div class="ContentPage adv">
        <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-1770200227566265"
            data-ad-slot="1770200227566265"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
      </div>
    </div>
  </div>
  <div class="adv bottom">
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-1770200227566265"
        data-ad-slot="1770200227566265"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
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
    box-sizing: border-box;
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
  
    .adv {
      display: none;
    }
    .bottom{
      display: flex;
    }

    .ContentPage {
      width: 100%;
      height: 100%;
      padding: 3px;
    }
  }
</style>
