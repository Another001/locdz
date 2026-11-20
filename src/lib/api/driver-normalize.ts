import type { AssignmentStep, TripDetail } from "@/types";
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

const ASSIGNMENT_META: Record<string, { label: string; hint: string }> = {
  ASSIGNED: {
    label: "Chưa nhận lệnh",
    hint: "Xác nhận nhận lệnh để bắt đầu chuẩn bị.",
  },
  ACCEPTED: {
    label: "Đã nhận lệnh",
    hint: "Bắt đầu chuẩn bị trước giờ chạy.",
  },
  PREPARING: {
    label: "Đang chuẩn bị",
    hint: "Xác nhận đã tới điểm đón trước khi khởi hành.",
  },
  ARRIVED: {
    label: "Đã tới",
    hint: "Đã có mặt tại điểm đón, có thể bắt đầu chuyến.",
  },
  COMPLETED: {
    label: "Hoàn thành",
    hint: "Chuyến đã hoàn thành.",
  },
  REJECTED: {
    label: "Đã từ chối",
    hint: "Bạn đã từ chối chuyến này.",
  },
  REPLACED: {
    label: "Đã bị thay",
    hint: "Chuyến đã được phân công cho tài xế khác.",
  },
};

const ASSIGNMENT_STEP_LABELS = [
  "Chưa nhận lệnh",
  "Đã nhận lệnh",
  "Đã chuẩn bị",
  "Đã tới",
];

function buildAssignmentSteps(status: string): AssignmentStep[] {
  if (status === "REJECTED" || status === "REPLACED") {
    return ASSIGNMENT_STEP_LABELS.map(
      (label): AssignmentStep => ({ label, state: "upcoming" })
    );
  }

  const completed =
    status === "ACCEPTED"
      ? 2
      : status === "PREPARING"
        ? 3
        : status === "ARRIVED" || status === "COMPLETED"
          ? 4
          : 0;

  return ASSIGNMENT_STEP_LABELS.map((label, index): AssignmentStep => {
    const state: AssignmentStep["state"] =
      index < completed ? "done" : index === completed ? "current" : "upcoming";

    return { label, state };
  });
}

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
  const assignmentStatus = data.assignmentStatus || "ASSIGNED";
  const assignmentMeta =
    ASSIGNMENT_META[assignmentStatus] ?? ASSIGNMENT_META.ASSIGNED;

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
    tripStatus: trip.status || "",
    assignmentStatus,
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
      label: assignmentMeta.label,
      steps: buildAssignmentSteps(assignmentStatus),
      hint: assignmentMeta.hint,
    },
  };
}
