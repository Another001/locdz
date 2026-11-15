import type {
  DriverProfileResponse,
  DriverVehicleDocument,
  DriverVehicleRecentTrip,
  DriverVehicleResponse,
  UpdateDriverProfileRequest,
} from "@/types/driver";

import { backendRequest } from "./backend";

const DRIVER_PROFILE_PATH = "/api/v1/me/driver-profile";
const DRIVER_VEHICLE_PATH = "/api/v1/me/driver/vehicle";
const DRIVER_VEHICLE_DOCUMENTS_PATH = "/api/v1/me/driver/vehicle/documents";
const DRIVER_VEHICLE_RECENT_TRIPS_PATH =
  "/api/v1/me/driver/vehicle/trips/recent";

export function getDriverProfile(
  token: string
): Promise<DriverProfileResponse> {
  return backendRequest<DriverProfileResponse>(DRIVER_PROFILE_PATH, {
    token,
    fallbackMessage: "Không tải được hồ sơ tài xế.",
  });
}

export function updateDriverProfile(
  token: string,
  data: UpdateDriverProfileRequest
): Promise<DriverProfileResponse> {
  return backendRequest<DriverProfileResponse>(DRIVER_PROFILE_PATH, {
    method: "PATCH",
    body: { wsRequest: data },
    token,
    fallbackMessage: "Không cập nhật được hồ sơ.",
  });
}

export function getDriverVehicle(
  token: string
): Promise<DriverVehicleResponse> {
  return backendRequest<DriverVehicleResponse>(DRIVER_VEHICLE_PATH, {
    token,
    fallbackMessage: "Không tải được thông tin xe.",
  });
}

export function getDriverVehicleDocuments(
  token: string
): Promise<DriverVehicleDocument[]> {
  return backendRequest<DriverVehicleDocument[]>(
    DRIVER_VEHICLE_DOCUMENTS_PATH,
    {
      token,
      fallbackMessage: "Không tải được giấy tờ xe.",
    }
  );
}

export function getDriverVehicleRecentTrips(
  token: string
): Promise<DriverVehicleRecentTrip[]> {
  return backendRequest<DriverVehicleRecentTrip[]>(
    DRIVER_VEHICLE_RECENT_TRIPS_PATH,
    {
      token,
      fallbackMessage: "Không tải được lịch sử chuyến gần đây.",
    }
  );
}