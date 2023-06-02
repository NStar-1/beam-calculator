<script>
  import { base } from "$app/paths";
  import { Separator } from '@smui/list';
  import { _ } from "svelte-i18n";
</script>

<div class="footer-wrapper">

   <div class="upper">
    <div class="logo-wrapper">
      <img
      alt="github image"
      src="{base}/assets/LogoGrey.svg"
      class="logo"
    />
    <p>Beam Calculator</p>
    </div>
    <div class="column">
      <p class="title">{$_('footer.community.title')}</p>
      <a href="/about">{$_('footer.community.about')}</a>
      <a href="https://github.com/NStar-1/beam-calculator">{$_('footer.community.github')}</a>
    </div>

   <div class="column">
    <p class="title">{$_('footer.help.title')}</p>
    <a href="/contact">{$_('footer.help.contact')}</a>
    <a href="https://github.com/NStar-1/beam-calculator">{$_('footer.help.faqs')}</a>
  </div>
  <div class="column">
    <p class="title">{$_('footer.legal.title')}</p>
    <a href="/about">{$_('footer.legal.privacy')}</a>
    <a href="https://github.com/NStar-1/beam-calculator">{$_('footer.legal.terms')}</a>
  </div>
     </div>
    <Separator/>
    <div class="under">
      <p>
        © 2023 All Rights Reserved 
      </p>
      <div>
        <p>nameofapp@gmail.com</p>
      </div>
    </div>
</div>

<style>
  .footer-wrapper {
    display: flex;
    background-color: var(--cds-background);
    height: 200px;
    padding: 16px 40px;
    box-sizing: border-box;
    box-shadow: var(--box-shadow);
    flex-direction: column;
    row-gap: 20px;
  }
  .footer-wrapper div{
    display: flex;
    flex-direction: row;
  }
  .logo {
    height: 40%;
  }
  .logo-wrapper{
    margin-right: 40px;
    font-family: 'Josefin Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    column-gap: 16px;
  }
  .upper{
    column-gap: 90px;
    height: 100%;
    & .column{
      flex-direction: column;
      row-gap: 16px;
      & .title{
        font-family: 'Josefin Sans';
        font-style: normal;
        font-weight: 500;
        margin-bottom: 0;
        font-size: 16px;
        line-height: 20px;
        cursor:default;
        text-transform: uppercase;
    }
      & a{
        color: var(--dark-grey);
        text-decoration: none;
      }
    }
  }
  .under{
    justify-content: space-between;
    color: var(--dark-grey);
    fill: var(--dark-grey);
    font-style: normal;
    font-weight: 500; 
    font-size: 14px;
    line-height: 20px; 
    & p{
      margin: 0;
    }
  }
  @media (max-width: 480px) {
    .footer-wrapper {
      position: static;
    }
  }
</style>
