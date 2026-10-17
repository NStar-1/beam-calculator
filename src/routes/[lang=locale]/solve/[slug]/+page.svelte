<script lang="ts">
  import Calculator from "$lib/Calculator.svelte";
  import type { AnchorLinkModel } from "$lib/modelSerialization";
  import {
    defaultLocale,
    getProblemsByGroup,
    supportedLocales,
  } from "$lib/problems";
  import { hubContent } from "$lib/problems/hub";
  import { buildProblemSchema, toSafeJsonLd } from "$lib/problems/schema";
  import { SITE_URL } from "$lib/site";
  import { t } from "$lib/translations";
  import type { Locale, Problem } from "$lib/problems";

  export let data: {
    lang: Locale;
    problem: Problem;
    model: AnchorLinkModel;
    anchor: string;
  };

  $: ({ lang, problem, model, anchor } = data);
  $: content = problem.content[lang];
  $: canonical = `${SITE_URL}/${lang}/solve/${problem.slug}`;
  $: alternates = supportedLocales.map((alternate) => ({
    lang: alternate,
    href: `${SITE_URL}/${alternate}/solve/${problem.slug}`,
  }));
  $: defaultHref = `${SITE_URL}/${defaultLocale}/solve/${problem.slug}`;
  $: hub = hubContent[lang];
  $: related = getProblemsByGroup(problem.group)
    .filter((candidate) => candidate.slug !== problem.slug)
    .slice(0, 4);
  $: jsonLd = toSafeJsonLd(buildProblemSchema(problem, lang, canonical));
</script>

<svelte:head>
  <title>{content.title}</title>
  <meta name="description" content={content.description} />
  <link rel="canonical" href={canonical} />
  {#each alternates as alternate}
    <link
      rel="alternate"
      hreflang={alternate.lang}
      href={alternate.href}
    />
  {/each}
  <link rel="alternate" hreflang="x-default" href={defaultHref} />
  <meta name="robots" content="index, follow" />
  <meta name="sitemap:changefreq" content="monthly" />
  <meta name="sitemap:priority" content="0.8" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<article class="problem">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/{lang}/solve">{hub.h1}</a>
    <span aria-hidden="true"> / </span>
    <span>{content.h1}</span>
  </nav>

  <h1>{content.h1}</h1>

  {#each content.intro as paragraph}
    <p>{paragraph}</p>
  {/each}

  <section class="calculator">
    <h2>{$t("solve.calculator")}</h2>
    <p class="hint">{$t("solve.calculatorHint")}</p>
    <!--
      Navigating to another problem reuses this component with new props, and
      the mount-time hash/preset logic would not run again. Keying on the slug
      remounts the calculator so every example starts from its own preset.
    -->
    {#key problem.slug}
      <Calculator initialModel={model} />
    {/key}
    <p class="anchor">
      {$t("solve.directLink")}
      <a href="{canonical}{anchor}">{canonical}{anchor}</a>
    </p>
  </section>

  <section>
    <h2>{$t("solve.modelled")}</h2>
    <ul>
      {#each content.setup as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section>
    <h2>{$t("solve.reading")}</h2>
    {#each content.reading as paragraph}
      <p>{paragraph}</p>
    {/each}
  </section>

  <section>
    <h2>{$t("solve.formulas")}</h2>
    <table class="formulas">
      <thead>
        <tr>
          <th scope="col">{$t("solve.formula")}</th>
          <th scope="col">{$t("solve.formulaMeaning")}</th>
        </tr>
      </thead>
      <tbody>
        {#each content.formulas as formula}
          <tr>
            <td><code>{formula.expression}</code></td>
            <td>{formula.meaning}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <section>
    <h2>{$t("solve.faq")}</h2>
    {#each content.faq as item}
      <details>
        <summary>{item.question}</summary>
        <p>{item.answer}</p>
      </details>
    {/each}
  </section>

  <section>
    <h2>{$t("solve.moreExamples")}</h2>
    <ul>
      {#each related as item}
        <li>
          <a href="/{lang}/solve/{item.slug}">{item.content[lang].h1}</a>
          <span class="summary">{item.content[lang].summary}</span>
        </li>
      {/each}
    </ul>
    <p><a href="/{lang}/solve">{hub.h1}</a></p>
  </section>
</article>

<style lang="scss">
  .breadcrumb {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    a {
      color: var(--main-orange);
      text-decoration: none;
    }
  }

  .calculator {
    margin: 2rem 0;
  }

  .hint,
  .anchor {
    font-size: 0.9rem;
  }

  .anchor a {
    word-break: break-all;
  }

  .formulas {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      border: 1px solid rgba(153, 153, 153, 0.4);
      padding: 0.5rem;
      text-align: left;
      vertical-align: top;
    }
    code {
      white-space: pre-wrap;
    }
  }

  details {
    margin-bottom: 0.75rem;
    summary {
      cursor: pointer;
      font-weight: 500;
    }
  }

  .summary {
    display: block;
    font-size: 0.9rem;
    opacity: 0.8;
  }
</style>
