import type { TripDetail } from "@/types";
import type {
  DriverTripDetail,
  DriverTripListItem,
  ScheduleTrip,
} from "@/types/driver";

export function normalizeDriverTrip(
  item: DriverTripListItem,
  detail?: DriverTripDetail | null
): ScheduleTrip {
  const trip = { ...item.trip, ...detail?.trip };
  const vehicle = detail?.vehicle ?? item.vehicle;

  return {
    id: trip.id,
    tripCode: trip.tripCode ?? trip.id,
    tripStatus: trip.status ?? "SCHEDULED",
    assignmentStatus:
      detail?.assignmentStatus ?? item.assignmentStatus ?? "ASSIGNED",
    passengerCount:
      detail?.passengerCount ??
      item.passengerCount ??
      detail?.passengers?.length ??
      0,
    departureAt: trip.departureAt ?? "",
    expectedArrivalAt: trip.expectedArrivalAt ?? "",
    routeName: trip.routeName ?? "",
    routeCode: trip.routeCode ?? "",
    vehicleModel: vehicle?.vehicleModel ?? "",
    plateNumber: vehicle?.plateNumber ?? "",
  };
}

export function needsTripDetail(item: DriverTripListItem): boolean {
  return (
    !item.trip?.departureAt ||
    !item.trip?.routeName ||
    !(item.vehicle?.vehicleModel || item.vehicle?.plateNumber)
  );
}

const STATUS_LABELS: Record<string, string> = {
  SCHEDULED: "Sắp tới",
  IN_PROGRESS: "Đang chạy",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  REJECTED: "Đã từ chối",
};

function formatTime(iso: string | undefined): string {
  if (!iso) return "--:--";
  try {
    return new Date(iso).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "--:--";
  }
}

export function normalizeTripDetail(apiData: unknown): TripDetail {
  const data = apiData as {
    trip?: { tripCode?: string; routeName?: string; departureAt?: string; status?: string; id?: string; expectedArrivalAt?:string;  };
    vehicle?: { plateNumber?: string; vehicleModel?: string; id?: string};
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
  const departAt = trip.departureAt ? new Date(trip.departureAt) : null;
  const departTime = formatTime(trip.departureAt);
  const passengerCount = data.passengerCount ?? passengers.length;

  const routePoints: { time: string; name: string; address: string; kind: "start" | "end" }[] = [
    {
      time: departTime,
      name: "Điểm khởi hành",
      address: "",
      kind: "start",
    },
    {
      time: formatTime(trip.expectedArrivalAt as string | undefined),
      name: "Điểm kết thúc",
      address: "",
      kind: "end",
    },
  ];

  return {
    code: trip.tripCode || trip.id || "",
    when: departAt ? `Hôm nay · ${departTime}` : "—",
    route: trip.routeName || "",
    statusLabel: STATUS_LABELS[trip.status || ""] || trip.status || "—",
    departTime,
    totalSeats: 16,
    routePoints,
    stats: [
      { label: "Thời lượng", value: "—" },
      { label: "Quãng đường", value: "—" },
      {
        label: "Ghế trống",
        value: `${Math.max(0, 16 - passengerCount)} / 16`,
      },
      { label: "Tiền mặt dự kiến", value: "—" },
    ],
    vehicle: {
      name: vehicle.vehicleModel || "Xe",
      plate: vehicle.plateNumber || "",
      meta: "",
    },
    stops: routePoints.map((p, i) => ({
      id: `stop-${i}`,
      name: p.name,
      time: p.time,
      kind: p.kind,
      detail: p.address,
    })),
    passengers: passengers.map((p) => ({
      id: p.id || "",
      initial: p.passengerName?.charAt(0) || "?",
      name: p.passengerName || "",
      phone: p.passengerPhone || "",
      phoneRaw: p.passengerPhone || "",
      picked: p.passengerTripStatus === "PICKED_UP",
      paid: !!p.paymentCollected,
      pickup: p.pickupAddress || "",
      dropoff: p.dropoffAddress || "",
    })),
    summary: [
      { label: "Số khách", value: `${passengerCount} khách` },
      { label: "Ghế trống", value: `${Math.max(0, 16 - passengerCount)} chỗ` },
      { label: "Tiền mặt dự kiến", value: "—" },
      { label: "Điểm đón", value: "—" },
    ],
    assignment: {
      label:
        data.assignmentStatus === "ACCEPTED"
          ? "Đã nhận lệnh"
          : "Chưa nhận lệnh",
      steps: [
        {
          label: "Chưa nhận lệnh",
          state:
            data.assignmentStatus === "ACCEPTED" ? "done" : "current",
        },
        {
          label: "Đã nhận lệnh",
          state:
            data.assignmentStatus === "ACCEPTED" ? "done" : "upcoming",
        },
        { label: "Đang chuẩn bị", state: "upcoming" },
        { label: "Đã có mặt", state: "upcoming" },
      ],
      hint: "Xác nhận đã có mặt tại bến trước khi bắt đầu chuyến.",
    },
  };
}
