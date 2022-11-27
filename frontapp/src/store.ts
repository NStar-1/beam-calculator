import { writable } from 'svelte/store';

export const length = writable(300);

export const profileVal = writable(0);
export const profileInputs = writable([])


export const fixationType = writable({left: '0', right: '0'})