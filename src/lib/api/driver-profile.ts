import { authApi } from "@/api/method";
import { ApiError, wrapRequest } from "@/api/types";
import type {
  DriverProfileResponse,
  DriverVehicleDocument,
  DriverVehicleRecentTrip,
  DriverVehicleResponse,
  UpdateDriverProfileRequest,
} from "@/types/driver";

export class DriverProfileApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DriverProfileApiError";
    this.status = status;
  }
}

function toProfileApiError(error: unknown): DriverProfileApiError {
  if (error instanceof DriverProfileApiError) return error;

  if (error instanceof ApiError) {
    return new DriverProfileApiError(error.message, error.status ?? 0);
  }

  return new DriverProfileApiError(
    "Không kết nối được máy chủ. Vui lòng thử lại.",
    0
  );
}

async function run<T>(task: () => Promise<T>): Promise<T> {
  try {
    return await task();
  } catch (error) {
    throw toProfileApiError(error);
  }
}

const PROFILE_PATH = "/me/driver-profile";
const VEHICLE_PATH = "/me/driver/vehicle";
const VEHICLE_DOCUMENTS_PATH = "/me/driver/vehicle/documents";
const VEHICLE_RECENT_TRIPS_PATH = "/me/driver/vehicle/trips/recent";

export function fetchDriverProfile(): Promise<DriverProfileResponse> {
  return run(async () => {
    const raw = await authApi.get<
      DriverProfileResponse | DriverProfileResponse[]
    >(PROFILE_PATH);
    const data = Array.isArray(raw) ? raw[0] : raw;

    if (!data || typeof data !== "object") {
      throw new DriverProfileApiError("Không tìm thấy dữ liệu hồ sơ.", 400);
    }

    return data;
  });
}

export function updateDriverProfile(
  data: UpdateDriverProfileRequest
): Promise<DriverProfileResponse> {
  return run(async () => {
    const raw = await authApi.patch<
      DriverProfileResponse | DriverProfileResponse[]
    >(PROFILE_PATH, wrapRequest(data));
    const result = Array.isArray(raw) ? raw[0] : raw;

    if (!result || typeof result !== "object") {
      throw new DriverProfileApiError("Không cập nhật được hồ sơ.", 400);
    }

    return result;
  });
}

export function fetchDriverVehicle(): Promise<DriverVehicleResponse> {
  return run(async () => {
    const raw = await authApi.get<
      DriverVehicleResponse | DriverVehicleResponse[]
    >(VEHICLE_PATH);
    const data = Array.isArray(raw) ? raw[0] : raw;

    if (!data || typeof data !== "object") {
      throw new DriverProfileApiError("Không tìm thấy thông tin xe.", 400);
    }

    return data;
  });
}

export function fetchDriverVehicleDocuments(): Promise<
  DriverVehicleDocument[]
> {
  return run(async () => {
    const data = await authApi.get<DriverVehicleDocument[]>(
      VEHICLE_DOCUMENTS_PATH
    );

    if (!Array.isArray(data)) {
      throw new DriverProfileApiError(
        "Không tìm thấy dữ liệu giấy tờ xe.",
        400
      );
    }

    return data;
  });
}

export function fetchDriverVehicleRecentTrips(): Promise<
  DriverVehicleRecentTrip[]
> {
  return run(async () => {
    const data = await authApi.get<DriverVehicleRecentTrip[]>(
      VEHICLE_RECENT_TRIPS_PATH
    );

    if (!Array.isArray(data)) {
      throw new DriverProfileApiError(
        "Không tìm thấy dữ liệu lịch sử chuyến.",
        400
      );
    }

    return data;
  });
}
