import type { ProfileBadge, ProfileField } from "@/types";

const BADGE: Record<ProfileBadge, string> = {
  sky: "bg-sky-100 text-sky-700",
  green: "bg-emerald-100 text-emerald-700",
};

export function ReadonlyFields({ fields }: { fields: ProfileField[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 max-[640px]:grid-cols-1 max-[640px]:gap-y-3.5">
      {fields.map((field) => (
        <div key={field.label} className="min-w-0">
          <dt className="block text-[10.5px] font-bold uppercase tracking-[0.07em] text-slate-500">
            {field.label}
          </dt>
          <dd className="mt-1.5 break-words rounded-[10px] border border-line-soft bg-canvas px-3 py-2.5 font-heading text-sm font-bold leading-[1.4] text-ink max-[400px]:text-[13.5px]">
            {field.badge ? (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap ${BADGE[field.badge]}`}
              >
                {field.value}
              </span>
            ) : (
              field.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
