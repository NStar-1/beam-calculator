<script lang="ts">
  import { Title, Content } from "@smui/paper";
  import Paper from "@smui/paper/src/Paper.svelte";
  import { t, locale } from "$lib/translations";
  import Button from "@smui/button/src/Button.svelte";
  import { cookieConsent } from "$lib/store";

  function handleAgree() {
    cookieConsent.set({ initialized: true, hasConsent: true });
  }
  function handleDisagree() {
    cookieConsent.set({ initialized: true, hasConsent: false });
  }
</script>

<div class="container">
  <div class="padded">
    <Paper class="paper" elevation={4}>
      <Title>{$t("page.cookieConsent.title")}</Title>
      <Content>
        <p>{$t("page.cookieConsent.mainText")}</p>
        <p>
          {$t("page.cookieConsent.youCanChange")}
          <a href={`/${$locale}/privacy-policy`}
            >{$t("page.cookieConsent.privacyPolicy")}</a
          >
        </p>

        <div class="btn-group">
          <Button tabindex={0} variant="unelevated" on:click={handleAgree}
            >{$t("page.cookieConsent.accept")}</Button
          >
          <Button variant="outlined" on:click={handleDisagree}
            >{$t("page.cookieConsent.reject")}</Button
          >
        </div>
      </Content>
    </Paper>
  </div>
</div>

<style lang="scss">
  .container {
    position: fixed;
    bottom: 4rem;
    width: 100%;
  }

  .padded {
    width: auto;
    margin: 0 4rem;
  }

  .btn-group {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
  }
</style>
