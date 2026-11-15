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

export type DriverIncidentType =
  | "VEHICLE_BREAKDOWN"
  | "TRAFFIC"
  | "PASSENGER_NO_SHOW"
  | "OTHER";

export interface DriverIncidentRequest {
  type: DriverIncidentType;
  description: string;
}

export interface DriverIncidentResponse {
  id: string;
  tripId: string;
  type: DriverIncidentType;
  description: string;
  status: string;
  openedAt: string;
}

export interface DriverPassengerStatusRequest {
  status: string;
}

export interface DriverPassengerStatusResponse {
  id: string;
  ticketCode: string;
  status: string;
  passengerTripStatus: string;
}

export interface DriverCollectPaymentRequest {
  collectedAmount: number;
}

export interface DriverCollectPaymentResponse {
  id: string;
  ticketCode: string;
  passengerName: string;
  passengerPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  seatCode: string;
  fareAmount: number;
  paymentCollected: boolean;
  collectedAmount: number;
  status: string;
  passengerTripStatus: string;
  createdAt: string;
}

export interface DriverProfileResponse {
  id: string;
  companyId: string;
  companyName: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  employeeCode: string;
  licenseNumber: string;
  licenseClass: string;
  licenseExpiresOn: string;
  status: string;
}

export interface UpdateDriverProfileRequest {
  companyId?: string;
  employeeCode?: string;
  licenseNumber?: string;
  licenseClass?: string;
  licenseExpiresOn?: string;
}

export interface DriverVehicleResponse {
  id: string;
  companyId: string;
  plateNumber: string;
  vehicleModel: string;
  passengerCapacity: number;
  inspectionExpiresOn: string;
  vehicleType: string;
  manufacturingYear: number;
  fuelType: string;
  color: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
