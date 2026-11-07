import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import type { Trip, TripStatus } from "@/types";

const STATUS: Record<
  TripStatus,
  { label: string; className: string }
> = {
  "chua-nhan": {
    label: "Chưa nhận lệnh",
    className: "bg-slate-200 text-slate-600",
  },
  "da-nhan": {
    label: "Đã nhận lệnh",
    className: "bg-sky-100 text-sky-800",
  },
  "chuan-bi": {
    label: "Đang chuẩn bị",
    className: "bg-orange-100 text-orange-700",
  },
  "co-mat": {
    label: "Đã có mặt",
    className: "bg-emerald-100 text-emerald-700",
  },
};

export function TripCard({ trip }: { trip: Trip }) {
  const status = STATUS[trip.status];

  return (
    <div className="grid gap-2.5">
      <Link
        href="/chuyen"
        className="grid min-h-14 min-w-0 grid-cols-[52px_minmax(0,1fr)_16px] items-center gap-2.5 rounded-[14px] border border-line-soft border-l-[3px] border-l-sky-600 bg-sky-50 px-2.5 py-2.5 transition-colors hover:border-sky-300 hover:bg-sky-100 max-[400px]:grid-cols-[50px_minmax(0,1fr)_16px] max-[400px]:gap-[9px] max-[400px]:px-[11px] max-[400px]:py-3.5"
      >
        <div>
          <strong className="block font-heading text-sm font-extrabold tabular-nums text-sky-700">
            {trip.time}
          </strong>
          <span className="mt-1 block text-[11px] text-slate-500">
            {trip.period}
          </span>
        </div>

        <div className="grid min-w-0 gap-1">
          <div className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap font-heading text-[13px] font-bold text-ink max-[400px]:text-[12.5px]">
            <strong>{trip.from}</strong>
            <Icon
              name="arrow-right"
              className="h-3.5 w-3.5 flex-none text-slate-400"
            />
            <strong>{trip.to}</strong>
          </div>

          <div className="mt-1 flex flex-wrap gap-x-2.5 gap-y-1">
            <span className="text-[10.5px] font-semibold leading-normal text-slate-600">
              {trip.passengers} khách
            </span>
            <span className="text-[10.5px] font-semibold leading-normal text-slate-600">
              {trip.vehicle}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap gap-x-1.5 gap-y-1">
            <span
              className={`inline-flex items-center rounded-full px-[7px] py-[3px] text-[10px] font-bold whitespace-nowrap ${status.className}`}
            >
              {status.label}
            </span>
            {trip.lateMinutes ? (
              <span className="inline-flex items-center rounded-full bg-red-50 px-[7px] py-[3px] text-[10px] font-bold whitespace-nowrap text-red-600">
                Trễ {trip.lateMinutes}&apos;
              </span>
            ) : null}
          </div>
        </div>

        <Icon
          name="arrow-right"
          className="h-3.5 w-3.5 text-slate-400"
        />
      </Link>

      {trip.status === "chua-nhan" ? (
        <button
          type="button"
          className="inline-flex h-[42px] min-h-11 items-center justify-center gap-[9px] justify-self-start rounded-[11px] bg-sky-700 px-[18px] text-[13.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-colors hover:bg-sky-800 max-[640px]:w-full max-[640px]:justify-self-stretch"
        >
          <Icon name="check" className="h-[18px] w-[18px]" />
          Xác nhận nhận chuyến
        </button>
      ) : null}
    </div>
  );
}
