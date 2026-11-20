"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useSessionStore } from "@/global-states/session-store";
import { FORBIDDEN_PATH, LOGIN_PATH } from "@/lib/auth/paths";
import {
  hasPermission,
  requiredPermissionForPath,
} from "@/lib/auth/permissions";

export function RequireSession({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSessionStore((state) => state.user);
  const ready = useSessionStore((state) => state.ready);

  const permission = requiredPermissionForPath(pathname);
  const allowed =
    Boolean(user) && (!permission || hasPermission(user, permission));

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      const next =
        pathname && pathname !== "/"
          ? `?next=${encodeURIComponent(pathname)}`
          : "";
      router.replace(`${LOGIN_PATH}${next}`);
      return;
    }

    if (!allowed) router.replace(FORBIDDEN_PATH);
  }, [ready, user, allowed, pathname, router]);

  if (!ready || !allowed) return null;

  return <>{children}</>;
}
