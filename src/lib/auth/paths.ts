export const LOGIN_PATH = "/dang-nhap";
export const FORBIDDEN_PATH = "/khong-co-quyen";

export function safeRedirectPath(
  value: string | null | undefined,
  fallback: string | null = null
): string | null {
  if (!value) return fallback;

  const path = value.trim();

  if (!path.startsWith("/")) return fallback;
  if (path.startsWith("//")) return fallback;
  if (path.startsWith("/\\")) return fallback;
  if (path === LOGIN_PATH || path.startsWith(`${LOGIN_PATH}?`)) {
    return fallback;
  }

  return path;
}
