import { Icon } from "@/components/ui/icon";

export function ConfirmModal() {
  return (
    <div
      id="tdhConfirmModal"
      hidden
      aria-hidden="true"
      className="fixed inset-0 z-[1000] place-items-center p-4 [&:not([hidden])]:grid"
    >
      <div className="absolute inset-0 bg-[rgba(7,17,31,0.55)] backdrop-blur-[2px]" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tdh-confirm-title"
        aria-describedby="tdh-confirm-text"
        className="relative max-h-[calc(100dvh-32px)] w-full max-w-[440px] overflow-y-auto rounded-[20px] bg-surface p-5 shadow-lg min-[768px]:p-7"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            id="tdh-confirm-title"
            className="font-heading text-[clamp(1.1rem,2vw,1.3rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink"
          >
            Xác nhận thao tác
          </h2>
          <button
            type="button"
            aria-label="Đóng"
            className="grid h-11 w-11 flex-none place-items-center rounded-[10px] bg-transparent text-slate-500 transition-colors hover:bg-canvas hover:text-ink"
          >
            <Icon name="close" className="h-[18px] w-[18px]" />
          </button>
        </div>

        <p
          id="tdh-confirm-text"
          className="mt-2.5 text-sm leading-[1.65] text-slate-600"
        >
          Bạn có chắc muốn thực hiện thao tác này không?
        </p>

        <div className="mt-5 flex flex-wrap justify-end gap-2.5 max-[480px]:flex-col-reverse max-[480px]:[&>*]:w-full">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-5 text-[14.5px] font-bold leading-none text-ink transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            Hủy
          </button>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-sky-700 px-5 text-[14.5px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-colors hover:bg-sky-800"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
