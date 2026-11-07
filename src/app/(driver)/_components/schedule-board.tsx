import { Icon } from "@/components/ui/icon";
import { weekDays, weekOverview } from "@/lib/mock/trips";

import { TripCard } from "./trip-card";

export function ScheduleBoard() {
  const { todayIndex } = weekOverview;

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
          className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-[14px] border border-line bg-surface text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 max-[520px]:mr-auto"
          aria-label="Xem tuần trước"
        >
          <Icon name="arrow-right" className="h-[18px] w-[18px] -scale-x-100" />
        </button>

        <p className="flex min-w-0 flex-1 items-baseline gap-2 overflow-hidden whitespace-nowrap max-[520px]:order-first max-[520px]:basis-full max-[520px]:justify-center">
          <strong className="font-heading text-[13px] font-extrabold tracking-[-0.01em] text-ink">
            {weekOverview.relativeLabel}
          </strong>
          <span className="text-[12.5px] font-semibold tabular-nums text-slate-500">
            {weekOverview.range}
          </span>
        </p>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-[13px] font-heading text-[13px] font-extrabold tabular-nums tracking-[-0.01em] text-ink transition-colors hover:border-sky-300 hover:bg-sky-50"
          aria-label="Chọn ngày xem lịch chạy"
        >
          <Icon name="calendar" className="h-4 w-4 text-sky-700" />
          <strong>{weekOverview.jumpLabel}</strong>
          <Icon name="chevron-down" className="h-3.5 w-3.5 text-slate-400" />
        </button>

        <button
          type="button"
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
          const active = day.index === todayIndex;
          const isToday = day.index === todayIndex;

          return (
            <button
              key={day.index}
              type="button"
              aria-pressed={active}
              aria-label={`${day.longName}, ${day.date}/11`}
              className={`flex min-h-20 min-w-0 flex-col items-center justify-center gap-2 rounded-[14px] border px-1 py-3 transition-colors max-[400px]:min-h-[68px] max-[400px]:w-11 max-[400px]:flex-none ${
                active
                  ? "border-sky-700 bg-sky-700 text-white"
                  : isToday
                    ? "border-sky-300 bg-sky-50 text-slate-500"
                    : "border-line bg-surface text-slate-500 hover:border-sky-300 hover:bg-sky-50"
              }`}
            >
              <span
                className={`text-[11px] font-bold ${
                  !active && isToday ? "text-sky-700" : ""
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
        <div className="grid gap-2.5">
          {weekDays.map((day) => {
            const active = day.index === todayIndex;

            return (
              <article
                key={day.index}
                id={`lich-ngay-${day.index}`}
                className={active ? "grid min-w-0 gap-2.5" : "hidden"}
              >
                {day.trips.length ? (
                  day.trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))
                ) : (
                  <p className="rounded-[10px] bg-canvas px-[15px] py-[15px] text-xs leading-relaxed text-slate-500">
                    {active
                      ? "Hôm nay chưa có chuyến được phân công."
                      : "Chưa có chuyến được phân công."}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
