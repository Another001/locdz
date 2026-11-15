"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { AuthApiError, loginRequest } from "@/lib/api/auth-client";
import { safeRedirectPath } from "@/lib/auth/paths";

export type LoginStatusKind = "info" | "error" | "success";

export interface LoginStatus {
  message: string;
  kind: LoginStatusKind;
}

export interface LoginFieldErrors {
  identifier: boolean;
  password: boolean;
}

const EMPTY_ERRORS: LoginFieldErrors = {
  identifier: false,
  password: false,
};

export function useLogin() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<LoginStatus | null>(null);
  const [fieldErrors, setFieldErrors] =
    useState<LoginFieldErrors>(EMPTY_ERRORS);

  const markField = useCallback(
    (field: keyof LoginFieldErrors, value: string) => {
      setFieldErrors((current) => ({
        ...current,
        [field]: !value.trim(),
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus(null);

      const identifierOk = identifier.trim().length > 0;
      const passwordOk = password.length > 0;

      setFieldErrors({
        identifier: !identifierOk,
        password: !passwordOk,
      });

      if (!identifierOk || !passwordOk) {
        setStatus({
          message: "Vui lòng nhập đầy đủ tài khoản và mật khẩu.",
          kind: "error",
        });
        return;
      }

      setLoading(true);
      setStatus({ message: "Đang xác thực tài khoản...", kind: "info" });

      try {
        await loginRequest({
          identifier: identifier.trim(),
          password,
          remember,
        });

        setStatus({
          message: "Đăng nhập thành công, đang chuyển hướng...",
          kind: "success",
        });

        const nextPath = new URLSearchParams(window.location.search).get(
          "next"
        );
        const target = safeRedirectPath(nextPath, "/") ?? "/";

        router.replace(target);
        router.refresh();
      } catch (error) {
        setStatus({
          message:
            error instanceof AuthApiError
              ? error.message
              : "Không kết nối được máy chủ. Vui lòng kiểm tra mạng và thử lại.",
          kind: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [identifier, password, remember, router]
  );

  return {
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
  };
}
