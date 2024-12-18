import { create } from "zustand";

import { IWallStore } from "@/src/types/types";

export const useWallStore = create<IWallStore>((set) => ({
  isDownloaded: false,
  setIsDownloaded: (value: boolean) => set({ isDownloaded: value }),
  toastVisible: false,
  setToastVisible: (value: boolean) => set({ toastVisible: value }),
}));
