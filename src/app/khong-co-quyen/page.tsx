"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { logoutRequest } from "@/lib/auth/session";

export default function ForbiddenPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await logoutRequest().catch(() => undefined);
    router.replace("/dang-nhap");
    router.refresh();
  }

  return (
    <main
      id="main"
      className="flex min-h-dvh items-center justify-center bg-canvas px-4 py-10"
    >
      <section
        aria-labelledby="khong-co-quyen"
        className="w-full max-w-[520px] rounded-[20px] border border-line bg-surface p-[clamp(26px,3.4vw,38px)] text-center shadow-md"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600">
          <Icon name="lock" className="h-7 w-7" />
        </span>

        <h1
          id="khong-co-quyen"
          className="mt-5 font-heading text-[clamp(1.5rem,2.6vw,1.9rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink"
        >
          Không có quyền truy cập
        </h1>
        <p className="mt-3 text-[14.5px] leading-[1.65] text-slate-600">
          Tài khoản của bạn không được cấp quyền cho khu vực này. Hãy đăng nhập
          bằng tài khoản tài xế hoặc liên hệ điều phối để được hỗ trợ.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[13px] bg-sky-700 px-6 font-heading text-[15px] font-extrabold text-white transition-colors hover:bg-sky-800 disabled:opacity-70"
          >
            <Icon name="logout" className="h-[18px] w-[18px]" />
            {loading ? "Đang đăng xuất..." : "Đăng nhập tài khoản khác"}
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center text-[13.5px] font-semibold text-slate-600 transition-colors hover:text-sky-700"
          >
            Về trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}
