"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { logoutRequest } from "@/lib/auth/session";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await logoutRequest().catch(() => undefined);

    router.replace("/dang-nhap");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex min-h-12 w-full max-w-[320px] items-center justify-center gap-2 rounded-[14px] border border-red-200 bg-red-50 text-[14.5px] font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 hover:text-red-700 disabled:opacity-70"
    >
      <Icon name="logout" className="h-[18px] w-[18px]" />
      {loading ? "Đang đăng xuất..." : "Đăng xuất khỏi thiết bị này"}
    </button>
  );
}
