import { setLocale, setRoute, defaultLocale } from "$lib/translations";

export const prerender = true;

export const load = async ({ url, params }) => {
  const { pathname } = url;
  const lang = params.lang || defaultLocale;
  const route = params.lang
    ? pathname.replace(new RegExp(`^/${params.lang}`), "") || "/"
    : "/";

  await setLocale(lang);
  await setRoute(route);

  return { route, lang };
};
