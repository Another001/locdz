import type { AuthProfile, AuthRole, AuthUser } from "@/types/auth";

import {
  DEFAULT_ROLE,
  normalizeRole,
  permissionsForRoles,
} from "./permissions";

export type JwtClaims = Record<string, unknown>;

function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

export function decodeJwtClaims(token: string): JwtClaims | null {
  const parts = token.split(".");

  if (parts.length < 2) return null;

  try {
    return JSON.parse(decodeBase64Url(parts[1])) as JwtClaims;
  } catch {
    return null;
  }
}

export function isTokenExpired(
  claims: JwtClaims | null,
  clockSkewSeconds = 0
): boolean {
  if (!claims) return true;

  const exp = claims.exp;
  if (typeof exp !== "number") return false;

  return exp * 1000 <= Date.now() - clockSkewSeconds * 1000;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function collectStrings(value: unknown, result: string[]): void {
  if (typeof value === "string") {
    result.push(...value.split(/[\s,]+/).filter(Boolean));
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, result);
    return;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      if (Array.isArray(item)) collectStrings(item, result);
    }
  }
}

export function rolesFromValues(value: unknown): AuthRole[] {
  const raw: string[] = [];

  collectStrings(value, raw);

  const roles = new Set<AuthRole>();

  for (const item of raw) {
    const role = normalizeRole(item);
    if (role) roles.add(role);
  }

  if (roles.size === 0) roles.add(DEFAULT_ROLE);

  return Array.from(roles);
}

function rolesFromClaims(claims: JwtClaims): AuthRole[] {
  return rolesFromValues([
    claims.role,
    claims.roles,
    claims.authorities,
    claims.scope,
    claims.scopes,
    claims.realm_access,
    claims.resource_access,
  ]);
}

export function displayNameFromIdentifier(identifier: string): string {
  const localPart = identifier.includes("@")
    ? identifier.slice(0, identifier.indexOf("@"))
    : identifier;

  return (
    localPart
      .replace(/[._-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/(^|\s)\S/g, (char) => char.toUpperCase()) || "Tài xế"
  );
}

export function userFromAccessToken(
  accessToken: string,
  fallbackIdentifier?: string,
  profile?: AuthProfile
): AuthUser | null {
  const claims = decodeJwtClaims(accessToken);

  if (!claims || isTokenExpired(claims)) return null;

  const identifier =
    readString(profile?.email) ??
    readString(profile?.phone) ??
    readString(claims.email) ??
    readString(claims.preferred_username) ??
    readString(claims.username) ??
    readString(claims.phone_number) ??
    readString(fallbackIdentifier) ??
    readString(claims.sub) ??
    "driver";

  const name =
    readString(profile?.fullName) ??
    readString(claims.name) ??
    readString(claims.full_name) ??
    readString(claims.display_name) ??
    displayNameFromIdentifier(identifier);

  const roles =
    profile?.authorities && profile.authorities.length > 0
      ? rolesFromValues(profile.authorities)
      : rolesFromClaims(claims);

  return {
    id: readString(profile?.id) ?? readString(claims.sub) ?? identifier,
    identifier,
    name,
    roles,
    permissions: permissionsForRoles(roles),
  };
}

export function accessTokenFromCookieValue(
  token: string | undefined
): AuthUser | null {
  if (!token) return null;

  return userFromAccessToken(token);
}
