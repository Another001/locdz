import { NextResponse } from "next/server";

import { updateDriverAssignmentStatus } from "@/lib/api/driver-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

const ALLOWED_STATUSES = ["PREPARING", "ARRIVED"] as const;

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
      { message: "Trạng thái chuẩn bị không hợp lệ." },
      { status: 422 }
    );
  }

  try {
    const data = await updateDriverAssignmentStatus(
      context.token,
      tripId,
      body.status
    );

    return NextResponse.json(data);
  } catch (error) {
    return backendErrorResponse(error);
  }
}
