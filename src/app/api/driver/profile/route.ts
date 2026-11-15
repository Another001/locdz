import { NextResponse } from "next/server";

import {
  getDriverProfile as getDriverProfileBackend,
  updateDriverProfile as updateDriverProfileBackend,
} from "@/lib/api/driver-profile-backend";
import { getDriverApiContext } from "@/lib/api/route-context";
import { backendErrorResponse } from "@/lib/api/route-errors";

export async function GET() {
  const ctx = await getDriverApiContext("profile:read");
  if (!ctx.ok) return ctx.error;
  try {
    const data = await getDriverProfileBackend(ctx.token);
    return NextResponse.json({ code: 0, message: "OK", wsResponse: data });
  } catch (err: unknown) {
    return backendErrorResponse(err);
  }
}

export async function PATCH(req: Request) {
  const ctx = await getDriverApiContext("profile:update");
  if (!ctx.ok) return ctx.error;
  try {
    const body = await req.json();
    const data = await updateDriverProfileBackend(
      ctx.token,
      body.wsRequest ?? body
    );
    return NextResponse.json({ code: 0, message: "OK", wsResponse: data });
  } catch (err: unknown) {
    return backendErrorResponse(err);
  }
}