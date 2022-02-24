import { persist, localStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

export const name = persist(writable("John"), localStorage(), "name");
export const mode = persist(writable("signin"), localStorage(), "mode");
export const user = persist(writable("userObj"), localStorage(), "user");
