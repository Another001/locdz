"use client";

import { useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import type { Trip } from "@/types";

import { useSchedule } from "../_hooks/use-schedule";
import { RejectTripModal } from "./reject-trip-modal";
import { TripCard } from "./trip-card";

export function ScheduleBoard() {
  const {
    loading,
    error,
    actionError,
    pendingTripId,
    today,
    weekDays,
    selectedDay,
    selectedDate,
    weekLabel,
    weekRange,
    reload,
    goToPreviousWeek,
    goToNextWeek,
    goToDate,
    clearActionError,
    acceptTrip,
    rejectTrip,
    setAssignmentStatus,
    setTripStatus,
  } = useSchedule();

  const [rejectingTrip, setRejectingTrip] = useState<Trip | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const actionInFlight = pendingTripId !== null;

  function openRejectModal(trip: Trip) {
    clearActionError();
    setRejectingTrip(trip);
  }

  function closeRejectModal() {
    if (actionInFlight) return;

    setRejectingTrip(null);
    clearActionError();
  }

  async function confirmReject(reason: string) {
    if (!rejectingTrip) return false;

    return rejectTrip(rejectingTrip, reason);
  }

  function openDatePicker() {
    const input = dateInputRef.current as
      | (HTMLInputElement & { showPicker?: () => void })
      | null;

    if (!input) return;

    try {
      if (input.showPicker) input.showPicker();
      else input.click();
    } catch {
      input.click();
    }
  }

  return (
    <section
      aria-labelledby="tqw-title"
      className="mt-5 grid gap-3.5 overflow-hidden rounded-[20px] border border-line bg-surface p-5 shadow-sm min-[768px]:mt-6 min-[768px]:p-6 min-[1024px]:p-7"
    >
      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <h2
          id="tqw-title"
          className="font-heading text-[clamp(1.2rem,1.9vw,1.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink"
        >
          Lịch chạy theo tuần
        </h2>
      </div>

      <div className="mb-2.5 mt-0.5 flex items-center gap-2.5 max-[520px]:flex-wrap max-[520px]:gap-y-2.5">
        <button
          type="button"
          onClick={goToPreviousWeek}
          className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-[14px] border border-line bg-surface text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 max-[520px]:mr-auto"
          aria-label="Xem tuần trước"
        >
          <Icon name="arrow-right" className="h-[18px] w-[18px] -scale-x-100" />
        </button>

        <p className="flex min-w-0 flex-1 items-baseline gap-2 overflow-hidden whitespace-nowrap max-[520px]:order-first max-[520px]:basis-full max-[520px]:justify-center">
          <strong className="font-heading text-[13px] font-extrabold tracking-[-0.01em] text-ink">
            {weekLabel}
          </strong>
          <span className="text-[12.5px] font-semibold tabular-nums text-slate-500">
            {weekRange}
          </span>
        </p>

        <button
          type="button"
          onClick={openDatePicker}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-[13px] font-heading text-[13px] font-extrabold tabular-nums tracking-[-0.01em] text-ink transition-colors hover:border-sky-300 hover:bg-sky-50"
          aria-label={`Chọn ngày xem lịch chạy, đang chọn ${selectedDay.dateLabel}`}
        >
          <Icon name="calendar" className="h-4 w-4 text-sky-700" />
          <strong>{selectedDay.dateLabel}</strong>
          <Icon name="chevron-down" className="h-3.5 w-3.5 text-slate-400" />
        </button>

        <input
          ref={dateInputRef}
          type="date"
          value={selectedDate}
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => goToDate(event.target.value)}
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <button
          type="button"
          onClick={goToNextWeek}
          className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-[14px] border border-line bg-surface text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 max-[520px]:ml-auto"
          aria-label="Xem tuần sau"
        >
          <Icon name="arrow-right" className="h-[18px] w-[18px]" />
        </button>
      </div>

      <nav
        aria-label="Chọn ngày trong tuần"
        className="mb-1.5 grid grid-cols-7 gap-2 py-1 max-[400px]:flex max-[400px]:gap-[7px] max-[400px]:overflow-x-auto max-[400px]:overflow-y-hidden max-[400px]:py-1 max-[400px]:pb-2 max-[400px]:[scrollbar-width:none]"
      >
        {weekDays.map((day) => {
          const active = day.dateKey === selectedDate;

          return (
            <button
              key={day.dateKey}
              type="button"
              onClick={() => goToDate(day.dateKey)}
              aria-pressed={active}
              aria-label={`${day.longName}, ${day.dateLabel}`}
              className={`flex min-h-20 min-w-0 flex-col items-center justify-center gap-2 rounded-[14px] border px-1 py-3 transition-colors max-[400px]:min-h-[68px] max-[400px]:w-11 max-[400px]:flex-none ${
                active
                  ? "border-sky-700 bg-sky-700 text-white"
                  : day.isToday
                    ? "border-sky-300 bg-sky-50 text-slate-500"
                    : "border-line bg-surface text-slate-500 hover:border-sky-300 hover:bg-sky-50"
              }`}
            >
              <span
                className={`text-[11px] font-bold ${
                  !active && day.isToday ? "text-sky-700" : ""
                }`}
              >
                {day.shortName}
              </span>
              <strong
                className={`font-heading text-base font-extrabold leading-none tabular-nums ${
                  active ? "text-white" : "text-ink"
                }`}
              >
                {day.date}
              </strong>
              <i
                aria-hidden="true"
                className={`h-[5px] w-[5px] rounded-full ${
                  active
                    ? "bg-white"
                    : day.trips.length
                      ? "bg-sky-500"
                      : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </nav>

      <section
        aria-label="Chuyến trong ngày đã chọn"
        className="grid gap-[22px]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-slate-500">
            <strong className="font-heading font-extrabold text-ink">
              {selectedDay.longName}, {selectedDay.dateLabel}
            </strong>
            <span className="ml-2 tabular-nums">
              {selectedDay.trips.length} chuyến
            </span>
          </p>

          {selectedDate !== today ? (
            <button
              type="button"
              onClick={() => goToDate(today)}
              className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11.5px] font-bold text-sky-700 transition-colors hover:border-sky-300 hover:bg-sky-100"
            >
              Về hôm nay
            </button>
          ) : null}
        </div>

        {actionError && !rejectingTrip ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-[11px] border border-red-100 bg-red-50 px-3.5 py-3 text-[12.5px] font-semibold leading-relaxed text-red-700"
          >
            <Icon name="alert" className="mt-0.5 h-4 w-4 flex-none" />
            <span className="flex-1">{actionError}</span>
            <button
              type="button"
              onClick={clearActionError}
              aria-label="Đóng thông báo"
              className="text-red-500 transition-colors hover:text-red-700"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        <div className="grid gap-2.5">
          {loading ? (
            <>
              <div className="h-[86px] animate-pulse rounded-[14px] bg-canvas" />
              <div className="h-[86px] animate-pulse rounded-[14px] bg-canvas" />
            </>
          ) : error ? (
            <div
              role="alert"
              className="grid gap-3 rounded-[12px] border border-red-100 bg-red-50 px-4 py-4 text-[12.5px] leading-relaxed text-red-700"
            >
              <span className="flex items-start gap-2">
                <Icon name="alert" className="mt-0.5 h-4 w-4 flex-none" />
                {error}
              </span>
              <button
                type="button"
                onClick={() => void reload()}
                className="w-fit rounded-[10px] bg-red-600 px-3.5 py-2 text-[12px] font-bold text-white transition-colors hover:bg-red-700"
              >
                Thử lại
              </button>
            </div>
          ) : selectedDay.trips.length ? (
            selectedDay.trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                busy={pendingTripId === trip.id}
                disabled={actionInFlight}
                onAccept={(selectedTrip) => void acceptTrip(selectedTrip)}
                onReject={openRejectModal}
                onAssignmentStatus={(selectedTrip, status) =>
                  void setAssignmentStatus(selectedTrip, status)
                }
                onTripStatus={(selectedTrip, status) =>
                  void setTripStatus(selectedTrip, status)
                }
              />
            ))
          ) : (
            <p className="rounded-[10px] bg-canvas px-[15px] py-[15px] text-xs leading-relaxed text-slate-500">
              {selectedDate === today
                ? "Hôm nay chưa có chuyến được phân công."
                : "Chưa có chuyến được phân công trong ngày này."}
            </p>
          )}
        </div>
      </section>

      {rejectingTrip ? (
        <RejectTripModal
          trip={rejectingTrip}
          submitting={pendingTripId === rejectingTrip.id}
          error={actionError}
          onClose={closeRejectModal}
          onConfirm={confirmReject}
        />
      ) : null}
    </section>
  );
}
