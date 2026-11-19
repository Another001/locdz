import { Operations } from "./_component/operations";
import { ScheduleBoard } from "./_component/schedule-board";
import { useSchedule } from "../_hooks/use-schedule";

export default function DriverOverviewPage() {
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
  return (
    <main id="main">
      <section className="pb-14 pt-9 min-[768px]:pb-[84px] min-[768px]:pt-14">
        <div className="mx-auto w-full max-w-[1240px] px-4 min-[769px]:px-5">
          <div className="max-w-[720px]">
            <span className="inline-flex items-center gap-[9px] text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
              <span
                aria-hidden="true"
                className="h-0.5 w-[22px] rounded bg-sky-500"
              />
              Khu vực tài xế
            </span>
            <h1 className="mt-2.5 max-w-[720px] text-balance font-heading text-[clamp(1.8rem,3vw,2.15rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink max-[640px]:text-[clamp(1.55rem,6.2vw,1.9rem)]">
              Lịch chạy của bạn
            </h1>
          </div>

          <ScheduleBoard
            loading = {loading}
            error = {error}
            actionError = {actionError}
            pendingTripId = {pendingTripId}
            today = {today}
            weekDays = {weekDays}
            selectedDay = {selectedDay}
            selectedDate = {selectedDate}
            weekLabel = {weekLabel}
            weekRange = {weekRange}
            reload = {reload}
            goToPreviousWeek = {goToPreviousWeek}
            goToNextWeek = {goToNextWeek}
            goToDate = {goToDate}
            clearActionError = {clearActionError}
            acceptTrip = {acceptTrip}
            rejectTrip = {rejectTrip}
            setAssignmentStatus = {setAssignmentStatus}
            setTripStatus = {setTripStatus}
          />
          <Operations />
        </div>
      </section>
    </main>
  );
}
