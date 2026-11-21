import type { AssignmentStep, TripDetail, TripRoutePoint } from "@/types";
import type {
  DriverTripDetail,
  DriverTripListItem,
  ScheduleTrip,
} from "@/types/driver";
import {
  formatCurrency,
  formatDistance,
  formatDuration,
  formatInspection,
  formatLocalTime,
  formatWhen,
} from "@/utils/format";

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
    passengerCapacity: vehicle?.passengerCapacity ?? undefined,
    inspectionExpiresOn: vehicle?.inspectionExpiresOn ?? undefined,
    vehicleStatus: vehicle?.status ?? undefined,
  };
}

export function needsTripDetail(item: DriverTripListItem): boolean {
  return (
    !item.trip?.departureAt ||
    !item.trip?.routeName ||
    !(item.vehicle?.vehicleModel || item.vehicle?.plateNumber) ||
    !item.vehicle?.passengerCapacity ||
    !item.vehicle?.inspectionExpiresOn ||
    !item.vehicle?.status
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

export function normalizeTripDetail(apiData: unknown): TripDetail {
  const data = apiData as {
    trip?: {
      id?: string;
      tripCode?: string;
      routeName?: string;
      originAreaName?: string;
      destinationAreaName?: string;
      departureAt?: string;
      expectedArrivalAt?: string;
      status?: string;
    };
    vehicle?: {
      plateNumber?: string;
      vehicleModel?: string;
      passengerCapacity?: number | null;
      inspectionExpiresOn?: string | null;
      color?: string | null;
    };
    assignmentStatus?: string;
    passengerCount?: number;
    expectedRevenue?: number;
    distanceKm?: number | null;
    durationMinutes?: number | null;
    originProvince?: string | null;
    destinationProvince?: string | null;
    passengers?: Array<{
      id?: string;
      passengerName?: string;
      passengerPhone?: string;
      pickupAddress?: string;
      dropoffAddress?: string;
      seatCode?: string;
      fareAmount?: number;
      paymentCollected?: boolean | null;
      collectedAmount?: number | null;
      status?: string;
      passengerTripStatus?: string | null;
      createdAt?: string;
    }>;
  };

  const trip = data.trip ?? {};
  const vehicle = data.vehicle ?? {};
  const passengers = data.passengers ?? [];
  const departTime = formatLocalTime(trip.departureAt);
  const passengerCount = data.passengerCount ?? passengers.length;
  const totalSeats = vehicle.passengerCapacity ?? 16;
  const availableSeats = Math.max(0, totalSeats - passengerCount);
  const assignmentStatus = data.assignmentStatus || "ASSIGNED";
  const assignmentMeta =
    ASSIGNMENT_META[assignmentStatus] ?? ASSIGNMENT_META.ASSIGNED;
  const originName =
    trip.originAreaName || data.originProvince || "Điểm khởi hành";
  const destinationName =
    trip.destinationAreaName || data.destinationProvince || "Điểm kết thúc";
  const expectedRevenue =
    data.expectedRevenue ??
    passengers.reduce((sum, p) => sum + (p.fareAmount ?? 0), 0);
  const pickupPointCount = new Set(
    passengers.map((p) => p.pickupAddress).filter(Boolean)
  ).size;

  const routePoints: TripRoutePoint[] = [
    {
      time: departTime,
      name: originName,
      address:
        data.originProvince && data.originProvince !== originName
          ? data.originProvince
          : "",
      kind: "start",
    },
    {
      time: formatLocalTime(trip.expectedArrivalAt),
      name: destinationName,
      address:
        data.destinationProvince && data.destinationProvince !== destinationName
          ? data.destinationProvince
          : "",
      kind: "end",
    },
  ];

  return {
    code: trip.tripCode || trip.id || "",
    when: formatWhen(trip.departureAt),
    route:
      trip.routeName ||
      (originName !== destinationName
        ? `${originName} → ${destinationName}`
        : originName),
    statusLabel: STATUS_LABELS[trip.status || ""] || trip.status || "—",
    tripStatus: trip.status || "",
    assignmentStatus,
    departTime,
    totalSeats,
    routePoints,
    stats: [
      { label: "Thời lượng", value: formatDuration(data.durationMinutes) },
      { label: "Quãng đường", value: formatDistance(data.distanceKm) },
      {
        label: "Ghế trống",
        value: `${availableSeats} / ${totalSeats}`,
      },
      {
        label: "Tiền mặt dự kiến",
        value: formatCurrency(expectedRevenue),
      },
    ],
    vehicle: {
      name: vehicle.vehicleModel || "Xe",
      plate: vehicle.plateNumber || "",
      meta: formatInspection(vehicle.inspectionExpiresOn),
      color: vehicle.color || "",
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
      picked:
        p.passengerTripStatus === "PICKED_UP" ||
        p.passengerTripStatus === "DROPPED_OFF",
      paid: !!p.paymentCollected || (p.collectedAmount ?? 0) > 0,
      pickup: p.pickupAddress || "",
      dropoff: p.dropoffAddress || "",
    })),
    summary: [
      { label: "Số khách", value: `${passengerCount} khách` },
      { label: "Ghế trống", value: `${availableSeats} chỗ` },
      {
        label: "Tiền mặt dự kiến",
        value: formatCurrency(expectedRevenue),
      },
      {
        label: "Điểm đón",
        value: pickupPointCount > 0 ? `${pickupPointCount} điểm` : "—",
      },
    ],
    assignment: {
      label: assignmentMeta.label,
      steps: buildAssignmentSteps(assignmentStatus),
      hint: assignmentMeta.hint,
    },
  };
}
