import type { Vehicle, VehicleDocument, VehicleSpec, VehicleTrip } from "@/types";
import type {
  DriverVehicleDocument,
  DriverVehicleRecentTrip,
  DriverVehicleResponse,
} from "@/types/driver";

function formatExpiryDate(isoDate: string | undefined): string {
  if (!isoDate) return "—";
  try {
    const d = new Date(isoDate);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `HSD ${month}/${year}`;
  } catch {
    return "—";
  }
}

function formatTripTime(isoDate: string | undefined): string {
  if (!isoDate) return "—";
  try {
    return new Date(isoDate).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "—";
  }
}

export function normalizeVehicle(
  api: DriverVehicleResponse
): Vehicle {
  const specs: VehicleSpec[] = [
    { label: "Loại xe", value: api.vehicleType || "—" },
    { label: "Biển số", value: api.plateNumber || "—" },
    { label: "Số chỗ", value: `${api.passengerCapacity} chỗ` },
    { label: "Năm sản xuất", value: String(api.manufacturingYear || "—") },
    { label: "Nhiên liệu", value: api.fuelType || "—" },
    { label: "Màu xe", value: api.color || "—" },
    { label: "Kiểm định đến", value: formatExpiryDate(api.inspectionExpiresOn) },
  ];

  return {
    name: api.vehicleModel || "Xe",
    plate: api.plateNumber || "—",
    status: api.status === "ACTIVE" ? "Hoạt động" : api.status || "—",
    specs,
  };
}

export function normalizeVehicleDocuments(
  api: DriverVehicleDocument[]
): VehicleDocument[] {
  return api.map((doc) => ({
    id: doc.id,
    name: doc.type || doc.description || "Giấy tờ",
    detail: `${doc.documentNumber || ""} · ${doc.issuer || ""}`.trim() || "—",
    valid: doc.status === "ACTIVE",
    expiry: formatExpiryDate(doc.expiresOn),
  }));
}

export function normalizeVehicleRecentTrips(
  api: DriverVehicleRecentTrip[]
): VehicleTrip[] {
  return api.map((item) => {
    const isCompleted = item.assignmentStatus === "COMPLETED";
    const departTime = formatTripTime(item.trip.departureAt);
    const timeLabel =
      item.trip.departureAt && departTime !== "—"
        ? `Hôm nay · ${departTime}`
        : "—";

    return {
      id: item.trip.tripCode || item.trip.id,
      route: item.trip.routeName || "—",
      time: timeLabel,
      success: isCompleted,
    };
  });
}