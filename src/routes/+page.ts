import { redirect } from "@sveltejs/kit";
import { defaultLocale } from "$lib/translations";

export const prerender = true;

export const load = () => {
  throw redirect(308, `/${defaultLocale}`);
};
