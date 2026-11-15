import { NextResponse } from "next/server";

import { collectDriverPassengerPayment } from "@/lib/api/driver-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

interface CollectPaymentBody {
  collectedAmount?: unknown;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tripId: string; ticketId: string }> }
) {
  const context = await getDriverApiContext("trips:update");

  if (!context.ok) return context.error;

  const { tripId, ticketId } = await params;
  let body: CollectPaymentBody;

  try {
    body = (await request.json()) as CollectPaymentBody;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu không hợp lệ." },
      { status: 400 }
    );
  }

  const collectedAmount =
    typeof body.collectedAmount === "number" &&
    !Number.isNaN(body.collectedAmount) &&
    body.collectedAmount >= 0
      ? body.collectedAmount
      : undefined;

  if (collectedAmount === undefined) {
    return NextResponse.json(
      { message: "Số tiền thu không hợp lệ." },
      { status: 422 }
    );
  }

  try {
    const data = await collectDriverPassengerPayment(
      context.token,
      tripId,
      ticketId,
      collectedAmount
    );

    return NextResponse.json(data);
  } catch (error) {
    return backendErrorResponse(error);
  }
}