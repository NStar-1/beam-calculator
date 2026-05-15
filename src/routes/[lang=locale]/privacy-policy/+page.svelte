<script lang="ts">
  import Switch from "@smui/switch";
  import { cookieConsent } from "$lib/store";
</script>

<div>
  <p>beamcalc.net on itself does not collect or store any of your data.</p>
  <p>
    We only do use Google Analytics (by Google LLC) for aggregated usage
    statistics.
  </p>

  <p>This is optional, you can disabled or enabled it whenever you want.</p>
  <div class="group">
    <p>Enable?</p>
    <Switch bind:checked={$cookieConsent.hasConsent} />
  </div>
</div>

<style lang="scss">
  .group {
    display: flex;
    gap: 0.5rem;
  }
</style>
