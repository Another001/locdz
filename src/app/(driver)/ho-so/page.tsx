"use client";

import { LogoutButton } from "@/components/auth/logout-button";

import { LicensePanel } from "./_components/license-panel";
import { ProfilePanel } from "./_components/profile-panel";
import { useProfile } from "./_hooks/use-profile";

export default function DriverProfilePage() {
  const { profile, loading, error, reload } = useProfile();

  if (loading) {
    return (
      <main id="main">
        <div className="pb-[clamp(56px,6vw,88px)] pt-[clamp(32px,4vw,56px)]">
          <div className="mx-auto w-full max-w-[1240px] px-4 min-[769px]:px-5">
            <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-5">
              <div>
                <span className="inline-flex items-center gap-[9px] text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-[22px] rounded bg-sky-500"
                  />
                  Tài khoản
                </span>
                <h1 className="mt-2.5 text-balance font-heading text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink">
                  Hồ sơ cá nhân
                </h1>
                <p className="mt-2 text-[15px] leading-[1.6] text-slate-600">
                  Thông tin tài xế và tài khoản đăng nhập của bạn.
                </p>
              </div>
            </header>
            <div className="mt-6 max-w-[860px] flex items-center justify-center min-h-[400px]">
              Đang tải hồ sơ...
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main">
        <div className="pb-[clamp(56px,6vw,88px)] pt-[clamp(32px,4vw,56px)]">
          <div className="mx-auto w-full max-w-[1240px] px-4 min-[769px]:px-5">
            <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-5">
              <div>
                <span className="inline-flex items-center gap-[9px] text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-[22px] rounded bg-sky-500"
                  />
                  Tài khoản
                </span>
                <h1 className="mt-2.5 text-balance font-heading text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink">
                  Hồ sơ cá nhân
                </h1>
                <p className="mt-2 text-[15px] leading-[1.6] text-slate-600">
                  Thông tin tài xế và tài khoản đăng nhập của bạn.
                </p>
              </div>
            </header>
            <div className="mt-6 max-w-[860px]">
              <div className="rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs">
                <p className="text-[14px] text-red-700">{error}</p>
                <button
                  onClick={reload}
                  className="mt-4 inline-flex items-center gap-[9px] rounded-[13px] bg-sky-700 px-[26px] text-[15px] font-bold leading-none text-white hover:bg-sky-800"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  return (
    <main id="main">
      <div className="pb-[clamp(56px,6vw,88px)] pt-[clamp(32px,4vw,56px)]">
        <div className="mx-auto w-full max-w-[1240px] px-4 min-[769px]:px-5">
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-5">
            <div>
              <span className="inline-flex items-center gap-[9px] text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-[22px] rounded bg-sky-500"
                />
                Tài khoản
              </span>
              <h1 className="mt-2.5 text-balance font-heading text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink">
                Hồ sơ cá nhân
              </h1>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate-600">
                Thông tin tài xế và tài khoản đăng nhập của bạn.
              </p>
            </div>
          </header>

          <div className="mt-6 max-w-[860px]">
            <div className="grid gap-[clamp(18px,2.4vw,24px)]">
              <ProfilePanel data={profile} />
              <LicensePanel data={profile} />

              <div className="mt-3 flex flex-col items-center gap-3 border-t border-dashed border-line pt-6">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
