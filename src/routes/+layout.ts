import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { setLocale, setRoute, defaultLocale } from "$lib/translations";

export const trailingSlash = "always";
export const prerender = true;

export const load = async ({ url }) => {
  const { pathname } = url;

  const lang = pathname.match(/\w+?(?=\/|$)/)?.toString() || defaultLocale;

  const route = pathname.replace(new RegExp(`^/${lang}`), "");

  await setLocale(lang);
  await setRoute(route === "/" ? "/en" : route);
  if (browser && route === "/") {
    await goto(`/${lang}`, { replaceState: true });
  }

  return { route, lang };
};
