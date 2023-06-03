<script>
  import { base } from "$app/paths";
  import { locale, _ } from "svelte-i18n";
  import Menu from '@smui/menu';
  import Button from "@smui/button/src/Button.svelte";
  import DayIcon from "../assets/day.svelte"
  import NightIcon from "../assets/night.svelte"
  import List, { Item, Separator, Text } from '@smui/list';
  import { dict } from "$lib/dictionary";
  const lngs = Object.keys(dict);
  let selectedLng = "En"
  let menu = {}
  let currentTheme = "light";


</script>

<div class="HeaderWrapper">
    <a href="/" class="no-hover">
      <img alt="logo" src={`${base}/assets/IconColor.svg`}/>
      <p>Beam Calculator</p>
    </a>
    <div class="links">
      <a href="/about">{$_("app.about")}</a>
      <a href="/contact">{$_("app.contact")}</a>
    </div>
    <div class="active-buttons">
      <Button variant="outlined" class="styledButton" >
        {#if currentTheme ==="dark"}
        <DayIcon/>
        {:else}
        <NightIcon/>
        {/if}
      </Button>
      <div>
        <Button on:click={()=> menu.setOpen(true)} class="styledButton normal" style={"color: inherit"}>
          <span class="material-symbols-outlined">
            language
          </span>
          {$locale}
          <span class="material-symbols-outlined">
            arrow_drop_down
          </span>
        </Button>
      <Menu bind:this={menu}>
        <List>
          {#each lngs as lng}
            <Item on:click={()=> locale.set(lng)}>
              <Text>{lng}</Text>
            </Item>        
          {/each}
        </List>
      
      </Menu>
      
      </div>
      
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
    font-size: 16px;
    align-items: center;
    font-weight: 500;
    z-index: 1;
  }
  .HeaderWrapper > div{
    display: flex;
  }
  .HeaderWrapper ~ div{
    cursor: pointer;
  }
  .links {
    column-gap: 32px;
  }
  .no-hover{
    &:hover{
        color: initial;
      }
      font-family: 'Josefin Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 20px !important;
    line-height: 20px;
    column-gap: 16px;
  }
  a{
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    &:hover{
      color: var(--main-orange);
      
    }
  }
  :global(.styledButton){
    aspect-ratio: 1/1;
    padding: 0;
    min-width: unset;
    column-gap: 4px;
  }
  :global(.normal){
    aspect-ratio: unset;
    text-transform: unset;
    color: initial;
    font-size: 16px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
  }
  .active-buttons{
    column-gap: 24px;
  }
  :global(svg){
    &:focus{
      outline: none;
    }
  }
  .material-symbols-outlined{
    align-self: center;
  }

</style>
