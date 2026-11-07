import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { vehiclePage } from "@/lib/mock/vehicle";
import type { VehicleTrip } from "@/types";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";
const BADGE =
  "inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap";

function TripItem({ trip }: { trip: VehicleTrip }) {
  return (
    <li
      className={`flex flex-wrap items-center justify-between gap-x-3.5 gap-y-2 rounded-[14px] border px-3.5 py-3 ${
        trip.success
          ? "border-emerald-100 bg-emerald-50"
          : "border-red-600 bg-red-50"
      }`}
    >
      <div className="min-w-0">
        <strong className="block font-heading text-[13.5px] font-bold leading-[1.35] text-ink">
          {trip.route}
        </strong>
        <span className="mt-[3px] block text-[11.5px] text-slate-500">
          {trip.time}
        </span>
      </div>

      <span
        className={`${BADGE} ${
          trip.success
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-50 text-red-600"
        }`}
      >
        {trip.success ? "Hoàn thành" : "Thất bại"}
      </span>
    </li>
  );
}

export function VehicleTrips() {
  return (
    <section aria-labelledby="txe-trips-title" className={PANEL}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="txe-trips-title" className={PANEL_TITLE}>
          Lịch sử chạy gần đây
        </h2>
        <Link
          href="/"
          className="inline-flex flex-none items-center gap-[7px] border-b border-transparent py-1.5 text-sm font-bold text-sky-700 transition-[gap,border-color] hover:gap-2.5 hover:border-sky-300"
        >
          Tất cả chuyến
          <Icon name="arrow-up-right" className="h-[17px] w-[17px]" />
        </Link>
      </div>

      <ul className="grid list-none gap-2.5">
        {vehiclePage.trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </ul>
    </section>
  );
}
