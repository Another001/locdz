import { authApi } from "@/api/method";
import { needsTripDetail, normalizeDriverTrip } from "@/lib/driver/trips";
import type {
  DriverTripDetail,
  DriverTripListItem,
  ScheduleTrip,
} from "@/types/driver";

import { runDriverRequest } from "../../errors";
import { TRIPS_PATH, tripPath } from "./_shared";

export function listTripsAPI(): Promise<ScheduleTrip[]> {
  return runDriverRequest(async () => {
    const items = await authApi.get<DriverTripListItem[]>(TRIPS_PATH);

    return Promise.all(
      items.map(async (item) => {
        if (!needsTripDetail(item) || !item.trip?.id) {
          return normalizeDriverTrip(item);
        }

        try {
          const detail = await authApi.get<DriverTripDetail>(
            tripPath(item.trip.id)
          );

          return normalizeDriverTrip(item, detail);
        } catch {
          return normalizeDriverTrip(item);
        }
      })
    );
  });
}
