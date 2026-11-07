import { vehiclePage } from "@/lib/mock/vehicle";
import type { VehicleDocument } from "@/types";

const PANEL =
  "rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,28px)] shadow-xs";
const PANEL_TITLE =
  "font-heading text-[clamp(1.1rem,1.7vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink";
const BADGE =
  "inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap";

function DocumentItem({ document }: { document: VehicleDocument }) {
  return (
    <li
      className={`flex flex-wrap items-center justify-between gap-x-3.5 gap-y-2.5 rounded-[14px] border px-4 py-3.5 max-[640px]:items-start ${
        document.valid
          ? "border-emerald-100 bg-emerald-50"
          : "border-red-600 bg-red-50"
      }`}
    >
      <div className="min-w-0">
        <strong className="block font-heading text-sm font-bold leading-[1.35] text-ink">
          {document.name}
        </strong>
        <span className="mt-[3px] block text-xs text-slate-500">
          {document.detail}
        </span>
      </div>

      <div className="inline-flex flex-none flex-col items-end gap-1 max-[640px]:items-start">
        <span
          className={`${BADGE} ${
            document.valid
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {document.valid ? "Còn hiệu lực" : "Hết hiệu lực"}
        </span>
        <span className="text-[11.5px] font-semibold text-slate-500">
          {document.expiry}
        </span>
      </div>
    </li>
  );
}

export function VehicleDocuments() {
  return (
    <section aria-labelledby="txe-doc-title" className={PANEL}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3.5 gap-y-1.5">
        <h2 id="txe-doc-title" className={PANEL_TITLE}>
          Giấy tờ &amp; bảo hiểm
        </h2>
        <span className="text-[11.5px] font-semibold text-slate-500">
          Cập nhật {vehiclePage.documentsUpdatedAt}
        </span>
      </div>

      <ul className="grid list-none gap-2.5">
        {vehiclePage.documents.map((document) => (
          <DocumentItem key={document.id} document={document} />
        ))}
      </ul>
    </section>
  );
}
