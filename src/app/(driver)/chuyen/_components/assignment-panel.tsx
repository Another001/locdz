import { Icon } from "@/components/ui/icon";
import { tripDetail } from "@/lib/mock/trip-detail";
import type { AssignmentStepState } from "@/types";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.15rem,1.8vw,1.35rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink";

const DOT: Record<AssignmentStepState, string> = {
  done: "border-sky-600 bg-sky-600",
  current:
    "border-sky-700 bg-surface shadow-[0_0_0_4px_rgba(2,132,199,0.13)]",
  upcoming: "border-slate-300 bg-surface",
};

export function AssignmentPanel() {
  const { assignment } = tripDetail;

  return (
    <section aria-labelledby="tcdLenhTitle" className={PANEL}>
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="tcdLenhTitle" className={PANEL_TITLE}>
          Trạng thái lệnh phân công
        </h2>
        <span className="inline-flex flex-wrap gap-1.5">
          <span className="inline-flex items-center rounded-full bg-slate-200 px-2.5 py-[5px] text-[11.5px] font-bold tracking-[0.01em] whitespace-nowrap text-slate-600">
            {assignment.label}
          </span>
        </span>
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-2.5 min-[521px]:grid-cols-4">
        {assignment.steps.map((step, index) => {
          const current = step.state === "current";

          return (
            <li key={step.label} className="relative grid min-w-0 gap-[7px]">
              {index < assignment.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-4 right-0 top-1.5 hidden h-0.5 bg-line min-[521px]:block"
                />
              ) : null}

              <span
                aria-hidden="true"
                className={`relative z-[1] h-[13px] w-[13px] rounded-full border-2 ${DOT[step.state]}`}
              />

              <span
                className={`text-[11.5px] leading-[1.35] ${
                  current
                    ? "font-bold text-ink"
                    : "font-semibold text-slate-500"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      <p
        id="tcdLenhHint"
        className="mt-4 rounded-[8px] border-l-[3px] border-sky-500 bg-sky-50 px-3.5 py-[11px] text-[12.5px] leading-[1.55] text-slate-600"
      >
        {assignment.hint}
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          className="inline-flex h-12 grow items-center justify-center gap-[9px] rounded-xl bg-sky-700 px-[22px] text-sm font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-colors hover:bg-sky-800 min-[481px]:grow-0"
        >
          <Icon name="check" className="h-[18px] w-[18px]" />
          Tôi đã nhận lệnh
        </button>
      </div>
    </section>
  );
}
