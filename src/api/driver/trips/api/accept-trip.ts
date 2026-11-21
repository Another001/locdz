import { authApi } from "@/api/method";
import type { DriverTripStatusResponse } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function acceptTripAPI(
  tripId: string
): Promise<DriverTripStatusResponse> {
  return runDriverRequest(() =>
    authApi.post<DriverTripStatusResponse>(tripPath(tripId, "accept"), {})
  );
}
