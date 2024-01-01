<script>
  import { Separator } from "@smui/list";
  import { t } from "$lib/translations";
  import BeamCalc from "$lib/assets/Beam Calculator.svg";
  import LogoGrey from "$lib/assets/LogoGrey.svg";
</script>

<div class="footer-wrapper">
  <div class="upper">
    <div class="logo-wrapper">
      <LogoGrey />
      <BeamCalc />
    </div>
    <div class="info-wrapper">
      <div class="column">
        <p class="title">{$t("footer.community.title")}</p>
        <a href="/about">{$t("footer.community.about")}</a>
        <a href="https://github.com/NStar-1/beam-calculator"
          >{$t("footer.community.github")}</a
        >
      </div>

      <div class="column">
        <p class="title">{$t("footer.help.title")}</p>
        <a href="/contact">{$t("footer.help.contact")}</a>
        <a href="/faq">{$t("footer.help.faqs")}</a>
      </div>
      <div class="column">
        <p class="title">{$t("footer.legal.title")}</p>
        <a href="/privacy-policy">{$t("footer.legal.privacy")}</a>
        <a href="/terms-of-service">{$t("footer.legal.terms")}</a>
      </div>
    </div>
  </div>
  <Separator />
  <div class="under">
    <p>© 2023 All Rights Reserved</p>
    <div>
      <a href="mailto:contact@beamcalc.net">contact@beamcalc.net</a>
    </div>
  </div>
</div>

<style lang="scss">
  .footer-wrapper {
    display: flex;
    background-color: var(--cds-background);
    min-height: 200px;
    padding: 16px 40px;
    box-sizing: border-box;
    box-shadow: var(--box-shadow);
    flex-direction: column;
    row-gap: 20px;
    @media (max-width: 480px) {
      height: auto;
      padding: 16px 8px;
    }
  }
  .footer-wrapper ~ div {
    display: flex;
    flex-direction: column;
  }

  .logo {
    height: 40%;
  }
  .logo-wrapper {
    margin-right: 40px;
    column-gap: 16px;
    height: min-content;
    display: flex;
    flex-direction: row;
  }

  .upper {
    column-gap: 90px;
    height: 100%;
    display: flex;
    row-gap: 20px;
    flex-wrap: wrap;
    @media (max-width: 480px) {
      flex-direction: column;
    }
    & .info-wrapper {
      display: flex;
      flex-direction: row;
      column-gap: 90px;
      flex-wrap: wrap;
      @media (max-width: 480px) {
        flex-direction: column;
      }
      & .column {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        & .title {
          font-weight: 600;
          margin-bottom: 0;
          font-size: 16px;
          line-height: 20px;
          cursor: default;
          text-transform: uppercase;
        }
        & a {
          color: var(--dark-grey);
          text-decoration: none;
        }
      }
    }
  }
  .under {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    color: var(--dark-grey);
    fill: var(--dark-grey);
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    & p {
      margin: 0;
    }
  }

  @media (max-width: 480px) {
    .footer-wrapper {
      position: static;
    }
  }
</style>
