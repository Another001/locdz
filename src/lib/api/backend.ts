import type { LoginInput, LoginTokens } from "@/types/auth";

const API_BASE_URL = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8081"
).replace(/\/+$/, "");

const LOGIN_PATH = process.env.AUTH_LOGIN_PATH ?? "/api/v1/auth/login";

interface ApiEnvelope<T> {
  code?: number;
  message?: string;
  wsResponse?: T;
}

export class BackendError extends Error {
  readonly status: number;
  readonly code?: number;

  constructor(message: string, status = 502, code?: number) {
    super(message);
    this.name = "BackendError";
    this.status = status;
    this.code = code;
  }
}

export async function loginWithBackend(
  input: LoginInput
): Promise<LoginTokens> {
  const response = await fetch(`${API_BASE_URL}${LOGIN_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      wsRequest: {
        identifier: input.identifier,
        password: input.password,
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  }).catch(() => {
    throw new BackendError(
      "Không kết nối được tới máy chủ đăng nhập. Vui lòng thử lại sau."
    );
  });

  const text = await response.text();
  let body: ApiEnvelope<LoginTokens> | null = null;

  try {
    body = text ? (JSON.parse(text) as ApiEnvelope<LoginTokens>) : null;
  } catch {
    body = null;
  }

  const message =
    body?.message?.trim() ||
    (response.status === 401
      ? "Số điện thoại/email hoặc mật khẩu không đúng."
      : "Đăng nhập thất bại. Vui lòng thử lại.");

  if (!response.ok) {
    throw new BackendError(message, response.status, body?.code);
  }

  if (typeof body?.code === "number" && body.code !== 0) {
    throw new BackendError(message, 401, body.code);
  }

  const tokens =
    body?.wsResponse ?? (body as unknown as LoginTokens | null);

  if (!tokens?.accessToken) {
    throw new BackendError(
      "Máy chủ không trả về phiên đăng nhập hợp lệ.",
      502,
      body?.code
    );
  }

  return tokens;
}
