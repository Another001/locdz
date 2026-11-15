import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AuthUser, Permission } from "@/types/auth";

import { ACCESS_COOKIE } from "./cookies";
import { FORBIDDEN_PATH, LOGIN_PATH } from "./paths";
import { hasPermission } from "./permissions";
import { userFromAccessToken } from "./token";

export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get(ACCESS_COOKIE)?.value ?? null;
}

export async function getSession(): Promise<AuthUser | null> {
  const token = await getAccessToken();

  return userFromAccessToken(token ?? "");
}

export async function requireSession(): Promise<AuthUser> {
  const user = await getSession();

  if (!user) redirect(LOGIN_PATH);

  return user;
}

export async function requirePermission(
  permission: Permission
): Promise<AuthUser> {
  const user = await requireSession();

  if (!hasPermission(user, permission)) redirect(FORBIDDEN_PATH);

  return user;
}
