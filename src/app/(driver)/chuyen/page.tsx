import { Icon } from "@/components/ui/icon";
import { tripDetail } from "@/lib/mock/trip-detail";

import { AssignmentPanel } from "./_components/assignment-panel";
import { IncidentModal } from "./_components/incident-modal";
import { TripInfoPanel } from "./_components/trip-info-panel";
import { TripPassengersPanel } from "./_components/trip-passengers-panel";
import { TripSummary } from "./_components/trip-summary";
import { TripTimelinePanel } from "./_components/trip-timeline-panel";

const STATUS_BADGE =
  "inline-flex flex-none items-center rounded-full bg-sky-100 px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap text-sky-800";
const PRIMARY =
  "inline-flex h-[52px] w-full items-center justify-center gap-[9px] rounded-[13px] bg-sky-700 px-[26px] text-[15px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-sky-800 hover:shadow-[0_16px_30px_-14px_rgba(3,105,161,0.95)] active:translate-y-0 disabled:cursor-not-allowed min-[641px]:w-auto";
const GHOST =
  "inline-flex h-12 grow items-center justify-center gap-[9px] rounded-xl border border-line bg-white px-[22px] text-[14.5px] font-bold leading-none text-ink transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 min-[641px]:grow-0";

export default function TripDetailPage() {
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
                Chuyến {tripDetail.code}
              </span>
              <h1 className="mt-2.5 text-balance font-heading text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink">
                {tripDetail.when}
              </h1>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate-600">
                {tripDetail.route}
              </p>
            </div>

            <span className={STATUS_BADGE}>{tripDetail.statusLabel}</span>
          </header>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              disabled
              aria-describedby="tcdLenhHint"
              className={PRIMARY}
            >
              Điều hành chuyến
              <Icon name="arrow-right" className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              aria-haspopup="dialog"
              aria-controls="tcdIncidentModal"
              className={GHOST}
            >
              <Icon name="alert" className="h-[18px] w-[18px]" />
              Báo sự cố
            </button>
          </div>

          <div className="mt-[clamp(22px,3vw,30px)] grid grid-cols-1 items-start gap-[clamp(20px,3vw,32px)] min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,260px)] min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(0,300px)]">
            <div className="grid gap-[clamp(18px,2.4vw,24px)]">
              <AssignmentPanel />
              <TripInfoPanel />
              <TripTimelinePanel />
              <TripPassengersPanel />
            </div>

            <aside className="order-first grid gap-[clamp(18px,2.4vw,24px)] min-[901px]:order-none min-[901px]:sticky min-[901px]:top-[94px]">
              <TripSummary />
            </aside>
          </div>
        </div>
      </div>

      <IncidentModal />
    </main>
  );
}
