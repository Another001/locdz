import { NextResponse } from "next/server";

import type { AuthUser, Permission } from "@/types/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { getAccessToken, getSession } from "@/lib/auth/server";

type DriverApiContext =
  | { ok: true; token: string; user: AuthUser }
  | { ok: false; error: NextResponse };

export async function getDriverApiContext(
  permission: Permission
): Promise<DriverApiContext> {
  const [user, token] = await Promise.all([getSession(), getAccessToken()]);

  if (!user || !token) {
    return {
      ok: false,
      error: NextResponse.json(
        { message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." },
        { status: 401 }
      ),
    };
  }

  if (!hasPermission(user, permission)) {
    return {
      ok: false,
      error: NextResponse.json(
        { message: "Tài khoản không có quyền thực hiện thao tác này." },
        { status: 403 }
      ),
    };
  }

  return { ok: true, token, user };
}
