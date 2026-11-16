"use client";

import { useCallback, useEffect, useState } from "react";

import type { DriverProfile } from "@/types";
import type {
  DriverProfileResponse,
  UpdateDriverProfileRequest,
} from "@/types/driver";

import {
  DriverProfileApiError,
  fetchDriverProfile,
  updateDriverProfile,
} from "@/lib/api/driver-profile";

function normalizeProfile(data: DriverProfileResponse): DriverProfile {
  const initial = data.fullName?.charAt(0).toUpperCase();
  return {
    name: data.fullName,
    initial,
    meta: `Tài xế · Mã NV: ${data.employeeCode || "—"}`,
    fields: [
      { label: "Họ tên", value: data.fullName },
      { label: "Số điện thoại", value: data.phone },
      { label: "Email", value: data.email },
      { label: "Mã nhân viên", value: data.employeeCode },
      { label: "Công ty", value: data.companyName },
    ],
    licenseNote: "Chỉ đọc — admin cập nhật",
    licenseFields: [
      { label: "Số GPLX", value: data.licenseNumber },
      {
        label: "Hạng",
        value: data.licenseClass,
        badge: "sky",
      },
      { label: "Ngày hết hạn", value: data.licenseExpiresOn },
      {
        label: "Trạng thái",
        value:
          data.status === "ACTIVE" ? "Còn hiệu lực" : "Hết hiệu lực",
        badge: data.status === "ACTIVE" ? "green" : undefined,
      },
    ],
  };
}

export function useProfile() {
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProfile(normalizeProfile(await fetchDriverProfile()));
    } catch (err: unknown) {
      setError(
        err instanceof DriverProfileApiError
          ? err.message
          : "Không tải được hồ sơ."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchDriverProfile()
      .then((data) => {
        if (!cancelled) {
          setProfile(normalizeProfile(data));
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(
            loadError instanceof DriverProfileApiError
              ? loadError.message
              : "Không tải được hồ sơ."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpdate = useCallback(
    async (data: UpdateDriverProfileRequest) => {
      try {
        const result = await updateDriverProfile(data);
        setProfile(normalizeProfile(result));
        return true;
      } catch (err: unknown) {
        setError(
          err instanceof DriverProfileApiError
            ? err.message
            : "Cập nhật thất bại."
        );
        return false;
      }
    },
    []
  );

  return { profile, loading, error, reload, update: handleUpdate };
}