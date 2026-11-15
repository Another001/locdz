export const ACCESS_COOKIE = "vvv_driver_access";
export const REFRESH_COOKIE = "vvv_driver_refresh";

export const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

export function accessMaxAge(expiresIn?: number): number {
  if (typeof expiresIn !== "number" || !Number.isFinite(expiresIn)) {
    return 60 * 60;
  }

  const seconds = Math.floor(expiresIn);

  if (seconds <= 0) return 60 * 60;

  return Math.min(Math.max(seconds, 60), 60 * 60 * 24);
}

export function cookieOptions(persistent: boolean, maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(persistent ? { maxAge } : {}),
  };
}
