import { NextResponse } from "next/server";

import { updateDriverPassengerStatus } from "@/lib/api/driver-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

const ALLOWED_STATUSES = ["PICKED_UP", "DROPPED_OFF"] as const;

type AllowedStatus = (typeof ALLOWED_STATUSES)[number];

interface StatusBody {
  status?: unknown;
}

function isAllowedStatus(value: unknown): value is AllowedStatus {
  return (
    typeof value === "string" &&
    (ALLOWED_STATUSES as readonly string[]).includes(value)
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ tripId: string; ticketId: string }> }
) {
  const context = await getDriverApiContext("trips:update");

  if (!context.ok) return context.error;

  const { tripId, ticketId } = await params;
  let body: StatusBody;

  try {
    body = (await request.json()) as StatusBody;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu không hợp lệ." },
      { status: 400 }
    );
  }

  if (!isAllowedStatus(body.status)) {
    return NextResponse.json(
      { message: "Trạng thái hành khách không hợp lệ." },
      { status: 422 }
    );
  }

  try {
    const data = await updateDriverPassengerStatus(
      context.token,
      tripId,
      ticketId,
      body.status
    );

    return NextResponse.json(data);
  } catch (error) {
    return backendErrorResponse(error);
  }
}