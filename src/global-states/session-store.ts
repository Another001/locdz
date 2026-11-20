import { create } from "zustand";

import type { AuthUser } from "@/types/auth";

export type SessionUser = AuthUser;

type SessionState = {
  user: AuthUser | null;
  ready: boolean;
  readyWithUser: boolean;
  setUser: (user: AuthUser | null) => void;
  markReady: () => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  user: null,
  ready: false,
  readyWithUser: false,

  setUser: (user) => set({ user }),

  markReady: () =>
    set((state) => ({ ready: true, readyWithUser: Boolean(state.user) })),

  clearSession: () => set({ user: null, readyWithUser: false }),
}));
