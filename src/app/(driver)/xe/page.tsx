import { vehiclePage } from "@/lib/mock/vehicle";

import { VehicleDocuments } from "./_components/vehicle-documents";
import { VehicleInfo } from "./_components/vehicle-info";
import { VehicleTrips } from "./_components/vehicle-trips";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";

export default function VehiclePage() {
  return (
    <main id="main">
      <div className="pb-[clamp(56px,6vw,88px)] pt-[clamp(32px,4vw,56px)]">
        <div className="mx-auto w-full max-w-[1240px] px-4 md:px-5">
          <header className="border-b border-line-soft pb-5">
            <span className="inline-flex items-center gap-[9px] text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
              <span
                aria-hidden="true"
                className="h-0.5 w-[22px] rounded bg-sky-500"
              />
              Phương tiện
            </span>
            <h1 className="mt-2.5 text-balance font-heading text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink">
              Xe được giao
            </h1>
          </header>

          <div className="mt-6 grid grid-cols-1 items-start gap-[clamp(20px,3vw,32px)] min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
            <div className="grid gap-[clamp(18px,2.4vw,24px)]">
              <VehicleInfo />
              <VehicleDocuments />
              <VehicleTrips />
            </div>

            <aside className="grid gap-[clamp(18px,2.4vw,24px)] min-[1025px]:sticky min-[1025px]:top-[94px]">
              <section aria-labelledby="txe-tip-title" className={PANEL}>
                <h2 id="txe-tip-title" className={PANEL_TITLE}>
                  Lưu ý
                </h2>
                <p className="mt-[18px] rounded-[8px] border-l-[3px] border-sky-500 bg-sky-50 px-3.5 py-3 text-[12.5px] leading-[1.6] text-slate-700">
                  {vehiclePage.tipNote}
                </p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
