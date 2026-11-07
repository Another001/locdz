import { operateTrip } from "@/lib/mock/operate";

import { ConfirmModal } from "./_components/confirm-modal";
import { PassengersPanel } from "./_components/passengers-panel";
import { RoutePanel } from "./_components/route-panel";
import { TripSidebar } from "./_components/trip-sidebar";

export default function OperateTripPage() {
  const { progress } = operateTrip;

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
                Đang điều hành · {operateTrip.code}
              </span>
              <h1 className="mt-2.5 text-balance font-heading text-[clamp(1.65rem,2.8vw,2.25rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink max-[640px]:text-[clamp(1.4rem,5vw,1.75rem)]">
                {operateTrip.from} → {operateTrip.to}
              </h1>
            </div>

            <span className="inline-flex flex-none items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-2 text-xs font-bold tracking-[0.02em] text-emerald-700">
              <span
                aria-hidden="true"
                className="h-[7px] w-[7px] rounded-full bg-emerald-600 animate-[live-pulse_1.8s_ease-out_infinite] motion-reduce:animate-none"
              />
              {operateTrip.status}
            </span>
          </header>

          <section
            aria-label="Tiến độ chuyến"
            className="mt-5 rounded-[14px] border border-line-soft bg-canvas px-[18px] py-4 max-[640px]:p-3.5"
          >
            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[12.5px] text-slate-500">
              <strong className="font-heading text-sm font-extrabold text-ink">
                {progress.boarded}/{progress.totalPassengers} khách đã đón
              </strong>
              <span>
                {progress.stopsDone}/{progress.totalStops} điểm dừng
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={progress.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Tiến độ chuyến ${progress.percent}%`}
              className="h-2 overflow-hidden rounded-full bg-surface shadow-[inset_0_0_0_1px_#eef3f8]"
            >
              <span
                className="block h-full rounded-full bg-linear-to-r from-sky-500 to-sky-600 transition-[width] duration-300"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </section>

          <div className="mt-6 grid grid-cols-1 items-start gap-[clamp(20px,3vw,32px)] min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
            <div className="grid gap-[clamp(18px,2.4vw,24px)]">
              <PassengersPanel />
              <RoutePanel />
            </div>

            <aside className="grid gap-[clamp(18px,2.4vw,24px)] min-[1025px]:sticky min-[1025px]:top-[94px]">
              <TripSidebar />
            </aside>
          </div>
        </div>
      </div>

      <ConfirmModal />
    </main>
  );
}
