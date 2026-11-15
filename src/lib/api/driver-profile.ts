import type {
  DriverProfileResponse,
  DriverVehicleResponse,
  UpdateDriverProfileRequest,
} from "@/types/driver";

interface ErrorBody {
  message?: string;
}

export class DriverProfileApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DriverProfileApiError";
    this.status = status;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const body = (await response.json().catch(() => null)) as
    | (T & ErrorBody)
    | null;

  if (!response.ok) {
    throw new DriverProfileApiError(
      body?.message || "Yêu cầu thất bại. Vui lòng thử lại.",
      response.status
    );
  }

  return body as T;
}

export async function fetchDriverProfile(): Promise<DriverProfileResponse> {
  const body = await request<{ wsResponse?: unknown }>("/api/driver/profile", {
    method: "GET",
  });

  const wsResponse = body?.wsResponse;
  const data = Array.isArray(wsResponse) ? wsResponse[0] : wsResponse;

  if (!data || typeof data !== "object") {
    throw new DriverProfileApiError("Không tìm thấy dữ liệu hồ sơ.", 400);
  }

  return data as DriverProfileResponse;
}

export async function updateDriverProfile(
  data: UpdateDriverProfileRequest
): Promise<DriverProfileResponse> {
  const body = await request<{ wsResponse?: unknown }>("/api/driver/profile", {
    method: "PATCH",
    body: JSON.stringify({ wsRequest: data }),
  });

  const wsResponse = body?.wsResponse;
  const result = Array.isArray(wsResponse) ? wsResponse[0] : wsResponse;

  if (!result || typeof result !== "object") {
    throw new DriverProfileApiError("Không cập nhật được hồ sơ.", 400);
  }

  return result as DriverProfileResponse;
}

export async function fetchDriverVehicle(): Promise<DriverVehicleResponse> {
  const body = await request<{ wsResponse?: unknown }>("/api/driver/vehicle", {
    method: "GET",
  });

  const wsResponse = body?.wsResponse;
  const data = Array.isArray(wsResponse) ? wsResponse[0] : wsResponse;

  if (!data || typeof data !== "object") {
    throw new DriverProfileApiError("Không tìm thấy thông tin xe.", 400);
  }

  return data as DriverVehicleResponse;
}