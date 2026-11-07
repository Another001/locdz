import { Icon } from "@/components/ui/icon";
import { operateTrip } from "@/lib/mock/operate";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";

export function TripSidebar() {
  return (
    <>
      <section aria-labelledby="tdh-sum-title" className={PANEL}>
        <h2 id="tdh-sum-title" className={PANEL_TITLE}>
          Thông tin chuyến
        </h2>

        <dl className="mt-3.5 grid gap-2.5">
          {operateTrip.summary.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-3 border-b border-line-soft pb-2.5 last:border-b-0 last:pb-0"
            >
              <dt className="text-[12.5px] font-semibold text-slate-500">
                {item.label}
              </dt>
              <dd className="font-heading text-sm font-extrabold text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="tdh-act-title" className={PANEL}>
        <h2 id="tdh-act-title" className={PANEL_TITLE}>
          Hành động
        </h2>

        <div className="mt-3 grid gap-2.5">
          <a
            href="#"
            className="inline-flex h-12 w-full items-center justify-center gap-[9px] rounded-xl border border-line bg-white text-[14.5px] font-bold leading-none text-ink transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            <Icon name="alert" className="h-[18px] w-[18px]" />
            Báo sự cố
          </a>

          <button
            type="button"
            className="inline-flex h-12 w-full items-center justify-center gap-[9px] rounded-xl bg-sky-700 text-[14.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-sky-800 hover:shadow-[0_16px_30px_-14px_rgba(3,105,161,0.95)] active:translate-y-0"
          >
            <Icon name="check-circle" className="h-[18px] w-[18px]" />
            Kết thúc chuyến
          </button>
        </div>
      </section>
    </>
  );
}
