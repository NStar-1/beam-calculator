import { writable } from "svelte/store";

export const menuRoute = writable<"main" | "loads">("main");
