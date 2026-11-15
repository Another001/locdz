import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ACCESS_COOKIE } from "@/lib/auth/cookies";
import {
  FORBIDDEN_PATH,
  LOGIN_PATH,
  safeRedirectPath,
} from "@/lib/auth/paths";
import {
  hasPermission,
  requiredPermissionForPath,
} from "@/lib/auth/permissions";
import { userFromAccessToken } from "@/lib/auth/token";

const PUBLIC_PATHS = new Set<string>([LOGIN_PATH, FORBIDDEN_PATH]);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    if (pathname !== LOGIN_PATH) return NextResponse.next();

    const user = userFromAccessToken(
      request.cookies.get(ACCESS_COOKIE)?.value ?? ""
    );

    if (user) {
      const target =
        safeRedirectPath(request.nextUrl.searchParams.get("next"), "/") ?? "/";

      return NextResponse.redirect(new URL(target, request.url));
    }

    return NextResponse.next();
  }

  const user = userFromAccessToken(
    request.cookies.get(ACCESS_COOKIE)?.value ?? ""
  );

  if (!user) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    const next = `${pathname}${search}`;

    if (next !== "/") loginUrl.searchParams.set("next", next);

    return NextResponse.redirect(loginUrl);
  }

  const requiredPermission = requiredPermissionForPath(pathname);

  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    return NextResponse.redirect(new URL(FORBIDDEN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*).*)",
  ],
};
