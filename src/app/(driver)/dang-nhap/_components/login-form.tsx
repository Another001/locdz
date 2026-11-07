"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Icon } from "@/components/ui/icon";

const REDIRECT_PATH = "/";

type Status = { message: string; kind: "info" | "error" | "success" };

export function LoginForm() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    identifier: boolean;
    password: boolean;
  }>({ identifier: false, password: false });

  const isValid = useCallback((field: "identifier" | "password", value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    return true;
  }, []);

  const markField = useCallback(
    (field: "identifier" | "password") => {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: !isValid(field, field === "identifier" ? identifier : password),
      }));
    },
    [identifier, password, isValid]
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);

    const idOk = isValid("identifier", identifier);
    const pwOk = isValid("password", password);
    setFieldErrors({ identifier: !idOk, password: !pwOk });

    if (!idOk || !pwOk) {
      setStatus({
        message: "Vui lòng kiểm tra lại thông tin đã nhập.",
        kind: "error",
      });
      return;
    }

    setLoading(true);
    setStatus({ message: "Đang xử lý, vui lòng chờ...", kind: "info" });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    try {
      localStorage.setItem(
        "vvv.auth.driver",
        JSON.stringify({ name: identifier.trim() || "Tài xế" })
      );
    } catch {
      /* chế độ riêng tư: bỏ qua, vẫn chuyển hướng */
    }
    setStatus({ message: "Thành công! Đang chuyển hướng...", kind: "success" });

    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push(REDIRECT_PATH);
  };

  const statusColor = (kind: Status["kind"]) => {
    if (kind === "error") return "text-red-600";
    if (kind === "success") return "text-green-600";
    return "text-sky-600";
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-[14px] mt-[22px]">
      <h1 id="dang-nhap" className="font-heading text-[clamp(1.6rem,2.6vw,2rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
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
            onBlur={() => markField("identifier")}
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
            onBlur={() => markField("password")}
            className={`block w-full rounded-[10px] border border-line bg-surface pl-[44px] pr-[46px] py-3 text-[14.5px] text-ink placeholder-slate-400 focus:border-sky-500 focus:ring-0 transition-colors ${
              fieldErrors.password ? "border-red-600" : ""
            }`}
            aria-invalid={fieldErrors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
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
          onChange={() => setRemember((prev) => !prev)}
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
        className={`w-full min-h-[52px] px-[26px] rounded-[13px] bg-sky-700 text-white font-heading text-[15px] font-extrabold shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] hover:bg-sky-800 hover:-translate-y-[1px] active:translate-y-0 transition-all disabled:opacity-92 disabled:pointer-events-none`}
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

