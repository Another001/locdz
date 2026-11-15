import type {
  DriverAssignmentStatus,
  DriverCollectPaymentResponse,
  DriverIncidentResponse,
  DriverPassengerStatusResponse,
  DriverRejectTripResponse,
  DriverTripDetail,
  DriverTripListItem,
  DriverTripStatus,
  DriverTripStatusResponse,
} from "@/types/driver";

import { backendRequest } from "./backend";

const DRIVER_TRIPS_PATH = "/api/v1/me/driver/trips";

function tripPath(tripId: string, suffix?: string) {
  const base = `${DRIVER_TRIPS_PATH}/${encodeURIComponent(tripId)}`;

  return suffix ? `${base}/${suffix}` : base;
}

export function getDriverTrips(token: string): Promise<DriverTripListItem[]> {
  return backendRequest<DriverTripListItem[]>(DRIVER_TRIPS_PATH, {
    token,
    fallbackMessage: "Không tải được lịch chạy.",
  });
}

export function getDriverTripDetail(
  token: string,
  tripId: string
): Promise<DriverTripDetail> {
  return backendRequest<DriverTripDetail>(tripPath(tripId), {
    token,
    fallbackMessage: "Không tải được chi tiết chuyến.",
  });
}

export function acceptDriverTrip(
  token: string,
  tripId: string
): Promise<DriverTripStatusResponse> {
  return backendRequest<DriverTripStatusResponse>(tripPath(tripId, "accept"), {
    method: "POST",
    body: {},
    token,
    fallbackMessage: "Không xác nhận được chuyến.",
  });
}

export function rejectDriverTrip(
  token: string,
  tripId: string,
  reason: string
): Promise<DriverRejectTripResponse> {
  return backendRequest<DriverRejectTripResponse>(tripPath(tripId, "reject"), {
    method: "POST",
    body: { wsRequest: { reason } },
    token,
    fallbackMessage: "Không từ chối được chuyến.",
  });
}

export function updateDriverAssignmentStatus(
  token: string,
  tripId: string,
  status: Extract<DriverAssignmentStatus, "PREPARING" | "ARRIVED">
): Promise<DriverTripStatusResponse> {
  return backendRequest<DriverTripStatusResponse>(
    tripPath(tripId, "assignment-status"),
    {
      method: "PATCH",
      body: { wsRequest: { status } },
      token,
      fallbackMessage: "Không cập nhật được trạng thái chuẩn bị.",
    }
  );
}

export function updateDriverTripStatus(
  token: string,
  tripId: string,
  status: Extract<DriverTripStatus, "IN_PROGRESS" | "COMPLETED">,
  actualAt?: string
): Promise<DriverTripStatusResponse> {
  return backendRequest<DriverTripStatusResponse>(tripPath(tripId, "status"), {
    method: "PATCH",
    body: {
      wsRequest: {
        status,
        actualAt: actualAt ?? new Date().toISOString(),
      },
    },
    token,
    fallbackMessage: "Không cập nhật được tiến trình chuyến.",
  });
}

export function reportDriverIncident(
  token: string,
  tripId: string,
  type: string,
  description: string
): Promise<DriverIncidentResponse> {
  return backendRequest<DriverIncidentResponse>(tripPath(tripId, "incidents"), {
    method: "POST",
    body: { wsRequest: { type, description } },
    token,
    fallbackMessage: "Không báo được sự cố.",
  });
}

export function updateDriverPassengerStatus(
  token: string,
  tripId: string,
  ticketId: string,
  status: string
): Promise<DriverPassengerStatusResponse> {
  return backendRequest<DriverPassengerStatusResponse>(
    tripPath(tripId, `passengers/${encodeURIComponent(ticketId)}/status`),
    {
      method: "PATCH",
      body: { wsRequest: { status } },
      token,
      fallbackMessage: "Không cập nhật được trạng thái hành khách.",
    }
  );
}

export function collectDriverPassengerPayment(
  token: string,
  tripId: string,
  ticketId: string,
  collectedAmount: number
): Promise<DriverCollectPaymentResponse> {
  return backendRequest<DriverCollectPaymentResponse>(
    tripPath(
      tripId,
      `passengers/${encodeURIComponent(ticketId)}/collect-payment`
    ),
    {
      method: "POST",
      body: { wsRequest: { collectedAmount } },
      token,
      fallbackMessage: "Không thu được tiền.",
    }
  );
}
