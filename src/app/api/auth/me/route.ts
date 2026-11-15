import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/server";

export async function GET() {
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { message: "Bạn chưa đăng nhập." },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
