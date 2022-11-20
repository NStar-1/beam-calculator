import { writable } from 'svelte/store';

export const length = writable(300);

export const cutVal = writable(0);
export const cutInputs = writable([])


export const fixationType = writable({left: '0', right: '0'})