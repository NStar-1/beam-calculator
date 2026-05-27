import type { ParamMatcher } from "@sveltejs/kit";
import lang from "../lib/translations/lang";

export const match: ParamMatcher = (param) => param in lang;
