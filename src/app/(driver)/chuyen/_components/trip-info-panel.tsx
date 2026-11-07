import { Icon } from "@/components/ui/icon";
import { tripDetail } from "@/lib/mock/trip-detail";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.15rem,1.8vw,1.35rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink";

export function TripInfoPanel() {
  return (
    <section aria-labelledby="tcd-trip-title" className={PANEL}>
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="tcd-trip-title" className={PANEL_TITLE}>
          Thông tin chuyến
        </h2>
        <span className="text-[12.5px] font-semibold text-slate-500">
          Khởi hành {tripDetail.departTime}
        </span>
      </div>

      <div className="flex flex-col gap-[22px]">
        {tripDetail.routePoints.map((point, index) => {
          const start = point.kind === "start";

          return (
            <div
              key={`${point.kind}-${point.time}`}
              className="relative grid grid-cols-[46px_22px_minmax(0,1fr)] items-start gap-x-2.5"
            >
              <span className="pt-0.5 font-heading text-sm font-bold leading-[1.2] tabular-nums text-ink">
                {point.time}
              </span>

              <span className="relative flex h-full justify-center">
                {index < tripDetail.routePoints.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-26px] left-1/2 top-[14px] w-0.5 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,#d8e6f2_0,#d8e6f2_4px,transparent_4px,transparent_8px)]"
                  />
                ) : null}

                <span
                  aria-hidden="true"
                  className={`relative z-[1] mt-1 h-[11px] w-[11px] rounded-full ${
                    start
                      ? "bg-sky-600 shadow-[0_0_0_4px_rgba(2,132,199,0.13)]"
                      : "border-[2.5px] border-orange-500 bg-surface shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
                  }`}
                />
              </span>

              <div className="min-w-0">
                <strong className="block font-heading text-[15.5px] font-bold leading-[1.3] text-ink">
                  {point.name}
                </strong>
                <span className="mt-px block text-[11.5px] leading-[1.45] text-slate-500">
                  {point.address}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3.5 border-t border-line-soft pt-[18px] min-[401px]:grid-cols-2">
        {tripDetail.stats.map((stat) => (
          <li key={stat.label}>
            <span className="block text-[11px] font-bold uppercase tracking-[0.07em] text-slate-500">
              {stat.label}
            </span>
            <strong className="mt-[3px] block font-heading text-[16.5px] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
              {stat.value}
            </strong>
          </li>
        ))}
      </ul>

      <div className="mt-[18px] flex items-center gap-3 border-t border-line-soft pt-[18px]">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-navy-50 text-navy-800 shadow-[inset_0_0_0_1px_rgba(11,27,51,0.12)]"
        >
          <Icon name="car" className="h-[22px] w-[22px]" />
        </span>

        <div className="min-w-0">
          <strong className="block font-heading text-[14.5px] font-bold leading-[1.35] text-ink">
            {tripDetail.vehicle.name}
          </strong>
          <span className="mt-0.5 block text-[12.5px] leading-[1.45] text-slate-500">
            {tripDetail.vehicle.meta}
          </span>
        </div>
      </div>
    </section>
  );
}
