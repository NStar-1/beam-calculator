import { setLocale, setRoute, defaultLocale } from "$lib/translations";

export const prerender = true;

export const load = async ({ url }) => {
  const { pathname } = url;

  const lang = pathname.match(/\w+?(?=\/|$)/)?.toString() || defaultLocale;

  const route = pathname.replace(new RegExp(`^/${lang}`), "");

  await setLocale(lang);
  await setRoute(route === "/" ? "/en" : route);

  return { route, lang };
};
