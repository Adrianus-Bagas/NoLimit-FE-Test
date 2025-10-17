import {atom} from "jotai";

export const isLoadingAtom = atom<boolean>(false);
export const errorMessageAtom = atom<string>("");
