<script lang="ts">
  import { t } from "$lib/translations";
  import ChangelogItem from "./ChangelogItem.svelte";
  import CommitLink from "./CommitLink.svelte";
</script>

<svelte:head>
  <title>{$t("page.changelog.title")}</title>
  <meta
    name="description"
    content={$t("page.changelog.description")}
  />
</svelte:head>

<main class="changelog">
  <header>
    <h1>{$t("page.changelog.title")}</h1>
  </header>

  <!--
    Changelog update marker: fb57cd4291708fcad0c850e9d4fc7f7107e4cbd8
    Future LLM instructions:
    - Treat this hash as the last commit already reviewed for this static changelog.
    - On the next changelog update, inspect commits after this marker with:
      git log fb57cd4291708fcad0c850e9d4fc7f7107e4cbd8..HEAD --date=short --pretty=format:"%h%x09%ad%x09%s"
    - Add only user-facing changes worth publishing; skip internal cleanup,
      editor setup, dependency churn, and commits with no visible product impact.
    - Place commit links beside the specific bullet they support using CommitLink.
    - After updating entries, replace this marker with the current HEAD hash.
  -->
  <ChangelogItem date="2026-10-18" title="Ready-to-use beam examples">
    <ul>
      <li>
        Added 12 beam examples in English and Russian, with preconfigured
        calculators, setup explanations, formulas, and answers to common
        questions. Examples cover cantilevers, simply supported beams, and
        beams with fixed supports. <CommitLink hash="c800685" />
      </li>
      <li>
        Added a beam examples catalog and related-example links to help find
        the right starting setup. <CommitLink hash="c800685" />
      </li>
      <li>
        Fixed restoring a preset while editing an added load so the load
        editor keeps a valid selection. <CommitLink hash="fb57cd4" />
      </li>
    </ul>
  </ChangelogItem>

  <ChangelogItem date="2026-07-27" title="Shareable beam calculations">
    <ul>
      <li>
        Share a calculation by copying its address. Model changes update the
        link, and opening it restores the beam length, units, supports,
        cross section, material, and point loads.
        <CommitLink hash="548021e" />
      </li>
    </ul>
  </ChangelogItem>

  <ChangelogItem date="2026-05-21" title="More steel materials">
    <ul>
      <li>
        Expanded the material selector with generic construction, stainless,
        and tool steels, plus ASTM and AISI grades including ASTM A36 and
        AISI 304. <CommitLink hash="687e7aa" />
      </li>
    </ul>
  </ChangelogItem>

  <ChangelogItem date="2026-05-18" title="Simplified 1D result tables">
    <ul>
      <li>
        Focused displacement and reaction tables on beam-relevant values in 1D
        mode, hiding normally zero out-of-plane components unless unexpected
        non-zero results need attention. <CommitLink hash="4e3dc9c" />
      </li>
    </ul>
  </ChangelogItem>

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
