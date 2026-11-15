import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { BackendError, loginWithBackend } from "@/lib/api/backend";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  accessMaxAge,
  cookieOptions,
} from "@/lib/auth/cookies";
import { userFromAccessToken } from "@/lib/auth/token";

interface LoginBody {
  identifier?: unknown;
  password?: unknown;
  remember?: unknown;
}

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu đăng nhập không hợp lệ." },
      { status: 400 }
    );
  }

  const identifier = readText(body.identifier);
  const password = typeof body.password === "string" ? body.password : "";
  const remember = body.remember === true;

  if (!identifier || !password) {
    return NextResponse.json(
      { message: "Vui lòng nhập đầy đủ tài khoản và mật khẩu." },
      { status: 422 }
    );
  }

  try {
    const tokens = await loginWithBackend({ identifier, password });
    const user = userFromAccessToken(tokens.accessToken, identifier);

    if (!user) {
      return NextResponse.json(
        { message: "Phiên đăng nhập không hợp lệ. Vui lòng thử lại." },
        { status: 502 }
      );
    }

    const cookieStore = await cookies();
    const accessAge = accessMaxAge(tokens.expiresIn);

    cookieStore.set(
      ACCESS_COOKIE,
      tokens.accessToken,
      cookieOptions(remember, accessAge)
    );

    if (tokens.refreshToken) {
      cookieStore.set(
        REFRESH_COOKIE,
        tokens.refreshToken,
        cookieOptions(remember, REFRESH_MAX_AGE)
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    if (error instanceof BackendError) {
      const status =
        error.status >= 400 && error.status < 500 ? error.status : 502;

      return NextResponse.json(
        { message: error.message, code: error.code },
        { status }
      );
    }

    return NextResponse.json(
      { message: "Đã có lỗi xảy ra khi đăng nhập. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
