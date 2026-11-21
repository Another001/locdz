import { authApi } from "@/api/method";
import { wrapRequest } from "@/api/types";
import type { DriverIncidentResponse } from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { tripPath } from "./_shared";

export function reportIncidentAPI(
  tripId: string,
  type: string,
  description: string
): Promise<DriverIncidentResponse> {
  return runDriverRequest(() =>
    authApi.post<DriverIncidentResponse>(
      tripPath(tripId, "incidents"),
      wrapRequest({ type, description })
    )
  );
}
