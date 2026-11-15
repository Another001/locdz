export type AuthRole =
  | "driver"
  | "dispatcher"
  | "admin"
  | "customer"
  | "staff";

export type Permission =
  | "dashboard:read"
  | "trips:read"
  | "trips:update"
  | "operations:read"
  | "operations:update"
  | "profile:read"
  | "profile:update"
  | "vehicle:read";

export interface AuthUser {
  id: string;
  identifier: string;
  name: string;
  roles: AuthRole[];
  permissions: Permission[];
}

export interface LoginInput {
  identifier: string;
  password: string;
  remember?: boolean;
}

export interface LoginTokens {
  tokenType?: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthErrorBody {
  message: string;
  code?: number;
}
