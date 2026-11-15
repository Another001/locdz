import { NextResponse } from "next/server";

import {
  getDriverVehicleRecentTrips as getDriverVehicleRecentTripsBackend,
} from "@/lib/api/driver-profile-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

export async function GET() {
  const ctx = await getDriverApiContext("vehicle:read");
  if (!ctx.ok) return ctx.error;
  try {
    const data = await getDriverVehicleRecentTripsBackend(ctx.token);
    return NextResponse.json({ code: 0, message: "OK", wsResponse: data });
  } catch (err: unknown) {
    return backendErrorResponse(err);
  }
}