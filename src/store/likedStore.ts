import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ILikedStore } from "@/src/types/types";
import { zustandStorage } from "./zustandStorage";

export const useLikedStore = create(
  persist<ILikedStore>(
    (set) => ({
      liked: [],
      addToLiked: (wall) =>
        set((state) => ({ liked: [...new Set([...state.liked, wall])] })),
      removeFromLiked: (wall) =>
        set((state) => ({
          liked: state.liked.filter((w) => w.id !== wall.id),
        })),
    }),
    {
      name: "liked-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
