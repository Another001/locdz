import { authApi } from "../../method";

export function logoutAPI(): Promise<void> {
  return authApi.post<void>("/auth/logout");
}
