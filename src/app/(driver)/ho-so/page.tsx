import { Icon } from "@/components/ui/icon";

import { LicensePanel } from "./_components/license-panel";
import { ProfilePanel } from "./_components/profile-panel";

export default function DriverProfilePage() {
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
              <ProfilePanel />
              <LicensePanel />

              <div className="mt-3 flex flex-col items-center gap-3 border-t border-dashed border-line pt-6">
                <button
                  type="button"
                  className="flex min-h-12 w-full max-w-[320px] items-center justify-center gap-2 rounded-[14px] border border-red-200 bg-red-50 text-[14.5px] font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 hover:text-red-700"
                >
                  <Icon name="logout" className="h-[18px] w-[18px]" />
                  Đăng xuất khỏi thiết bị này
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
