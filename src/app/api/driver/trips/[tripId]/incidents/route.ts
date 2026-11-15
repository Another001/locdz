import { NextResponse } from "next/server";

import { reportDriverIncident } from "@/lib/api/driver-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

interface IncidentBody {
  type?: unknown;
  description?: unknown;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tripId: string }> }
) {
  const context = await getDriverApiContext("trips:update");

  if (!context.ok) return context.error;

  const { tripId } = await params;
  let body: IncidentBody;

  try {
    body = (await request.json()) as IncidentBody;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu không hợp lệ." },
      { status: 400 }
    );
  }

  const type = typeof body.type === "string" ? body.type : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";

  if (!type) {
    return NextResponse.json(
      { message: "Vui lòng chọn loại sự cố." },
      { status: 422 }
    );
  }

  if (description.length < 3 || description.length > 500) {
    return NextResponse.json(
      { message: "Vui lòng nhập mô tả sự cố (3–500 ký tự)." },
      { status: 422 }
    );
  }

  try {
    const data = await reportDriverIncident(
      context.token,
      tripId,
      type,
      description
    );

    return NextResponse.json(data);
  } catch (error) {
    return backendErrorResponse(error);
  }
}