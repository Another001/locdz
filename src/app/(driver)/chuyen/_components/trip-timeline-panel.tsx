import { tripDetail } from "@/lib/mock/trip-detail";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.15rem,1.8vw,1.35rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink";

export function TripTimelinePanel() {
  return (
    <section aria-labelledby="tcd-timeline-title" className={PANEL}>
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="tcd-timeline-title" className={PANEL_TITLE}>
          Điểm dừng &amp; đón
        </h2>
        <span className="text-[12.5px] font-semibold text-slate-500">
          {tripDetail.stops.length} điểm · 1 trả
        </span>
      </div>

      <ol className="grid list-none">
        {tripDetail.stops.map((stop, index) => {
          const start = stop.kind === "start";

          return (
            <li
              key={stop.id}
              className="relative grid grid-cols-[22px_minmax(0,1fr)] gap-x-3.5 pb-[18px] last:pb-0"
            >
              {index < tripDetail.stops.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-12px] left-[10px] top-3 w-0.5 bg-[repeating-linear-gradient(to_bottom,#d8e6f2_0,#d8e6f2_5px,transparent_5px,transparent_10px)]"
                />
              ) : null}

              <span
                aria-hidden="true"
                className={`relative z-[1] mt-1.5 h-3 w-3 justify-self-center rounded-full shadow-[0_0_0_4px_rgba(2,132,199,0.13)] ${
                  start ? "bg-sky-700" : "bg-orange-500"
                }`}
              />

              <div className="min-w-0">
                <div className="flex flex-col items-start gap-y-1 min-[401px]:flex-row min-[401px]:flex-wrap min-[401px]:items-baseline min-[401px]:justify-between min-[401px]:gap-x-3">
                  <strong className="font-heading text-[14.5px] font-bold leading-[1.3] text-ink">
                    {stop.name}
                  </strong>
                  <time className="order-first font-heading text-[13px] font-bold leading-[1.3] text-sky-700 min-[401px]:order-none">
                    {stop.time}
                  </time>
                </div>
                <p className="mt-[3px] text-[12.5px] leading-[1.5] text-slate-600">
                  {stop.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
