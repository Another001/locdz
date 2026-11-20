import { authApi } from "@/api/method";
import { ApiError, wrapRequest } from "@/api/types";
import type {
  DriverCollectPaymentResponse,
  DriverIncidentResponse,
  DriverPassengerStatusResponse,
  DriverRejectTripResponse,
  DriverTripDetail,
  DriverTripListItem,
  DriverTripStatusResponse,
  ScheduleTrip,
} from "@/types/driver";

import { needsTripDetail, normalizeDriverTrip } from "./driver-normalize";

export class DriverApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DriverApiError";
    this.status = status;
  }
}

function toDriverApiError(error: unknown): DriverApiError {
  if (error instanceof DriverApiError) return error;

  if (error instanceof ApiError) {
    return new DriverApiError(error.message, error.status ?? 0);
  }

  return new DriverApiError(
    "Không kết nối được máy chủ. Vui lòng thử lại.",
    0
  );
}

async function run<T>(task: () => Promise<T>): Promise<T> {
  try {
    return await task();
  } catch (error) {
    throw toDriverApiError(error);
  }
}

const TRIPS_PATH = "/me/driver/trips";

function tripPath(tripId: string, suffix?: string): string {
  const base = `${TRIPS_PATH}/${encodeURIComponent(tripId)}`;

  return suffix ? `${base}/${suffix}` : base;
}

export function fetchScheduleTrips(): Promise<ScheduleTrip[]> {
  return run(async () => {
    const items = await authApi.get<DriverTripListItem[]>(TRIPS_PATH);

    return Promise.all(
      items.map(async (item) => {
        if (!needsTripDetail(item) || !item.trip?.id) {
          return normalizeDriverTrip(item);
        }

        try {
          const detail = await authApi.get<DriverTripDetail>(
            tripPath(item.trip.id)
          );

          return normalizeDriverTrip(item, detail);
        } catch {
          return normalizeDriverTrip(item);
        }
      })
    );
  });
}

export function fetchTripDetail(tripId: string): Promise<DriverTripDetail> {
  return run(() => authApi.get<DriverTripDetail>(tripPath(tripId)));
}

export function acceptScheduleTrip(
  tripId: string
): Promise<DriverTripStatusResponse> {
  return run(() =>
    authApi.post<DriverTripStatusResponse>(tripPath(tripId, "accept"), {})
  );
}

export function rejectScheduleTrip(
  tripId: string,
  reason: string
): Promise<DriverRejectTripResponse> {
  return run(() =>
    authApi.post<DriverRejectTripResponse>(
      tripPath(tripId, "reject"),
      wrapRequest({ reason })
    )
  );
}

export function updateScheduleAssignmentStatus(
  tripId: string,
  status: "PREPARING" | "ARRIVED"
): Promise<DriverTripStatusResponse> {
  return run(() =>
    authApi.patch<DriverTripStatusResponse>(
      tripPath(tripId, "assignment-status"),
      wrapRequest({ status })
    )
  );
}

export function updateScheduleTripStatus(
  tripId: string,
  status: "IN_PROGRESS" | "COMPLETED",
  actualAt?: string
): Promise<DriverTripStatusResponse> {
  return run(() =>
    authApi.patch<DriverTripStatusResponse>(
      tripPath(tripId, "status"),
      wrapRequest({
        status,
        ...(actualAt ? { actualAt } : {}),
      })
    )
  );
}

export function reportIncident(
  tripId: string,
  type: string,
  description: string
): Promise<DriverIncidentResponse> {
  return run(() =>
    authApi.post<DriverIncidentResponse>(
      tripPath(tripId, "incidents"),
      wrapRequest({ type, description })
    )
  );
}

export function updatePassengerStatus(
  tripId: string,
  ticketId: string,
  status: string
): Promise<DriverPassengerStatusResponse> {
  return run(() =>
    authApi.patch<DriverPassengerStatusResponse>(
      tripPath(
        tripId,
        `passengers/${encodeURIComponent(ticketId)}/status`
      ),
      wrapRequest({ status })
    )
  );
}

export function collectPassengerPayment(
  tripId: string,
  ticketId: string,
  collectedAmount: number
): Promise<DriverCollectPaymentResponse> {
  return run(() =>
    authApi.post<DriverCollectPaymentResponse>(
      tripPath(
        tripId,
        `passengers/${encodeURIComponent(ticketId)}/collect-payment`
      ),
      wrapRequest({ collectedAmount })
    )
  );
}
