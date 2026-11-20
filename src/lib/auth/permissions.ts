import type { AuthRole, AuthUser, Permission } from "@/types/auth";

export const DEFAULT_ROLE: AuthRole = "driver";

const ROLE_ALIASES: Record<string, AuthRole> = {
  driver: "driver",
  drivers: "driver",
  tai_xe: "driver",
  "tài xế": "driver",
  dispatcher: "dispatcher",
  dieu_phoi: "dispatcher",
  "điều phối": "dispatcher",
  admin: "admin",
  administrator: "admin",
  customer: "customer",
  passenger: "customer",
  khach_hang: "customer",
  "khách hàng": "customer",
  staff: "staff",
  employee: "staff",
  nhan_vien: "staff",
  "nhân viên": "staff",
};

const ROLE_PERMISSIONS: Record<AuthRole, Permission[]> = {
  driver: [
    "dashboard:read",
    "trips:read",
    "trips:update",
    "operations:read",
    "operations:update",
    "profile:read",
    "profile:update",
    "vehicle:read",
  ],
  dispatcher: [
    "dashboard:read",
    "trips:read",
    "trips:update",
    "operations:read",
    "operations:update",
  ],
  admin: [
    "dashboard:read",
    "trips:read",
    "trips:update",
    "operations:read",
    "operations:update",
    "profile:read",
    "profile:update",
    "vehicle:read",
  ],
  customer: ["profile:read", "profile:update"],
  staff: ["dashboard:read", "trips:read", "operations:read"],
};

const ROUTE_PERMISSIONS: Array<{ prefix: string; permission: Permission }> = [
  { prefix: "/chuyen", permission: "trips:read" },
  { prefix: "/dieu-hanh", permission: "operations:update" },
  { prefix: "/xe", permission: "vehicle:read" },
  { prefix: "/ho-so", permission: "profile:read" },
];

export function normalizeRole(value: string): AuthRole | null {
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/^role_/, "")
    .split(":")[0]
    .replace(/[\s-]+/g, "_");

  return ROLE_ALIASES[cleaned] ?? null;
}

export function permissionsForRoles(roles: AuthRole[]): Permission[] {
  const result = new Set<Permission>();

  for (const role of roles) {
    for (const permission of ROLE_PERMISSIONS[role] ?? []) {
      result.add(permission);
    }
  }

  return Array.from(result);
}

export function hasRole(user: AuthUser, role: AuthRole): boolean {
  return user.roles.includes(role);
}

export function hasAnyRole(user: AuthUser, roles: AuthRole[]): boolean {
  return roles.some((role) => user.roles.includes(role));
}

export function hasPermission(
  user: AuthUser | null | undefined,
  permission: Permission
): boolean {
  if (!user) return false;
  if (user.roles.includes("admin")) return true;

  if (user.permissions.includes(permission)) return true;

  const [resource] = permission.split(":");
  return user.permissions.some(
    (granted) => String(granted) === `${resource}:*` || String(granted) === "*"
  );
}

export function requiredPermissionForPath(
  pathname: string
): Permission | null {
  if (pathname === "/") return "dashboard:read";

  return (
    ROUTE_PERMISSIONS.find(({ prefix }) => pathname.startsWith(prefix))
      ?.permission ?? null
  );
}
