import { authApi } from "@/api/method";
import { wrapRequest } from "@/api/types";
import type { DriverPassengerStatusResponse } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function updatePassengerStatusAPI(
  tripId: string,
  ticketId: string,
  status: string
): Promise<DriverPassengerStatusResponse> {
  return runDriverRequest(() =>
    authApi.patch<DriverPassengerStatusResponse>(
      tripPath(
        tripId,
        `passengers/${encodeURIComponent(ticketId)}/status`
      ),
      wrapRequest({ status })
    )
  );
}
