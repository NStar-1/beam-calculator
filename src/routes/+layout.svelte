<script>
    import Header from "../Header/Header.svelte";
    import { dictionary, locale, _ } from "svelte-i18n";
    import { dict } from "../dictionary";
    import { onMount } from "svelte";
    import { isPhone } from "../store";
    import Footer from "../Footer/Footer.svelte";
    dictionary.set(dict);
    locale.set("en");
  
    onMount(() => {
      isPhone.set(window.matchMedia("(max-width: 480px)").matches);
    });
  </script>
  
  <div class="AppWrapper">
    <Header />
  
    <div class="InlinePage">
      <div class="ContentPage ADV">advertising</div>
      <div class="ContentPage">
        <slot></slot>
      </div>
      <div class="ContentPage ADV">advertising</div>
    </div>
    <Footer />
  </div>
  
  <style>
    .InlinePage {
      display: flex;
      flex-direction: row;
      margin: 30px auto 0 auto;
      column-gap: 10px;
      height: auto;
      width: 100%;
      justify-content: center;
    }
    .ContentPage {
      padding: 30px;
      border-radius: 5px;
      width: 70%;
      background: white;
      box-shadow: 0 0 10px rgba(153, 153, 153, 0.28);
    }
    .ADV {
      width: 10%;
      height: fit-content;
      box-shadow: none;
    }
  
    h1 {
      color: #ff8d48;
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
  