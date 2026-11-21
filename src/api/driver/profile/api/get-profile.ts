import { authApi } from "@/api/method";
import type { DriverProfileResponse } from "@/types/driver";

import { DriverApiError, runDriverRequest } from "../../errors";
import { PROFILE_PATH } from "./_shared";

export function getProfileAPI(): Promise<DriverProfileResponse> {
  return runDriverRequest(async () => {
    const raw = await authApi.get<
      DriverProfileResponse | DriverProfileResponse[]
    >(PROFILE_PATH);
    const data = Array.isArray(raw) ? raw[0] : raw;

    if (!data || typeof data !== "object") {
      throw new DriverApiError("Không tìm thấy dữ liệu hồ sơ.", 400);
    }

    return data;
  });
}
