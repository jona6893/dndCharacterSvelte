//Store.js
 
import { writable } from "svelte/store"


export const googleUser = writable(null);
export const userData = writable(null);

export const currentCharacter = writable(null);