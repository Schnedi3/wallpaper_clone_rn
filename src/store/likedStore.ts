import { create } from "zustand";

import { ILikedStore } from "../types/types";

export const useLikedStore = create<ILikedStore>()((set) => ({
  liked: [],
  addToLiked: (wall) =>
    set((state) => ({ liked: [...new Set([...state.liked, wall])] })),
  removeFromLiked: (wall) =>
    set((state) => ({ liked: state.liked.filter((w) => w.id !== wall.id) })),
}));
