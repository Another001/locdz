import { tripDetail } from "@/lib/mock/trip-detail";

export function TripSummary() {
  return (
    <section
      aria-labelledby="tcd-summary-title"
      className="rounded-[20px] border border-line bg-surface px-5 py-[22px] shadow-xs"
    >
      <h2
        id="tcd-summary-title"
        className="font-heading text-base font-extrabold leading-[1.2] tracking-[-0.02em] text-ink"
      >
        Tổng quan
      </h2>

      <dl className="mt-3.5 grid gap-2.5">
        {tripDetail.summary.map((item) => (
          <div
            key={item.label}
            className="flex items-baseline justify-between gap-3 border-b border-line-soft pb-2.5 last:border-b-0 last:pb-0"
          >
            <dt className="text-[12.5px] font-semibold leading-[1.65] text-slate-500">
              {item.label}
            </dt>
            <dd className="font-heading text-[14px] font-extrabold leading-[1.65] text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
