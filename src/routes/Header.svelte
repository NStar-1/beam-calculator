<script>
  import { base } from "$app/paths";
  import { locale, _ } from "svelte-i18n";
  import Select, { Option } from "@smui/select";
  import Icon from "@smui/select/icon";
  import { onMount } from "svelte";

  let lng = "ru";
  let setTheme = () =>{
    console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
</script>

<div class="HeaderWrapper">
    <div>
      LOGO
    </div>
    <div>
      ABOUT CONTACT
    </div>
    <div on:click={setTheme}>
      SIDE
    </div>
</div>

<style>
  .HeaderWrapper {
    display: flex;
    position: sticky;
    top: 0;
    width: 100%;
    height: 78px;
    background: var(--cds-background);
    box-shadow: 0px 3px 20px rgba(64, 64, 64, 0.1);
    padding: 17px 40px;
    box-sizing: border-box;
    justify-content:space-between;
    align-items: center;
    z-index: 1;
  }
</style>
