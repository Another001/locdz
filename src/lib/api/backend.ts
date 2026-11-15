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

interface BackendRequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
  fallbackMessage?: string;
  unauthorizedMessage?: string;
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

export async function backendRequest<T>(
  path: string,
  options: BackendRequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body:
      options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  }).catch(() => {
    throw new BackendError(
      options.fallbackMessage ??
        "Không kết nối được tới máy chủ. Vui lòng thử lại sau."
    );
  });

  const text = await response.text();
  let body: ApiEnvelope<T> | null = null;

  try {
    body = text ? (JSON.parse(text) as ApiEnvelope<T>) : null;
  } catch {
    body = null;
  }

  const message =
    body?.message?.trim() ||
    (response.status === 401
      ? options.unauthorizedMessage ?? "Phiên đăng nhập đã hết hạn."
      : options.fallbackMessage ?? "Yêu cầu thất bại. Vui lòng thử lại.");

  if (!response.ok) {
    throw new BackendError(message, response.status, body?.code);
  }

  if (typeof body?.code === "number" && body.code !== 0) {
    throw new BackendError(message, 400, body.code);
  }

  const data = body?.wsResponse ?? (body as unknown as T | null);

  if (data === undefined || data === null) {
    throw new BackendError(
      options.fallbackMessage ?? "Máy chủ không trả về dữ liệu hợp lệ.",
      502,
      body?.code
    );
  }

  return data;
}

export function loginWithBackend(input: LoginInput): Promise<LoginTokens> {
  return backendRequest<LoginTokens>(LOGIN_PATH, {
    method: "POST",
    body: {
      wsRequest: {
        identifier: input.identifier,
        password: input.password,
      },
    },
    fallbackMessage: "Đăng nhập thất bại. Vui lòng thử lại.",
    unauthorizedMessage:
      "Số điện thoại/email hoặc mật khẩu không đúng.",
  });
}
