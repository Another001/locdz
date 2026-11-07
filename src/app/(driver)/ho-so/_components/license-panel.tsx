import { Icon } from "@/components/ui/icon";
import { driverProfile } from "@/lib/mock/profile";

import { ReadonlyFields } from "./readonly-fields";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs max-[640px]:p-5";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";

export function LicensePanel() {
  return (
    <section aria-labelledby="ths-license-title" className={PANEL}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="ths-license-title" className={PANEL_TITLE}>
          Giấy phép lái xe
        </h2>
        <span className="inline-flex items-center gap-[5px] text-[11.5px] font-semibold text-slate-500">
          <Icon name="lock" className="h-[13px] w-[13px]" />
          {driverProfile.licenseNote}
        </span>
      </div>

      <ReadonlyFields fields={driverProfile.licenseFields} />
    </section>
  );
}
