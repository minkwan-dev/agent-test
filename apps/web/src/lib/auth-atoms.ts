import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const NOVITAS_ACCESS_TOKEN_KEY = "novitas_access_token";

const noopStorage: Storage = {
  length: 0,
  clear: () => {},
  getItem: () => null,
  key: () => null,
  removeItem: () => {},
  setItem: () => {},
};

function getSessionStorage(): Storage {
  if (typeof window === "undefined") return noopStorage;
  return window.sessionStorage;
}

export const accessTokenAtom = atomWithStorage<string | null>(
  NOVITAS_ACCESS_TOKEN_KEY,
  null,
  createJSONStorage(() => getSessionStorage()),
  { getOnInit: true },
);
