import { Icon } from "@/components/ui/icon";
import { vehiclePage } from "@/lib/mock/vehicle";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";
const BADGE =
  "inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap";

export function VehicleInfo() {
  const { vehicle } = vehiclePage;

  return (
    <section aria-labelledby="txe-info-title" className={PANEL}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="txe-info-title" className={PANEL_TITLE}>
          Xe đang được giao
        </h2>
        <span className={`${BADGE} bg-emerald-100 text-emerald-700`}>
          {vehicle.status}
        </span>
      </div>

      <div className="flex items-center gap-3.5 border-b border-line-soft pb-[18px] max-[400px]:gap-2.5">
        <span
          aria-hidden="true"
          className="grid h-14 w-14 flex-none place-items-center rounded-[14px] bg-sky-50 text-sky-700 max-[400px]:h-12 max-[400px]:w-12"
        >
          <Icon
            name="car"
            className="h-[26px] w-[26px] max-[400px]:h-[22px] max-[400px]:w-[22px]"
          />
        </span>

        <div className="min-w-0">
          <strong className="block font-heading text-[17px] font-extrabold leading-[1.3] text-ink">
            {vehicle.name}
          </strong>
          <span className="mt-1 inline-block rounded-full bg-canvas px-2.5 py-[3px] font-heading text-[12.5px] font-bold text-slate-700">
            {vehicle.plate}
          </span>
        </div>
      </div>

      <dl className="mt-[18px] grid grid-cols-2 gap-x-5 gap-y-3.5 max-[400px]:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))]">
        {vehicle.specs.map((spec) => (
          <div key={spec.label} className="min-w-0">
            <dt className="text-[10.5px] font-bold uppercase tracking-[0.07em] text-slate-500">
              {spec.label}
            </dt>
            <dd className="mt-1 font-heading text-sm font-bold leading-[1.4] text-ink">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-[18px] rounded-[8px] border-l-[3px] border-sky-500 bg-sky-50 px-3.5 py-3 text-[12.5px] leading-[1.6] text-slate-700">
        {vehiclePage.adminNote}
      </p>
    </section>
  );
}
