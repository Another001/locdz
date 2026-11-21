import { authApi } from "@/api/method";
import type { DriverTripDetail } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function getTripAPI(tripId: string): Promise<DriverTripDetail> {
  return runDriverRequest(() =>
    authApi.get<DriverTripDetail>(tripPath(tripId))
  );
}
