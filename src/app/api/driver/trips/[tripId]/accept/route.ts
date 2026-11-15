import { NextResponse } from "next/server";

import { acceptDriverTrip } from "@/lib/api/driver-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  const context = await getDriverApiContext("trips:update");

  if (!context.ok) return context.error;

  const { tripId } = await params;

  try {
    const data = await acceptDriverTrip(context.token, tripId);

    return NextResponse.json(data);
  } catch (error) {
    return backendErrorResponse(error);
  }
}
