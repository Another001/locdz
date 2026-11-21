import { authApi } from "@/api/method";
import { wrapRequest } from "@/api/types";
import type { DriverTripStatusResponse } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function updateAssignmentStatusAPI(
  tripId: string,
  status: "PREPARING" | "ARRIVED"
): Promise<DriverTripStatusResponse> {
  return runDriverRequest(() =>
    authApi.patch<DriverTripStatusResponse>(
      tripPath(tripId, "assignment-status"),
      wrapRequest({ status })
    )
  );
}
