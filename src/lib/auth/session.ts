import { getMeAPI } from "@/api/auth/api/get-me";
import { loginAPI } from "@/api/auth/api/login";
import { logoutAPI } from "@/api/auth/api/logout";
import { ApiError } from "@/api/types";
import { useSessionStore } from "@/global-states/session-store";
import { userFromAccessToken } from "@/lib/auth/token";
import { STORAGE_KEYS, getItem, removeItem, setItem } from "@/utils/storage";
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

function toAuthApiError(error: unknown): AuthApiError {
  if (error instanceof ApiError) {
    return new AuthApiError(error.message, error.status ?? 0, error.code);
  }

  return new AuthApiError(
    "Không kết nối được máy chủ. Vui lòng kiểm tra mạng và thử lại.",
    0
  );
}

function clearTokens(): void {
  removeItem(STORAGE_KEYS.accessToken);
  removeItem(STORAGE_KEYS.refreshToken);
}

export async function loginRequest(input: LoginInput): Promise<AuthUser> {
  try {
    const tokens = await loginAPI({
      identifier: input.identifier,
      password: input.password,
    });

    if (!tokens?.accessToken) {
      throw new AuthApiError(
        "Phiên đăng nhập không hợp lệ. Vui lòng thử lại.",
        502
      );
    }

    setItem(STORAGE_KEYS.accessToken, tokens.accessToken);

    if (tokens.refreshToken) {
      setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
    }

    const profile = await getMeAPI().catch(() => null);
    const currentToken = getItem(STORAGE_KEYS.accessToken);

    if (!currentToken) {
      throw new AuthApiError(
        "Phiên đăng nhập không hợp lệ. Vui lòng thử lại.",
        401
      );
    }

    const user = userFromAccessToken(
      currentToken,
      input.identifier,
      profile ?? undefined
    );

    if (!user) {
      throw new AuthApiError(
        "Phiên đăng nhập không hợp lệ. Vui lòng thử lại.",
        502
      );
    }

    useSessionStore.getState().setUser(user);
    useSessionStore.getState().markReady();

    return user;
  } catch (error) {
    if (error instanceof AuthApiError) throw error;
    throw toAuthApiError(error);
  }
}

export async function logoutRequest(): Promise<void> {
  await logoutAPI().catch(() => undefined);

  clearTokens();
  useSessionStore.getState().clearSession();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = getItem(STORAGE_KEYS.accessToken);

  if (!token) return null;

  try {
    const profile = await getMeAPI();
    const currentToken = getItem(STORAGE_KEYS.accessToken) ?? token;
    const user = userFromAccessToken(
      currentToken,
      profile.email ?? profile.phone,
      profile
    );

    if (!user) {
      clearTokens();
      useSessionStore.getState().clearSession();
      return null;
    }

    return user;
  } catch {
    clearTokens();
    useSessionStore.getState().clearSession();
    return null;
  }
}
