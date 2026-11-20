import { create } from "zustand";

export type SessionUser = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type SessionState = {
  user: SessionUser | null;
  ready: boolean;
  readyWithUser: boolean;
  setUser: (user: SessionUser | null) => void;
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
