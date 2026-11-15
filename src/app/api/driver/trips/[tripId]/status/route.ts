import { NextResponse } from "next/server";

import { updateDriverTripStatus } from "@/lib/api/driver-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

const ALLOWED_STATUSES = ["IN_PROGRESS", "COMPLETED"] as const;

type AllowedStatus = (typeof ALLOWED_STATUSES)[number];

interface StatusBody {
  status?: unknown;
  actualAt?: unknown;
}

function isAllowedStatus(value: unknown): value is AllowedStatus {
  return (
    typeof value === "string" &&
    (ALLOWED_STATUSES as readonly string[]).includes(value)
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  const context = await getDriverApiContext("trips:update");

  if (!context.ok) return context.error;

  const { tripId } = await params;
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
      { message: "Trạng thái chuyến không hợp lệ." },
      { status: 422 }
    );
  }

  const actualAt =
    typeof body.actualAt === "string" && !Number.isNaN(Date.parse(body.actualAt))
      ? body.actualAt
      : undefined;

  try {
    const data = await updateDriverTripStatus(
      context.token,
      tripId,
      body.status,
      actualAt
    );

    return NextResponse.json(data);
  } catch (error) {
    return backendErrorResponse(error);
  }
}
