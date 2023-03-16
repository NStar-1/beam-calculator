<script>
  import { base } from "$app/paths";
  import { locale, _ } from "svelte-i18n";
  import Switch from "@smui/switch";

  let lng = false;
</script>

<div class="HeaderWrapper">
  <div class="ContentHeader">
    <!--<a href="{base}/"
      ><img
        rel="icon"
        src="{base}/assets/logo.svg"
        alt="icon"
        class="AppName"
      /></a
  >-->

    <div style="flex-direction: row; display: flex">
      <!-- FIXME -->
      <!--<Switch
        bind:checked={lng}
        color="secondary"
        icons={false}
        on:SMUISwitch:change={() => locale.set(lng ? "ru" : "en")}
      />-->

      <a href="{base}/about" class="Link" style="text-decoration: none"
        >{$_("app.about")}</a
      >
    </div>
  </div>
</div>

<style>
  .HeaderWrapper {
    display: flex;
    position: sticky;
    top: 0;
    width: 100%;
    height: 60px;
    background: #ff9859;
    box-shadow: 10px 0 50px rgba(153, 153, 153, 0.54);
    z-index: 1;
  }
  .ContentHeader {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0 15%;
    flex-direction: row;
  }
  .Link {
    display: flex;
    height: 100%;
    border: none;
    align-items: center;
    color: #ffffff;
    background: transparent;
    text-decoration: 1px solid white underline;
    cursor: pointer;
    text-decoration: none;
  }
  .Link:active,
  .Link:hover {
    background: #ff8d48;
    text-decoration: none;
  }
  .AppName {
    display: flex;
    height: 80%;
    margin: 1% 0;
    color: white;
  }
  @media (max-width: 480px) {
    .AppName {
      height: 40%;
      margin: 8% 0;
    }
    .ContentHeader {
      margin: 0 5%;
    }
  }
</style>
