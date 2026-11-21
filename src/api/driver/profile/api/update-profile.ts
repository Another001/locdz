import { authApi } from "@/api/method";
import { wrapRequest } from "@/api/types";
import type {
  DriverProfileResponse,
  UpdateDriverProfileRequest,
} from "@/types/driver";

import { DriverApiError, runDriverRequest } from "../../errors";
import { PROFILE_PATH } from "./_shared";

export function updateProfileAPI(
  data: UpdateDriverProfileRequest
): Promise<DriverProfileResponse> {
  return runDriverRequest(async () => {
    const raw = await authApi.patch<
      DriverProfileResponse | DriverProfileResponse[]
    >(PROFILE_PATH, wrapRequest(data));
    const result = Array.isArray(raw) ? raw[0] : raw;

    if (!result || typeof result !== "object") {
      throw new DriverApiError("Không cập nhật được hồ sơ.", 400);
    }

    return result;
  });
}
