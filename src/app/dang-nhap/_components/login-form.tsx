"use client";

import { Icon } from "@/components/ui/icon";

import { useLogin, type LoginStatusKind } from "../_hooks/use-login";

function statusColor(kind: LoginStatusKind) {
  if (kind === "error") return "text-red-600";
  if (kind === "success") return "text-green-600";
  return "text-sky-600";
}

export function LoginForm() {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    remember,
    setRemember,
    showPassword,
    setShowPassword,
    loading,
    status,
    fieldErrors,
    markField,
    handleSubmit,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-[14px] mt-[22px]">
      <h1
        id="dang-nhap"
        className="font-heading text-[clamp(1.6rem,2.6vw,2rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink"
      >
        Đăng nhập tài xế
      </h1>
      <p className="mt-[8px] text-[14.5px] leading-[1.65] text-slate-600">
        Đăng nhập buồng lái để nhận chuyến, theo dõi lịch trình và quản lý thu
        nhập của bạn trên Vi Vu Việt.
      </p>

      <div className="relative">
        <label
          htmlFor="identifier"
          className="block mb-[8px] text-[13px] font-semibold text-slate-600"
        >
          Số điện thoại hoặc email
        </label>
        <div className="relative">
          <Icon
            name="mail"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-400 h-[20px] w-[20px]"
          />
          <input
            id="identifier"
            type="text"
            name="identifier"
            autoComplete="username"
            required
            placeholder="VD: 0912 345 678"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            onBlur={() => markField("identifier", identifier)}
            className={`block w-full rounded-[10px] border border-line bg-surface pl-[44px] pr-4 py-3 text-[14.5px] text-ink placeholder-slate-400 focus:border-sky-500 focus:ring-0 transition-colors ${
              fieldErrors.identifier ? "border-red-600" : ""
            }`}
            aria-invalid={fieldErrors.identifier}
          />
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="block mb-[8px] text-[13px] font-semibold text-slate-600"
        >
          Mật khẩu
        </label>
        <div className="relative">
          <Icon
            name="shield"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-400 h-[20px] w-[20px]"
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            required
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => markField("password", password)}
            className={`block w-full rounded-[10px] border border-line bg-surface pl-[44px] pr-[46px] py-3 text-[14.5px] text-ink placeholder-slate-400 focus:border-sky-500 focus:ring-0 transition-colors ${
              fieldErrors.password ? "border-red-600" : ""
            }`}
            aria-invalid={fieldErrors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
          >
            {showPassword ? (
              <Icon name="eye-off" className="h-[18px] w-[18px]" />
            ) : (
              <Icon name="eye" className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-[9px]">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={remember}
          onChange={() => setRemember((value) => !value)}
          className="mt-[2px] w-[18px] h-[18px] shrink-0 accent-sky-700 focus:ring-sky-500"
        />
        <label
          htmlFor="remember"
          className="text-[13px] leading-[1.5] text-slate-600 cursor-pointer select-none"
        >
          Ghi nhớ đăng nhập
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[52px] px-[26px] rounded-[13px] bg-sky-700 text-white font-heading text-[15px] font-extrabold shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] hover:bg-sky-800 hover:-translate-y-[1px] active:translate-y-0 transition-all disabled:opacity-92 disabled:pointer-events-none"
      >
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>

      {status && (
        <div
          id="formStatus"
          role="status"
          aria-live="polite"
          className={`mt-3 text-[13px] leading-[1.5] ${statusColor(status.kind)}`}
        >
          {status.message}
        </div>
      )}
    </form>
  );
}
