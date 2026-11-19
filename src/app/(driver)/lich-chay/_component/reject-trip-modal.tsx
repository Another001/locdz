"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import type { Trip } from "@/types";

interface RejectTripModalProps {
  trip: Trip;
  submitting: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<boolean>;
}

export function RejectTripModal({
  trip,
  submitting,
  error,
  onClose,
  onConfirm,
}: RejectTripModalProps) {
  const [reason, setReason] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !submitting) onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, submitting]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (trimmedReason.length < 3) {
      setValidationError("Vui lòng nhập lý do từ chối (ít nhất 3 ký tự).");
      return;
    }

    setValidationError(null);

    const success = await onConfirm(trimmedReason);

    if (success) onClose();
  }

  const message = validationError ?? error;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/45 p-4 backdrop-blur-[2px] min-[640px]:items-center"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-trip-title"
        className="w-full max-w-md rounded-[20px] border border-line bg-surface p-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] min-[640px]:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="reject-trip-title"
              className="font-heading text-lg font-extrabold tracking-[-0.02em] text-ink"
            >
              Từ chối chuyến
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
              {trip.from}
              {trip.to ? ` → ${trip.to}` : ""} · {trip.time}
            </p>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            aria-label="Đóng"
            className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-[10px] border border-line bg-surface text-slate-500 transition-colors hover:bg-canvas hover:text-ink disabled:opacity-50"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <label className="grid gap-1.5">
            <span className="text-[12.5px] font-bold text-ink">
              Lý do từ chối
            </span>
            <textarea
              autoFocus
              value={reason}
              maxLength={500}
              disabled={submitting}
              onChange={(event) => {
                setReason(event.target.value);
                if (validationError) setValidationError(null);
              }}
              rows={4}
              placeholder="Ví dụ: Xe đang bảo trì, không thể nhận chuyến..."
              className="w-full resize-none rounded-[12px] border border-line bg-canvas px-3.5 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-surface focus:ring-2 focus:ring-sky-100 disabled:opacity-60"
            />
          </label>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400">
              {reason.length}/500 ký tự
            </span>
            {message ? (
              <span
                role="alert"
                className="flex items-start gap-1.5 text-[11.5px] font-semibold text-red-600"
              >
                <Icon name="alert" className="mt-px h-3.5 w-3.5 flex-none" />
                {message}
              </span>
            ) : null}
          </div>

          <div className="mt-1 flex flex-col-reverse gap-2 min-[420px]:flex-row min-[420px]:justify-end">
            <button
              type="button"
              disabled={submitting}
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-[11px] border border-line bg-surface px-4 text-[13.5px] font-bold text-slate-600 transition-colors hover:bg-canvas disabled:opacity-50"
            >
              Giữ chuyến
            </button>
            <button
              type="submit"
              disabled={submitting || reason.trim().length < 3}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[11px] bg-red-600 px-4 text-[13.5px] font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="close" className="h-4 w-4" />
              {submitting ? "Đang gửi..." : "Xác nhận từ chối"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
