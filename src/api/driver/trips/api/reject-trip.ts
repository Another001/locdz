import { authApi } from "@/api/method";
import { wrapRequest } from "@/api/types";
import type { DriverRejectTripResponse } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function rejectTripAPI(
  tripId: string,
  reason: string
): Promise<DriverRejectTripResponse> {
  return runDriverRequest(() =>
    authApi.post<DriverRejectTripResponse>(
      tripPath(tripId, "reject"),
      wrapRequest({ reason })
    )
  );
}
