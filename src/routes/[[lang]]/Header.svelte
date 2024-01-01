<script>
  import { t, locale, locales } from "$lib/translations";
  import Menu from "@smui/menu";
  import Button from "@smui/button";
  import DayIcon from "$lib/assets/day.svelte";
  import NightIcon from "$lib/assets/night.svelte";
  import BeamCalc from "$lib/assets/Beam Calculator.svg";
  import IconColor from "$lib/assets/IconColor.svg";
  import List, { Item, Text } from "@smui/list";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';

  $: ({ route } = $page.data);
  let menu = {};
  let currentTheme = "light";

  onMount(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      const link = document.getElementById("theme");
      link?.setAttribute("href", "/smui-dark.css");
      currentTheme = "dark";
    }
  });

  function setTheme() {
    const link = document.getElementById("theme");
    if (currentTheme == "light") {
      link?.setAttribute("href", "/smui-dark.css");
      currentTheme = "dark";
    } else {
      link?.setAttribute("href", "/global-light.css");
      currentTheme = "light";
    }
  }
</script>

<div class="HeaderWrapper">
  <a href="/{$locale}" class="no-hover">
    <IconColor />
    <BeamCalc />
  </a>
  <div class="links">
    <a href="/{$locale}/about">{$t("app.about")}</a>
    <a href="/{$locale}/contact">{$t("app.contact")}</a>
  </div>
  <div class="active-buttons">
    <Button variant="outlined" class="styledButton" on:click={setTheme}>
      {#if currentTheme == "dark"}
        <DayIcon />
      {:else}
        <NightIcon />
      {/if}
    </Button>
    <div>
      <Button
        on:click={() => menu.setOpen(true)}
        class="styledButton normal"
        style={"color: inherit"}
      >
        <span class="material-symbols-outlined"> language </span>
        {$locale}
        <span class="material-symbols-outlined"> arrow_drop_down </span>
      </Button>
      <Menu bind:this={menu}>
        <List>
          {#each $locales as lng}
            <Item on:click={() => goto(`/${lng}${route}`)}>
              <Text>{lng}</Text>
            </Item>
          {/each}
        </List>
      </Menu>
    </div>
  </div>
</div>

<style lang="scss">
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
    justify-content: space-between;
    font-size: 16px;
    align-items: center;
    font-weight: 500;
    z-index: 1;
    @media (max-width: 480px) {
      padding: 8px;
    }
  }

  .links {
    column-gap: 32px;
    display: flex;
    @media (max-width: 480px) {
      display: none;
    }
  }

  .HeaderWrapper ~ div {
    cursor: pointer;
  }

  .no-hover {
    column-gap: 16px;
    &:hover {
      color: inherit;
    }
    @media (max-width: 550px) {
      & img {
        max-width: 80%;
        height: unset;
      }
      & svg {
        display: none;
      }
      column-gap: 0;
    }
  }
  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    &:hover {
      color: var(--main-orange);
    }
  }
  :global(.styledButton) {
    aspect-ratio: 1/1;
    padding: 0;
    min-width: unset;
    column-gap: 4px;
  }
  :global(.normal) {
    aspect-ratio: unset;
    text-transform: unset;
    color: initial;
    font-size: 16px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
  }
  .active-buttons {
    column-gap: 24px;
    display: flex;
    @media (max-width: 480px) {
      column-gap: 10px;
    }
  }
  :global(svg) {
    &:focus {
      outline: none;
    }
  }
  .material-symbols-outlined {
    align-self: center;
  }
</style>
