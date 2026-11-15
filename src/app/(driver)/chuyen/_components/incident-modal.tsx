import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { DriverIncidentType } from "@/types/driver";

const LABEL =
  "mb-1.5 ml-0.5 block text-[11px] font-bold uppercase tracking-[0.09em] text-slate-500";
const CONTROL =
  "w-full rounded-xl border border-line bg-[#fafcfe] font-body text-ink transition-[border-color,box-shadow,background-color] hover:border-slate-300 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/15";
const BUTTON =
  "inline-flex h-12 items-center justify-center rounded-xl px-[22px] text-sm font-bold leading-none transition-colors";

const INCIDENT_TYPES: { value: DriverIncidentType; label: string }[] = [
  { value: "VEHICLE_BREAKDOWN", label: "Xe gặp sự cố" },
  { value: "TRAFFIC", label: "Tắc đường / thời tiết" },
  { value: "PASSENGER_NO_SHOW", label: "Khách không có mặt" },
  { value: "OTHER", label: "Khác" },
];

interface IncidentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (type: string, description: string) => void;
  isSubmitting: boolean;
}

export function IncidentModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: IncidentModalProps) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || description.trim().length < 3) return;
    onSubmit(type, description.trim());
    setType("");
    setDescription("");
  };

  if (!open) {
    return (
      <div
        id="tcdIncidentModal"
        hidden
        aria-hidden="true"
        className="fixed inset-0 z-[1000] grid place-items-center p-4"
      />
    );
  }

  return (
    <div
      id="tcdIncidentModal"
      hidden={!open}
      aria-hidden={!open}
      className="fixed inset-0 z-[1000] grid place-items-center p-4"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(7,17,31,0.55)] backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tcdIncidentTitle"
        className="relative max-h-[calc(100dvh-32px)] w-full max-w-[480px] overflow-y-auto rounded-[20px] bg-surface p-[clamp(20px,3vw,28px)] shadow-lg"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            id="tcdIncidentTitle"
            className="font-heading text-[clamp(1.15rem,2vw,1.35rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink"
          >
            Báo sự cố
          </h2>
          <button
            type="button"
            aria-label="Đóng"
            onClick={() => onOpenChange(false)}
            className="grid h-11 w-11 flex-none place-items-center rounded-[10px] text-slate-500 transition-colors hover:bg-canvas hover:text-ink"
          >
            <Icon name="close" className="h-[18px] w-[18px]" />
          </button>
        </div>

        <p className="mt-2.5 text-[13px] leading-[1.6] text-slate-600">
          Báo sự cố để admin hỗ trợ. Chuyến vẫn giữ nguyên — không tự hủy.
        </p>

        <form
          className="mt-[18px] grid gap-3.5"
          noValidate
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="incidentType" className={LABEL}>
              Loại sự cố
            </label>
            <div className="relative">
              <select
                id="incidentType"
                name="incidentType"
                required
                defaultValue=""
                onChange={(e) => setType(e.target.value)}
                className={`${CONTROL} h-12 appearance-none px-3.5 pr-9 text-[14.5px] font-medium`}
              >
                <option value="">— Chọn loại sự cố —</option>
                {INCIDENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-[70%] rotate-45 border-b-2 border-r-2 border-slate-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="incidentNote" className={LABEL}>
              Mô tả ngắn
            </label>
            <textarea
              id="incidentNote"
              name="incidentNote"
              rows={3}
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="VD: Xe nổ lốp tại Cầu Giẽ"
              className={`${CONTROL} min-h-[84px] resize-y px-3.5 py-3 text-base leading-[1.55] placeholder:text-slate-400`}
            />
          </div>

          <div className="mt-1 flex flex-col-reverse gap-2.5 min-[481px]:flex-row min-[481px]:flex-wrap min-[481px]:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={`${BUTTON} w-full border border-line bg-white text-ink hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 min-[481px]:w-auto`}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${BUTTON} w-full bg-sky-700 text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] hover:bg-sky-800 min-[481px]:w-auto ${
                isSubmitting ? "opacity-90" : ""
              }`}
            >
              {isSubmitting ? "Đang gửi…" : "Gửi báo cáo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
