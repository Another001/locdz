import { noAuthApi } from "../../method";
import { wrapRequest } from "../../types";

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type LoginResponse = {
  tokenType?: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
};

export function loginAPI(payload: LoginPayload): Promise<LoginResponse> {
  return noAuthApi.post<LoginResponse>("/auth/login", wrapRequest(payload));
}
