<script lang="ts">
  import { t } from "$lib/translations";
  import ChangelogItem from "./ChangelogItem.svelte";
  import CommitLink from "./CommitLink.svelte";
</script>

<svelte:head>
  <title>{$t("changelog.title")}</title>
  <meta
    name="description"
    content={$t("changelog.description")}
  />
</svelte:head>

<main class="changelog">
  <header>
    <h1>{$t("changelog.title")}</h1>
  </header>

  <!--
    Changelog update marker: cac1bcc
    Future LLM instructions:
    - Treat this hash as the last commit already reviewed for this static changelog.
    - On the next changelog update, inspect commits after this marker with:
      git log cac1bcc..HEAD --date=short --pretty=format:"%h%x09%ad%x09%s"
    - Add only user-facing changes worth publishing; skip internal cleanup,
      editor setup, dependency churn, and commits with no visible product impact.
    - Place commit links beside the specific bullet they support using CommitLink.
    - After updating entries, replace this marker with the current HEAD hash.
  -->
  <ChangelogItem
    date="2026-05-15"
    title="Corrected cross-section calculations for common profiles"
  >
    <ul>
      <li>
        Fixed hollow round tube torsion and inertia formulas, including the
        diameter-based inputs shown in the UI. <CommitLink hash="edd873a" />
      </li>
      <li>
        Fixed rectangular and rectangular tube axis mapping so section height
        correctly drives vertical beam stiffness. <CommitLink hash="85d5690" />
      </li>
      <li>
        Fixed I-beam axis mapping so depth contributes to the strong bending
        axis used by vertical deflection calculations. <CommitLink
          hash="e867a79"
        />
      </li>
      <li>
        Added formula tests with separately checked values, including ASTM
        W-shape catalog coverage for I-beams. <CommitLink hash="e867a79" />
      </li>
    </ul>
  </ChangelogItem>

  <ChangelogItem date="2026-05-15" title="Improved homepage copy">
    <ul>
      <li>
        Cleaned up typos and made the app description clearer about supported
        beam loads, supports, materials, cross sections, and Frame3DD results.
        <CommitLink hash="6d02513" />
        <CommitLink hash="459e00c" />
      </li>
    </ul>
  </ChangelogItem>

  <ChangelogItem date="2026-05-11" title="Added consented product analytics">
    <ul>
      <li>
        Added Plausible analytics integration for page visits and model solve
        events after the app has started. <CommitLink hash="8a6933c" />
        <CommitLink hash="68cb83a" />
      </li>
      <li>
        Kept analytics behind the existing cookie consent flow and fixed the
        loading path so it does not rely on top-level await.
        <CommitLink hash="0be47f8" />
        <CommitLink hash="100d62d" />
      </li>
    </ul>
  </ChangelogItem>
</main>

<style>
  .changelog {
    max-width: 40rem;
  }

  header {
    margin-bottom: 0.75rem;
  }

  h1 {
    margin: 0 0 0.5rem;
  }
</style>
