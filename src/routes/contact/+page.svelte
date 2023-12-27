<script>
  import Button from "@smui/button/src/Button.svelte";
  import Textfield from "@smui/textfield";
  import { _ } from "svelte-i18n";

  let name = "";
</script>

<div class="contact-wrapper">
  <h2>{$_("contact.title")}</h2>
  {$_("contact.ways")}:
  <ul>
    <li><a href="mailto:ruslan.panasiuk@gmail.com">ruslan.panasiuk@gmail.com</a></li>
    <li><a href="https://github.com/NStar-1/beam-calculator">GitHub</a></li>
    <li>Telegram: @qhc9j4HyQJVf40bARaHozD4zUc</li>
  </ul>
  <!--<div>
    <div>
      <p>{$_("contact.name")}</p>
      <Textfield bind:value={name} variant="outlined" required />
    </div>
  </div>
  <Button variant="raised">{$_("contact.button")}</Button>-->
</div>

<style lang="scss">
  .contact-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    button {
      align-self: flex-end;
    }
    li {
      line-height: 1.25rem;
    }
  }
</style>
