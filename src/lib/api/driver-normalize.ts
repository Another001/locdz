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
