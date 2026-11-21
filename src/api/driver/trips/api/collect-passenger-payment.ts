import { authApi } from "@/api/method";
import { wrapRequest } from "@/api/types";
import type { DriverCollectPaymentResponse } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function collectPassengerPaymentAPI(
  tripId: string,
  ticketId: string,
  collectedAmount: number
): Promise<DriverCollectPaymentResponse> {
  return runDriverRequest(() =>
    authApi.post<DriverCollectPaymentResponse>(
      tripPath(
        tripId,
        `passengers/${encodeURIComponent(ticketId)}/collect-payment`
      ),
      wrapRequest({ collectedAmount })
    )
  );
}
