import Link from "next/link";

import { Icon } from "@/components/ui/icon";

export function Operations() {
  return (
    <section
      id="thong-tin-tai-xe"
      className="mt-12 min-[768px]:mt-16 min-[1024px]:mt-[72px]"
    >
      <div className="mb-[18px] flex items-end justify-between gap-3 min-[768px]:mb-6">
        <div className="max-w-[640px]">
          <h2 className="text-balance font-heading text-[clamp(1.35rem,2vw,1.7rem)] font-extrabold leading-tight tracking-[-0.025em] text-ink max-[640px]:text-[1.3rem]">
            Thông tin vận hành
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(0,360px)] min-[1025px]:gap-9 max-[640px]:gap-4">
        <div className="grid gap-[18px]">
          <div className="flex items-start gap-[15px] rounded-[20px] border border-line bg-surface p-[22px] max-[640px]:gap-3 max-[640px]:p-[18px] max-[400px]:p-4">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-sky-50 text-sky-700 shadow-[inset_0_0_0_1px_rgba(3,105,161,0.14)]">
              <Icon name="calendar" className="h-[22px] w-[22px]" />
            </span>
            <div className="min-w-0">
              <strong className="block font-heading text-sm font-extrabold leading-snug text-ink">
                Đừng quên kiểm tra lịch chạy
              </strong>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                Hãy kiểm tra giờ xuất phát, điểm đón và số lượng hành khách
                trước mỗi chuyến đi.
              </p>
            </div>
          </div>
        </div>

        <aside className="grid gap-4 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-1 max-[768px]:grid-cols-1">
          <div className="rounded-[20px] border border-line bg-surface p-[23px] shadow-xs max-[640px]:p-[19px]">
            <div className="flex items-start gap-[13px]">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-navy-50 text-navy-800 shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)]">
                <Icon name="car" className="h-[22px] w-[22px]" />
              </span>

              <div className="min-w-0 flex-1">
                <span className="block text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Xe được giao
                </span>
                <strong className="mt-1 block font-heading text-sm font-bold leading-snug text-ink">
                  Ford Transit 16 chỗ
                </strong>
              </div>

              <Link
                href="/xe"
                className="inline-flex min-h-11 flex-none items-center gap-1 text-xs font-bold text-sky-700 transition-[gap] hover:gap-2.5"
              >
                Chi tiết
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-[19px] grid grid-cols-2 gap-x-[18px] gap-y-4 border-t border-line-soft pt-[17px]">
              <div className="min-w-0">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-slate-500">
                  Biển số
                </dt>
                <dd className="mt-[5px] font-heading text-[13px] font-bold leading-normal text-ink">
                  51A-123.45
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-slate-500">
                  Sức chứa
                </dt>
                <dd className="mt-[5px] font-heading text-[13px] font-bold leading-normal text-ink">
                  16 chỗ
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-slate-500">
                  Đăng kiểm
                </dt>
                <dd className="mt-[5px] font-heading text-[13px] font-bold leading-normal text-ink">
                  12/2026
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-slate-500">
                  Trạng thái
                </dt>
                <dd className="mt-[5px]">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap text-emerald-700">
                    Hoạt động
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[20px] border border-line bg-surface p-6 shadow-xs max-[640px]:p-[19px]">
            <h3 className="font-heading text-base font-bold leading-tight tracking-[-0.02em] text-ink">
              Lối tắt
            </h3>

            <ul className="mt-[17px] grid gap-3">
              <li>
                <Link
                  href="/ho-so"
                  className="flex min-h-[62px] items-center gap-[13px] rounded-[10px] border border-line-soft bg-canvas px-[15px] py-3 transition-colors hover:border-[#cfe6f6] hover:bg-sky-50"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-emerald-50 text-emerald-600 shadow-[inset_0_0_0_1px_rgba(5,150,105,0.16)]">
                    <Icon name="user" className="h-[22px] w-[22px]" />
                  </span>

                  <span className="min-w-0">
                    <strong className="block font-heading text-[13px] font-bold leading-snug text-ink">
                      Hồ sơ cá nhân
                    </strong>
                    <span className="mt-1 block text-[11.5px] leading-normal text-slate-500">
                      Thông tin và giấy phép lái xe
                    </span>
                  </span>

                  <Icon
                    name="arrow-right"
                    className="ml-auto h-4 w-4 flex-none text-slate-400"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
