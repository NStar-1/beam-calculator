<script lang="ts">
  import {
    defaultLocale,
    getProblemsByGroup,
    problemGroupOrder,
    supportedLocales,
  } from "$lib/problems";
  import { hubContent } from "$lib/problems/hub";
  import { toSafeJsonLd } from "$lib/problems/schema";
  import { SITE_URL } from "$lib/site";
  import { page } from "$app/stores";
  import type { Locale } from "$lib/problems";

  $: lang = ($page.params.lang ?? defaultLocale) as Locale;
  $: content = hubContent[lang];
  $: canonical = `${SITE_URL}/${lang}/solve`;
  $: alternates = supportedLocales.map((alternate) => ({
    lang: alternate,
    href: `${SITE_URL}/${alternate}/solve`,
  }));
  $: defaultHref = `${SITE_URL}/${defaultLocale}/solve`;
  $: jsonLd = toSafeJsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    url: canonical,
    inLanguage: lang,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: problemGroupOrder.flatMap((group, groupIndex) =>
        getProblemsByGroup(group).map((problem, problemIndex) => ({
          "@type": "ListItem",
          position: groupIndex * 10 + problemIndex + 1,
          name: problem.content[lang].h1,
          url: `${SITE_URL}/${lang}/solve/${problem.slug}`,
        }))
      ),
    },
  });
</script>

<svelte:head>
  <title>{content.title}</title>
  <meta name="description" content={content.description} />
  <link rel="canonical" href={canonical} />
  {#each alternates as alternate}
    <link rel="alternate" hreflang={alternate.lang} href={alternate.href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={defaultHref} />
  <meta name="sitemap:changefreq" content="monthly" />
  <meta name="sitemap:priority" content="0.7" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<article>
  <h1>{content.h1}</h1>

  {#each content.intro as paragraph}
    <p>{paragraph}</p>
  {/each}

  {#each problemGroupOrder as group}
    <section>
      <h2>{content.groups[group].title}</h2>
      <p>{content.groups[group].description}</p>
      <ul class="problemList">
        {#each getProblemsByGroup(group) as problem}
          <li>
            <a href="/{lang}/solve/{problem.slug}">{problem.content[lang].h1}</a>
            <span class="summary">{problem.content[lang].summary}</span>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</article>

<style lang="scss">
  .problemList {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  a {
    color: var(--main-orange);
    text-decoration: none;
    font-weight: 500;
  }

  .summary {
    display: block;
    font-size: 0.9rem;
    opacity: 0.8;
  }
</style>
