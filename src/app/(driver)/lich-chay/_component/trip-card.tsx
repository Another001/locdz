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
  "dang-chay": {
    label: "Đang chạy",
    className: "bg-indigo-100 text-indigo-700",
  },
  "hoan-thanh": {
    label: "Hoàn thành",
    className: "bg-slate-100 text-slate-600",
  },
  "da-huy": {
    label: "Đã huỷ / từ chối",
    className: "bg-red-50 text-red-600",
  },
  khac: {
    label: "Đã phân công",
    className: "bg-slate-200 text-slate-600",
  },
};

type AssignmentStatus = "PREPARING" | "ARRIVED";

interface TripCardProps {
  trip: Trip;
  busy?: boolean;
  disabled?: boolean;
  onAccept?: (trip: Trip) => void;
  onReject?: (trip: Trip) => void;
  onAssignmentStatus?: (trip: Trip, status: AssignmentStatus) => void;
  onTripStatus?: (
    trip: Trip,
    status: "IN_PROGRESS" | "COMPLETED"
  ) => void;
}

function assignmentFromStatus(trip: Trip): string {
  if (trip.driverTripStatus === "IN_PROGRESS" || trip.status === "dang-chay") {
    return "IN_PROGRESS";
  }

  if (trip.driverTripStatus === "COMPLETED" || trip.status === "hoan-thanh") {
    return "COMPLETED";
  }

  if (trip.driverTripStatus === "CANCELLED" || trip.status === "da-huy") {
    return "REJECTED";
  }

  if (trip.assignmentStatus) return trip.assignmentStatus;

  switch (trip.status) {
    case "chua-nhan":
      return "ASSIGNED";
    case "da-nhan":
      return "ACCEPTED";
    case "chuan-bi":
      return "PREPARING";
    case "co-mat":
      return "ARRIVED";
    default:
      return "";
  }
}

export function TripCard({
  trip,
  busy = false,
  disabled = false,
  onAccept,
  onReject,
  onAssignmentStatus,
  onTripStatus,
}: TripCardProps) {
  const status = STATUS[trip.status];
  const assignment = assignmentFromStatus(trip);
  const hasActions =
    (assignment === "ASSIGNED" && (onAccept || onReject)) ||
    (assignment === "ACCEPTED" && onAssignmentStatus) ||
    (assignment === "PREPARING" && onAssignmentStatus) ||
    (assignment === "ARRIVED" && onTripStatus) ||
    (assignment === "IN_PROGRESS" && onTripStatus);

  return (
    <div className="grid gap-2.5">
      <Link
        href={`/chuyen?tripId=${trip.id}`}
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
            {trip.to ? (
              <>
                <Icon
                  name="arrow-right"
                  className="h-3.5 w-3.5 flex-none text-slate-400"
                />
                <strong>{trip.to}</strong>
              </>
            ) : null}
          </div>

          <div className="mt-1 flex flex-wrap gap-x-2.5 gap-y-1">
            <span className="text-[10.5px] font-semibold leading-normal text-slate-600">
              {trip.passengers} khách
            </span>
            {trip.vehicle ? (
              <span className="text-[10.5px] font-semibold leading-normal text-slate-600">
                {trip.vehicle}
              </span>
            ) : null}
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
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
            {trip.tripCode ? (
              <span className="text-[10px] font-semibold text-slate-500">
                {trip.tripCode}
              </span>
            ) : null}
          </div>
        </div>

        <Icon
          name="arrow-right"
          className="h-3.5 w-3.5 text-slate-400"
        />
      </Link>

      {hasActions ? (
        <div className="flex flex-wrap gap-2">
          {assignment === "ASSIGNED" && onAccept ? (
            <button
              type="button"
              disabled={busy || disabled}
              onClick={() => onAccept(trip)}
              className="inline-flex h-[42px] min-h-11 items-center justify-center gap-[9px] rounded-[11px] bg-sky-700 px-[18px] text-[13.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-colors hover:bg-sky-800 disabled:opacity-60 max-[640px]:w-full"
            >
              <Icon name="check" className="h-[18px] w-[18px]" />
              {busy ? "Đang xử lý..." : "Xác nhận nhận chuyến"}
            </button>
          ) : null}

          {assignment === "ASSIGNED" && onReject ? (
            <button
              type="button"
              disabled={busy || disabled}
              onClick={() => onReject(trip)}
              className="inline-flex h-[42px] min-h-11 items-center justify-center gap-[9px] rounded-[11px] border border-red-200 bg-red-50 px-[18px] text-[13.5px] font-bold leading-none text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 disabled:opacity-60 max-[640px]:w-full"
            >
              <Icon name="close" className="h-[18px] w-[18px]" />
              Từ chối chuyến
            </button>
          ) : null}

          {assignment === "ACCEPTED" && onAssignmentStatus ? (
            <button
              type="button"
              disabled={busy || disabled}
              onClick={() => onAssignmentStatus(trip, "PREPARING")}
              className="inline-flex h-[42px] min-h-11 items-center justify-center gap-[9px] rounded-[11px] bg-sky-700 px-[18px] text-[13.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-colors hover:bg-sky-800 disabled:opacity-60 max-[640px]:w-full"
            >
              <Icon name="shield" className="h-[18px] w-[18px]" />
              {busy ? "Đang xử lý..." : "Bắt đầu chuẩn bị"}
            </button>
          ) : null}

          {assignment === "PREPARING" && onAssignmentStatus ? (
            <button
              type="button"
              disabled={busy || disabled}
              onClick={() => onAssignmentStatus(trip, "ARRIVED")}
              className="inline-flex h-[42px] min-h-11 items-center justify-center gap-[9px] rounded-[11px] bg-sky-700 px-[18px] text-[13.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-colors hover:bg-sky-800 disabled:opacity-60 max-[640px]:w-full"
            >
              <Icon name="pin" className="h-[18px] w-[18px]" />
              {busy ? "Đang xử lý..." : "Xác nhận đã có mặt"}
            </button>
          ) : null}

          {assignment === "ARRIVED" && onTripStatus ? (
            <button
              type="button"
              disabled={busy || disabled}
              onClick={() => onTripStatus(trip, "IN_PROGRESS")}
              className="inline-flex h-[42px] min-h-11 items-center justify-center gap-[9px] rounded-[11px] bg-sky-700 px-[18px] text-[13.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-colors hover:bg-sky-800 disabled:opacity-60 max-[640px]:w-full"
            >
              <Icon name="car" className="h-[18px] w-[18px]" />
              {busy ? "Đang xử lý..." : "Bắt đầu chuyến"}
            </button>
          ) : null}

          {assignment === "IN_PROGRESS" && onTripStatus ? (
            <button
              type="button"
              disabled={busy || disabled}
              onClick={() => onTripStatus(trip, "COMPLETED")}
              className="inline-flex h-[42px] min-h-11 items-center justify-center gap-[9px] rounded-[11px] bg-emerald-600 px-[18px] text-[13.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(5,150,105,0.9)] transition-colors hover:bg-emerald-700 disabled:opacity-60 max-[640px]:w-full"
            >
              <Icon name="check-circle" className="h-[18px] w-[18px]" />
              {busy ? "Đang xử lý..." : "Hoàn thành chuyến"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
