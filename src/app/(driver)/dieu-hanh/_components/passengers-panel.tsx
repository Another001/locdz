import { Icon } from "@/components/ui/icon";
import { operateTrip } from "@/lib/mock/operate";
import type { Passenger, PassengerStatus } from "@/types";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";

const STAGE: Record<
  PassengerStatus,
  { label: string; className: string }
> = {
  "cho-don": { label: "Chờ đón", className: "bg-sky-100 text-sky-700" },
  "da-don": { label: "Đã lên xe", className: "bg-emerald-100 text-emerald-700" },
  "da-tra": { label: "Hoàn thành", className: "bg-emerald-100 text-emerald-700" },
};

const BADGE =
  "inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap";
const ACTION =
  "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-bold transition-colors max-[640px]:w-full";
const ACTION_DONE =
  "bg-emerald-50 text-emerald-700 shadow-[inset_0_0_0_1px_#d1fae5] hover:bg-emerald-100";

function PassengerCard({ passenger }: { passenger: Passenger }) {
  const stage = STAGE[passenger.status];
  const completed = passenger.status === "da-tra";

  return (
    <article
      className={`rounded-[14px] border px-4 py-3.5 ${
        completed
          ? "border-emerald-100 bg-emerald-50"
          : "border-line-soft bg-canvas"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-navy-800 font-heading text-sm font-extrabold text-white"
          >
            {passenger.initial}
          </span>
          <div>
            <strong className="block font-heading text-sm font-bold leading-[1.3] text-ink">
              {passenger.name}
            </strong>
            <span className="mt-0.5 block text-xs font-medium text-slate-500">
              {passenger.phoneMasked}
            </span>
          </div>
        </div>

        <div className="inline-flex flex-none flex-wrap justify-end gap-1">
          <span
            className={`${BADGE} ${
              passenger.paid
                ? "bg-emerald-100 text-emerald-700"
                : "bg-[#fff1e7] text-[#9a3412]"
            }`}
          >
            {passenger.paid ? "Đã trả tiền" : "Chưa trả tiền"}
          </span>
          <span className={`${BADGE} ${stage.className}`}>{stage.label}</span>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-slate-600">
        <span className="inline-flex items-center gap-[5px]">
          <Icon name="wallet" className="h-3.5 w-3.5 text-sky-700" />
          <strong className="font-heading text-[13px] font-extrabold text-ink">
            {passenger.fare}
          </strong>
          <span>· {passenger.paymentMethod}</span>
        </span>
        <span className="inline-flex items-center gap-[5px]">
          <Icon name="pin" className="h-3.5 w-3.5 text-sky-700" />
          Đón: {passenger.pickup}
        </span>
        <span className="inline-flex items-center gap-[5px]">
          <Icon name="map" className="h-3.5 w-3.5 text-sky-700" />
          Trả: {passenger.dropoff}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border-t border-dashed border-line pt-3 max-[640px]:flex-col">
        <button
          type="button"
          className={`${ACTION} bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800`}
        >
          <Icon name="copy" className="h-[15px] w-[15px]" />
          <span>Copy SĐT</span>
        </button>

        <button
          type="button"
          aria-pressed={passenger.paid}
          className={`${ACTION} ${
            passenger.paid
              ? ACTION_DONE
              : "bg-[#fff1e7] text-[#9a3412] hover:bg-orange-100 hover:text-orange-600"
          }`}
        >
          <Icon name="wallet" className="h-[15px] w-[15px]" />
          Đã trả tiền
        </button>

        {passenger.status !== "da-tra" ? (
          <button
            type="button"
            aria-pressed={passenger.status === "da-don"}
            className={`${ACTION} ${
              passenger.status === "da-don"
                ? ACTION_DONE
                : "bg-sky-700 text-white hover:bg-sky-800"
            }`}
          >
            <Icon name="check" className="h-[15px] w-[15px]" />
            Đã lên xe
          </button>
        ) : null}

        {passenger.status !== "cho-don" ? (
          <button
            type="button"
            aria-pressed={passenger.status === "da-tra"}
            className={`${ACTION} ${
              passenger.status === "da-tra"
                ? ACTION_DONE
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <Icon name="check-circle" className="h-[15px] w-[15px]" />
            Đã trả khách
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function PassengersPanel() {
  return (
    <section aria-labelledby="tdh-passengers-title" className={PANEL}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="tdh-passengers-title" className={PANEL_TITLE}>
          Hành khách trên chuyến
        </h2>
        <span className="text-[11.5px] font-semibold text-slate-500">
          {operateTrip.passengers.length} khách · {operateTrip.vehicle}
        </span>
      </div>

      <div className="grid gap-3">
        {operateTrip.passengers.map((passenger) => (
          <PassengerCard key={passenger.id} passenger={passenger} />
        ))}
      </div>
    </section>
  );
}
