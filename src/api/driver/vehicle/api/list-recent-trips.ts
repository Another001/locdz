import { authApi } from "@/api/method";
import type { DriverVehicleRecentTrip } from "@/types/driver";

import { DriverApiError, runDriverRequest } from "../../errors";
import { VEHICLE_RECENT_TRIPS_PATH } from "./_shared";

export function listVehicleRecentTripsAPI(): Promise<
  DriverVehicleRecentTrip[]
> {
  return runDriverRequest(async () => {
    const data = await authApi.get<DriverVehicleRecentTrip[]>(
      VEHICLE_RECENT_TRIPS_PATH
    );

    if (!Array.isArray(data)) {
      throw new DriverApiError("Không tìm thấy dữ liệu lịch sử chuyến.", 400);
    }

    return data;
  });
}
