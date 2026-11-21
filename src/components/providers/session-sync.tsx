"use client";

import { useEffect } from "react";

import { useSessionStore } from "@/global-states/session-store";
import { getCurrentUser } from "@/lib/auth/session";

export function SessionSync() {
  const setUser = useSessionStore((state) => state.setUser);
  const markReady = useSessionStore((state) => state.markReady);

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((user) => {
        if (!cancelled) setUser(user);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) markReady();
      });

    return () => {
      cancelled = true;
    };
  }, [setUser, markReady]);

  return null;
}
