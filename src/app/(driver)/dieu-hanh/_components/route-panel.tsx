import { operateTrip } from "@/lib/mock/operate";
import type { RouteStopState } from "@/types";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";

const DOT: Record<RouteStopState, string> = {
  done: "bg-emerald-600 shadow-[0_0_0_4px_rgba(5,150,105,0.16)]",
  active: "bg-sky-600 shadow-[0_0_0_4px_rgba(2,132,199,0.16)]",
  end: "bg-slate-300 shadow-[0_0_0_4px_rgba(148,163,184,0.15)]",
};

export function RoutePanel() {
  return (
    <section aria-labelledby="tdh-route-title" className={PANEL}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="tdh-route-title" className={PANEL_TITLE}>
          Lịch trình
        </h2>
        <span className="text-[11.5px] font-semibold text-slate-500">
          {operateTrip.progress.stopsDone}/{operateTrip.progress.totalStops} điểm
          dừng
        </span>
      </div>

      <ol className="grid list-none">
        {operateTrip.stops.map((stop, index) => (
          <li
            key={stop.id}
            className="relative grid grid-cols-[22px_minmax(0,1fr)] gap-x-3.5 pb-[18px] last:pb-0"
          >
            {index < operateTrip.stops.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[10px] top-[18px] w-0.5 bg-[repeating-linear-gradient(to_bottom,#d8e6f2_0,#d8e6f2_4px,transparent_4px,transparent_8px)]"
              />
            ) : null}

            <span
              aria-hidden="true"
              className={`relative z-[1] mt-1.5 h-3 w-3 rounded-full ${DOT[stop.state]}`}
            />

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 max-[400px]:flex-col max-[400px]:items-start">
                <strong className="font-heading text-[14.5px] font-bold leading-[1.3] text-ink">
                  {stop.name}
                </strong>
                <time className="font-heading text-[12.5px] font-bold text-sky-700 max-[400px]:order-first">
                  {stop.time}
                </time>
              </div>
              <p className="mt-[3px] text-[12.5px] leading-[1.5] text-slate-600">
                {stop.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
