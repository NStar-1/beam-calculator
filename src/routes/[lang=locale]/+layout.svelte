<script lang="ts">
  import { onMount } from "svelte";
  import { cookieConsent } from "$lib/store";
  import { locale } from "$lib/translations";
  import { browser } from "$app/environment";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import CookiesConsent from "./CookiesConsent.svelte";

  // `src/app.html` hardcodes `lang="en"`, so keep the document language in
  // sync with the active locale for crawlers and screen readers.
  $: if (browser && $locale) {
    document.documentElement.lang = $locale;
  }

  let canShowCookieConsent = false;

  $: if (browser && $cookieConsent.initialized) {
    console.log(
      `Google Analytics ${$cookieConsent.hasConsent ? "enabled" : "disabled"}`
    );
    (globalThis as any).gtag?.("consent", "update", {
      analytics_storage: $cookieConsent.hasConsent ? "granted" : "denied",
    });
  }

  // Plausible tracking/analytics
  onMount(() => {
    const cookieConsentTimer = window.setTimeout(() => {
      canShowCookieConsent = true;
    }, 0);

    import("@plausible-analytics/tracker").then(({ init }) => {
      init({
        domain: "beamcalc.net",
        endpoint: "https://analytics.based.lt/api/event",
      });
    });

    return () => {
      window.clearTimeout(cookieConsentTimer);
    };
  });

  //onMount(() => {
  //  isPhone.set(window.matchMedia("(max-width: 480px)").matches);
  //  (window.adsbygoogle = window.adsbygoogle || []).push({});
  //});
</script>

<div class="AppWrapper">
  <div>
    <Header />

    <div class="InlinePage">
      <div class="ContentPage">
        <slot />
      </div>
    </div>
  </div>
  {#if canShowCookieConsent && !$cookieConsent.initialized}
    <CookiesConsent />
  {/if}
  <Footer />
</div>

<style>
  .AppWrapper {
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
  }
  .ContentPage {
    box-sizing: border-box;
    flex-grow: 1;
    padding: 30px;
    margin-left: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(153, 153, 153, 0.28);
  }
  .adv {
    flex: 20rem 0 1;
    height: fit-content;
    box-shadow: none;
  }
  .bottom {
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
    .bottom {
      display: flex;
    }

    .ContentPage {
      margin-left: 0;
      width: 100%;
      height: 100%;
      padding: 3px;
    }
  }
</style>
