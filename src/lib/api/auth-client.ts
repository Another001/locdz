import type { AuthUser, LoginInput } from "@/types/auth";

export class AuthApiError extends Error {
  readonly status: number;
  readonly code?: number;

  constructor(message: string, status: number, code?: number) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.code = code;
  }
}

async function parseBody(response: Response) {
  return (await response.json().catch(() => null)) as
    | { user?: AuthUser; message?: string; code?: number }
    | null;
}

export async function loginRequest(input: LoginInput): Promise<AuthUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const body = await parseBody(response);

  if (!response.ok || !body?.user) {
    throw new AuthApiError(
      body?.message || "Đăng nhập thất bại. Vui lòng thử lại.",
      response.status,
      body?.code
    );
  }

  return body.user;
}

export async function logoutRequest(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch("/api/auth/me", { cache: "no-store" });

  if (response.status === 401) return null;
  if (!response.ok) return null;

  const body = await parseBody(response);

  return body?.user ?? null;
}
