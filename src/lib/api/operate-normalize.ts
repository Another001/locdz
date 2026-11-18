import type { OperateTrip, Passenger, RouteStop, SummaryItem } from "@/types";
import type { DriverTripDetail } from "@/types/driver";

const TIME_ZONE = "Asia/Ho_Chi_Minh";

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return phone;
  const head = digits.slice(0, 4);
  const tail = digits.slice(-3);
  return `${head} *** ${tail}`;
}

export function formatMoney(amount: number): string {
  return moneyFormatter.format(amount);
}

function formatTime(iso: string | undefined): string {
  if (!iso) return "--:--";
  try {
    return timeFormatter.format(new Date(iso));
  } catch {
    return "--:--";
  }
}

const STATUS_LABELS: Record<string, string> = {
  SCHEDULED: "Sắp tới",
  ACCEPTED: "Đã nhận lệnh",
  PREPARING: "Đang chuẩn bị",
  ARRIVED: "Đã có mặt",
  IN_PROGRESS: "Đang chạy",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  REJECTED: "Đã từ chối",
};

const PASSENGER_STATUS_LABELS: Record<
  string,
  "cho-don" | "da-don" | "da-tra"
> = {
  PICKED_UP: "da-don",
  DROPPED_OFF: "da-tra",
};

export function normalizeOperateTrip(apiData: unknown): OperateTrip {
  const data = apiData as {
    trip?: {
      id?: string;
      tripCode?: string;
      routeName?: string;
      departureAt?: string;
      expectedArrivalAt?: string;
      status?: string;
    };
    vehicle?: {
      id?: string;
      plateNumber?: string;
      vehicleModel?: string;
    };
    assignmentStatus?: string;
    passengerCount?: number;
    passengers?: Array<{
      id?: string;
      passengerName?: string;
      passengerPhone?: string;
      pickupAddress?: string;
      dropoffAddress?: string;
      seatCode?: string;
      fareAmount?: number;
      paymentCollected?: boolean;
      collectedAmount?: number;
      status?: string;
      passengerTripStatus?: string;
      createdAt?: string;
    }>;
  };

  const trip = data.trip ?? {};
  const vehicle = data.vehicle ?? {};
  const passengers = data.passengers ?? [];

  const routeName = trip.routeName || "";
  const [from, to] = splitRouteName(routeName);

  const code = trip.tripCode || trip.id || "";
  const statusLabel = STATUS_LABELS[trip.status || ""] || trip.status || "—";
  const vehicleLabel = vehicle.plateNumber || vehicle.vehicleModel || "Xe";

  const mappedPassengers: Passenger[] = passengers.map((p) => {
    const name = p.passengerName || "";
    const phone = p.passengerPhone || "";
    const status = PASSENGER_STATUS_LABELS[p.passengerTripStatus || ""] ?? "cho-don";
    const fareAmount = Number(p.fareAmount || 0);
    const collectedAmount = Number(p.collectedAmount || 0);
    const paid = !!p.paymentCollected || collectedAmount > 0;

    return {
      id: p.id || "",
      initial: name.charAt(0) || "?",
      name,
      phoneMasked: maskPhone(phone),
      phone,
      status,
      paid,
      amount: collectedAmount,
      fare: formatMoney(fareAmount),
      paymentMethod: "Tiền mặt",
      pickup: p.pickupAddress || "",
      dropoff: p.dropoffAddress || "",
    };
  });

  const boarded = mappedPassengers.filter((p) => p.status === "da-don").length;
  const dropped = mappedPassengers.filter((p) => p.status === "da-tra").length;
  const totalPassengers = mappedPassengers.length;
  const totalStops = Math.max(2, mappedPassengers.length > 0 ? 2 : 1);
  const stopsDone =
    boarded + dropped > 0 ? Math.min(totalStops, boarded + dropped) : 0;
  const percent =
    totalPassengers > 0
      ? Math.round(((boarded + dropped) / totalPassengers) * 100)
      : 0;
  const cashCollected = mappedPassengers.reduce(
    (sum, p) => sum + (p.paid ? p.amount : 0),
    0
  );
  const totalFare = mappedPassengers.reduce((sum, p) => sum + p.amount, 0);

  const departTime = formatTime(trip.departureAt);
  const arrivalTime = formatTime(trip.expectedArrivalAt);

  const stops: RouteStop[] = [
    {
      id: `stop-start`,
      name: from || "Điểm khởi hành",
      time: departTime,
      state:
        trip.status === "COMPLETED" || trip.status === "IN_PROGRESS"
          ? "done"
          : "active",
      detail: "Điểm khởi hành",
    },
    {
      id: `stop-end`,
      name: to || "Điểm kết thúc",
      time: arrivalTime,
      state: trip.status === "COMPLETED" ? "done" : "end",
      detail: "Điểm kết thúc",
    },
  ];

  const summary: SummaryItem[] = [
    { label: "Số khách", value: `${totalPassengers} khách` },
    { label: "Đã đón / trả", value: `${boarded} / ${dropped}` },
    { label: "Xe", value: vehicleLabel },
    { label: "Đã thu", value: formatMoney(cashCollected) },
    { label: "Tiền mặt dự kiến", value: formatMoney(totalFare) },
  ];

  return {
    code,
    from,
    to,
    status: statusLabel,
    vehicle: vehicleLabel,
    progress: {
      boarded,
      totalPassengers,
      stopsDone,
      totalStops,
      percent,
      cashCollected,
    },
    summary,
    passengers: mappedPassengers,
    stops,
  };
}

function splitRouteName(routeName: string): [string, string] {
  const parts = routeName
    .split(/\s+(?:-|–|—|→|->|đi|đến)\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(" - ")];
  }

  return [routeName.trim(), ""];
}
