import {
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import lang from "../src/lib/translations/lang.js";

const buildDir = "build";
const domain = "https://beamcalc.net";
const defaultLocale = "en";
const locales = Object.keys(lang);

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const getHtmlFiles = (directory) => {
  const entries = readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return getHtmlFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
  });
};

const attrsFromMeta = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)].map(
      ([, key, , doubleQuotedValue, singleQuotedValue]) => [
        key.toLowerCase(),
        doubleQuotedValue ?? singleQuotedValue ?? "",
      ],
    ),
  );

const sitemapMetaFromHtml = (html) => {
  const meta = {};

  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attrsFromMeta(tag);
    const name = attrs.name?.toLowerCase();

    if (name?.startsWith("sitemap:")) {
      meta[name.slice("sitemap:".length)] = attrs.content ?? "";
    }
  }

  return meta;
};

const pathnameFromFile = (file) => {
  const relative = path.relative(buildDir, file).replaceAll(path.sep, "/");

  if (relative === "index.html") {
    return "/";
  }

  return `/${relative.replace(/(?:\/index)?\.html$/, "")}`;
};

const pageFromFile = (file) => {
  const pathname = pathnameFromFile(file);
  const localePattern = locales.join("|");
  const match = pathname.match(new RegExp(`^/(${localePattern})(/.*)?$`));

  if (!match) {
    return null;
  }

  const html = readFileSync(file, "utf8");
  const meta = sitemapMetaFromHtml(html);

  if (meta.exclude === "true") {
    return null;
  }

  return {
    file,
    pathname,
    locale: match[1],
    route: match[2] ?? "",
    changefreq: meta.changefreq,
    priority: meta.priority,
  };
};

const urlFor = (locale, route) => `${domain}/${locale}${route}`;

const pages = getHtmlFiles(buildDir)
  .map(pageFromFile)
  .filter(Boolean)
  .sort((a, b) => a.pathname.localeCompare(b.pathname));

const pagesByRoute = Map.groupBy(pages, (page) => page.route);

const renderUrl = (page) => {
  const routeAlternates = pagesByRoute.get(page.route) ?? [];
  const defaultAlternate = routeAlternates.find(
    (alternate) => alternate.locale === defaultLocale,
  );
  const alternates = [
    ...routeAlternates.map((alternate) => ({
      hreflang: alternate.locale,
      href: `${domain}${alternate.pathname}`,
    })),
    ...(defaultAlternate
      ? [
          {
            hreflang: "x-default",
            href: `${domain}${defaultAlternate.pathname}`,
          },
        ]
      : []),
  ];

  return [
    "  <url>",
    `    <loc>${escapeXml(`${domain}${page.pathname}`)}</loc>`,
    ...alternates.map(
      ({ hreflang, href }) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`,
    ),
    ...(page.changefreq
      ? [`    <changefreq>${escapeXml(page.changefreq)}</changefreq>`]
      : []),
    ...(page.priority
      ? [`    <priority>${escapeXml(page.priority)}</priority>`]
      : []),
    "  </url>",
  ].join("\n");
};

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...pages.map(renderUrl),
  "</urlset>",
  "",
].join("\n");

writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log(`Generated build/sitemap.xml with ${pages.length} URLs`);
