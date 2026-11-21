import { authApi } from "@/api/method";
import { wrapRequest } from "@/api/types";
import type { DriverTripStatusResponse } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function updateTripStatusAPI(
  tripId: string,
  status: "IN_PROGRESS" | "COMPLETED",
  actualAt?: string
): Promise<DriverTripStatusResponse> {
  return runDriverRequest(() =>
    authApi.patch<DriverTripStatusResponse>(
      tripPath(tripId, "status"),
      wrapRequest({
        status,
        ...(actualAt ? { actualAt } : {}),
      })
    )
  );
}
