import { persist, localStorage } from "@macfja/svelte-persistent-store";
import { writable } from "svelte/store";

export const name = persist(writable("John"), localStorage(), "name");
export const mode = persist(writable("signin"), localStorage(), "mode");
export const user = persist(writable(""), localStorage(), "user");
export const page = persist(writable(0), localStorage(), "page");

export const memes = persist(writable([]), localStorage(), "memes");
export const currentMeme = persist(writable(""), localStorage(), "currentMeme");

export const shown = persist(writable(true), localStorage(), "shown");
export const scrollPosition = persist(
  writable(true),
  localStorage(),
  "scrollPosition"
);
