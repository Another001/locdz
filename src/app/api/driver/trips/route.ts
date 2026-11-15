import { NextResponse } from "next/server";

import {
  getDriverTripDetail,
  getDriverTrips,
} from "@/lib/api/driver-backend";
import {
  needsTripDetail,
  normalizeDriverTrip,
} from "@/lib/api/driver-normalize";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

export async function GET() {
  const context = await getDriverApiContext("trips:read");

  if (!context.ok) return context.error;

  try {
    const items = await getDriverTrips(context.token);

    const trips = await Promise.all(
      items.map(async (item) => {
        if (!needsTripDetail(item) || !item.trip?.id) {
          return normalizeDriverTrip(item);
        }

        try {
          const detail = await getDriverTripDetail(
            context.token,
            item.trip.id
          );

          return normalizeDriverTrip(item, detail);
        } catch {
          return normalizeDriverTrip(item);
        }
      })
    );

    return NextResponse.json({ trips });
  } catch (error) {
    return backendErrorResponse(error);
  }
}
