export type DriverAssignmentStatus =
  | "ASSIGNED"
  | "ACCEPTED"
  | "PREPARING"
  | "ARRIVED"
  | "COMPLETED"
  | "REJECTED";

export type DriverTripStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface DriverTripRef {
  id: string;
  tripCode?: string;
  status?: DriverTripStatus;
  routeId?: string;
  routeCode?: string;
  routeName?: string;
  departureAt?: string;
  expectedArrivalAt?: string;
}

export interface DriverVehicleRef {
  id?: string;
  plateNumber?: string;
  vehicleModel?: string;
}

export interface DriverTripListItem {
  trip: DriverTripRef;
  vehicle?: DriverVehicleRef;
  assignmentStatus?: DriverAssignmentStatus;
  passengerCount?: number;
}

export interface DriverTripDetail extends DriverTripListItem {
  passengers?: unknown[];
}

export interface ScheduleTrip {
  id: string;
  tripCode: string;
  tripStatus: DriverTripStatus;
  assignmentStatus: DriverAssignmentStatus;
  passengerCount: number;
  departureAt: string;
  expectedArrivalAt: string;
  routeName: string;
  routeCode: string;
  vehicleModel: string;
  plateNumber: string;
}

export interface DriverTripStatusResponse {
  trip?: DriverTripRef;
  assignmentStatus?: DriverAssignmentStatus;
}

export interface DriverRejectTripResponse extends DriverTripStatusResponse {
  vehicle?: DriverVehicleRef;
  passengerCount?: number;
}
