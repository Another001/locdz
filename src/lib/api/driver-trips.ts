import type {
  DriverCollectPaymentResponse,
  DriverIncidentResponse,
  DriverPassengerStatusResponse,
  DriverRejectTripResponse,
  DriverTripStatusResponse,
  ScheduleTrip,
} from "@/types/driver";

interface ErrorBody {
  message?: string;
}

export class DriverApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DriverApiError";
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
    throw new DriverApiError(
      body?.message || "Yêu cầu thất bại. Vui lòng thử lại.",
      response.status
    );
  }

  return body as T;
}

export async function fetchScheduleTrips(): Promise<ScheduleTrip[]> {
  const body = await request<{ trips?: ScheduleTrip[] }>("/api/driver/trips");

  return body.trips ?? [];
}

export async function fetchTripDetail(tripId: string): Promise<unknown> {
  return request<unknown>(
    `/api/driver/trips/${encodeURIComponent(tripId)}`,
    { method: "GET" }
  );
}

export function acceptScheduleTrip(
  tripId: string
): Promise<DriverTripStatusResponse> {
  return request<DriverTripStatusResponse>(
    `/api/driver/trips/${encodeURIComponent(tripId)}/accept`,
    { method: "POST" }
  );
}

export function rejectScheduleTrip(
  tripId: string,
  reason: string
): Promise<DriverRejectTripResponse> {
  return request<DriverRejectTripResponse>(
    `/api/driver/trips/${encodeURIComponent(tripId)}/reject`,
    {
      method: "POST",
      body: JSON.stringify({ reason }),
    }
  );
}

export function updateScheduleAssignmentStatus(
  tripId: string,
  status: "PREPARING" | "ARRIVED"
): Promise<DriverTripStatusResponse> {
  return request<DriverTripStatusResponse>(
    `/api/driver/trips/${encodeURIComponent(tripId)}/assignment-status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  );
}

export function updateScheduleTripStatus(
  tripId: string,
  status: "IN_PROGRESS" | "COMPLETED",
  actualAt?: string
): Promise<DriverTripStatusResponse> {
  return request<DriverTripStatusResponse>(
    `/api/driver/trips/${encodeURIComponent(tripId)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(
        actualAt ? { status, actualAt } : { status }
      ),
    }
  );
}

export function reportIncident(
  tripId: string,
  type: string,
  description: string
): Promise<DriverIncidentResponse> {
  return request<DriverIncidentResponse>(
    `/api/driver/trips/${encodeURIComponent(tripId)}/incidents`,
    {
      method: "POST",
      body: JSON.stringify({ type, description }),
    }
  );
}

export function updatePassengerStatus(
  tripId: string,
  ticketId: string,
  status: string
): Promise<DriverPassengerStatusResponse> {
  return request<DriverPassengerStatusResponse>(
    `/api/driver/trips/${encodeURIComponent(tripId)}/passengers/${encodeURIComponent(ticketId)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  );
}

export function collectPassengerPayment(
  tripId: string,
  ticketId: string,
  collectedAmount: number
): Promise<DriverCollectPaymentResponse> {
  return request<DriverCollectPaymentResponse>(
    `/api/driver/trips/${encodeURIComponent(tripId)}/passengers/${encodeURIComponent(ticketId)}/collect-payment`,
    {
      method: "POST",
      body: JSON.stringify({ collectedAmount }),
    }
  );
}
