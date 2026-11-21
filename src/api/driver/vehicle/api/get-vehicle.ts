import { authApi } from "@/api/method";
import type { DriverVehicleResponse } from "@/types/driver";

import { DriverApiError, runDriverRequest } from "../../errors";
import { VEHICLE_PATH } from "./_shared";

export function getVehicleAPI(): Promise<DriverVehicleResponse> {
  return runDriverRequest(async () => {
    const raw = await authApi.get<
      DriverVehicleResponse | DriverVehicleResponse[]
    >(VEHICLE_PATH);
    const data = Array.isArray(raw) ? raw[0] : raw;

    if (!data || typeof data !== "object") {
      throw new DriverApiError("Không tìm thấy thông tin xe.", 400);
    }

    return data;
  });
}
