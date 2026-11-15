import { NextResponse } from "next/server";

import { BackendError } from "./backend";

export function backendErrorResponse(error: unknown) {
  if (error instanceof BackendError) {
    const status =
      error.status >= 400 && error.status < 500 ? error.status : 502;

    return NextResponse.json(
      { message: error.message, code: error.code },
      { status }
    );
  }

  return NextResponse.json(
    { message: "Đã có lỗi xảy ra. Vui lòng thử lại." },
    { status: 500 }
  );
}
