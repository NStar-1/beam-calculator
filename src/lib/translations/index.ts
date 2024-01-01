import { dev } from "$app/environment";
import i18n, { type Config } from "sveltekit-i18n";
import en from "./en";
import ru from "./ru";
import lang from "./lang";

const config: Config = {
  log: {
    level: dev ? "warn" : "error",
  },
  translations: {
    en: {
      ...en,
      lang,
    },
    ru: {
      ...ru,
      lang,
    },
  },
};

export const defaultLocale = "en";

export const {
  t,
  locale,
  locales,
  loading,
  setLocale,
  setRoute,
  translations,
} = new i18n(config);
