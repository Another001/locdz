import { authApi } from "../../method";

export type MeResponse = {
  id: string;
  fullName?: string;
  phone?: string;
  email?: string;
  accountStatus?: string;
  authorities?: string[];
};

export function getMeAPI(): Promise<MeResponse> {
  return authApi.get<MeResponse>("/me");
}
