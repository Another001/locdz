import { NextResponse } from "next/server";

import { rejectDriverTrip } from "@/lib/api/driver-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

interface RejectBody {
  reason?: unknown;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  const context = await getDriverApiContext("trips:update");

  if (!context.ok) return context.error;

  const { tripId } = await params;
  let body: RejectBody;

  try {
    body = (await request.json()) as RejectBody;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu không hợp lệ." },
      { status: 400 }
    );
  }

  const reason = typeof body.reason === "string" ? body.reason.trim() : "";

  if (reason.length < 3 || reason.length > 500) {
    return NextResponse.json(
      { message: "Vui lòng nhập lý do từ chối (3–500 ký tự)." },
      { status: 422 }
    );
  }

  try {
    const data = await rejectDriverTrip(context.token, tripId, reason);

    return NextResponse.json(data);
  } catch (error) {
    return backendErrorResponse(error);
  }
}
