import { Operations } from "./_components/operations";
import { ScheduleBoard } from "./_components/schedule-board";

export default function DriverOverviewPage() {
  return (
    <main id="main">
      <section className="pb-14 pt-9 min-[768px]:pb-[84px] min-[768px]:pt-14">
        <div className="mx-auto w-full max-w-[1240px] px-4 md:px-5">
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

          <ScheduleBoard />
          <Operations />
        </div>
      </section>
    </main>
  );
}
