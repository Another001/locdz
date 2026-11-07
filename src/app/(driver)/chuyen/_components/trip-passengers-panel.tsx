import { Icon } from "@/components/ui/icon";
import { tripDetail } from "@/lib/mock/trip-detail";
import type { TripDetailPassenger } from "@/types";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.15rem,1.8vw,1.35rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink";
const BADGE =
  "inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap";

function PassengerCard({
  passenger,
}: {
  passenger: TripDetailPassenger;
}) {
  return (
    <article
      className={`rounded-[14px] border px-4 py-3.5 transition-colors ${
        passenger.picked
          ? "border-emerald-100 bg-emerald-50"
          : "border-line-soft bg-canvas hover:border-[#cfe6f6] hover:bg-surface"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-navy-800 font-heading text-sm font-extrabold text-white"
          >
            {passenger.initial}
          </span>

          <div>
            <strong className="block font-heading text-sm font-bold leading-[1.3] text-ink">
              {passenger.name}
            </strong>
            <span className="mt-0.5 flex items-center gap-1">
              <span className="text-xs font-medium text-slate-500">
                {passenger.phone}
              </span>
              <button
                type="button"
                aria-label={`Sao chép số điện thoại ${passenger.name}`}
                className="relative grid h-7 w-7 flex-none place-items-center rounded-full text-slate-400 transition-colors after:absolute after:-inset-2 after:rounded-full hover:bg-sky-50 hover:text-sky-700"
              >
                <Icon name="copy" className="h-[15px] w-[15px]" />
              </button>
            </span>
          </div>
        </div>

        <div className="inline-flex flex-none flex-wrap justify-end gap-1">
          <span
            className={`${BADGE} ${
              passenger.picked
                ? "bg-emerald-100 text-emerald-700"
                : "bg-sky-100 text-sky-700"
            }`}
          >
            {passenger.picked ? "Đã đón" : "Chờ đón"}
          </span>
          <span
            className={`${BADGE} ${
              passenger.paid
                ? "bg-emerald-100 text-emerald-700"
                : "bg-[#fff1e7] text-[#9a3412]"
            }`}
          >
            {passenger.paid ? "Đã TT" : "Chưa TT"}
          </span>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] leading-[1.5] text-slate-600">
        <span className="inline-flex items-center gap-[5px]">
          <Icon name="pin" className="h-3.5 w-3.5 text-sky-700" />
          Đón: {passenger.pickup}
        </span>
        <span className="inline-flex items-center gap-[5px]">
          <Icon name="map" className="h-3.5 w-3.5 text-sky-700" />
          Trả: {passenger.dropoff}
        </span>
      </div>
    </article>
  );
}

export function TripPassengersPanel() {
  return (
    <section aria-labelledby="tcd-passengers-title" className={PANEL}>
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="tcd-passengers-title" className={PANEL_TITLE}>
          Hành khách
        </h2>
        <span className="text-[12.5px] font-semibold text-slate-500">
          {tripDetail.passengers.length} / {tripDetail.totalSeats} ghế đã đặt
        </span>
      </div>

      <div className="grid gap-3">
        {tripDetail.passengers.map((passenger) => (
          <PassengerCard key={passenger.id} passenger={passenger} />
        ))}
      </div>
    </section>
  );
}
