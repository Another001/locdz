import { driverProfile } from "@/lib/mock/profile";

import { ReadonlyFields } from "./readonly-fields";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs max-[640px]:p-5";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";

export function ProfilePanel() {
  return (
    <section aria-labelledby="ths-profile-title" className={PANEL}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="ths-profile-title" className={PANEL_TITLE}>
          Thông tin cá nhân
        </h2>
      </div>

      <div className="mb-5 mt-4 flex items-center gap-4 border-b border-line-soft pb-5 max-[640px]:gap-3.5 max-[400px]:gap-3">
        <span
          aria-hidden="true"
          className="grid h-[68px] w-[68px] flex-none place-items-center rounded-full bg-navy-800 font-heading text-[26px] font-extrabold leading-none tracking-[-0.02em] text-white max-[640px]:h-14 max-[640px]:w-14 max-[640px]:text-[22px]"
        >
          {driverProfile.initial}
        </span>

        <div className="min-w-0">
          <strong className="block font-heading text-xl font-extrabold leading-[1.25] tracking-[-0.02em] text-ink max-[640px]:text-lg">
            {driverProfile.name}
          </strong>
          <span className="mt-1 block text-[13px] leading-[1.5] text-slate-500">
            {driverProfile.meta}
          </span>
        </div>
      </div>

      <ReadonlyFields fields={driverProfile.fields} />
    </section>
  );
}
