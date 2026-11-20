export type DriverAssignmentStatus =
  | "ASSIGNED"
  | "ACCEPTED"
  | "PREPARING"
  | "ARRIVED"
  | "COMPLETED"
  | "REJECTED"
  | "REPLACED";

export type DriverTripStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "TERMINATED";

export interface DriverTripRef {
  id: string;
  tripCode?: string;
  status?: DriverTripStatus;
  routeId?: string;
  routeCode?: string;
  routeName?: string;
  originAreaName?: string;
  destinationAreaName?: string;
  departureAt?: string;
  expectedArrivalAt?: string;
  actualDepartureAt?: string;
  actualArrivalAt?: string;
  baseFareAmount?: number | null;
}

export interface DriverVehicleRef {
  id?: string;
  plateNumber?: string;
  vehicleModel?: string;
  passengerCapacity?: number | null;
  inspectionExpiresOn?: string | null;
  vehicleType?: string | null;
  manufacturingYear?: number | null;
  fuelType?: string | null;
  color?: string | null;
  status?: string;
}

export interface DriverTripListItem {
  trip: DriverTripRef;
  vehicle?: DriverVehicleRef;
  assignmentStatus?: DriverAssignmentStatus;
  passengerCount?: number;
}

export interface DriverTripDetail extends DriverTripListItem {
  passengers?: unknown[];
  acceptedAt?: string | null;
  rejectionReason?: string | null;
  expectedRevenue?: number;
  distanceKm?: number | null;
  durationMinutes?: number | null;
  originProvince?: string | null;
  destinationProvince?: string | null;
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
  passengerCapacity?: number;
  inspectionExpiresOn?: string;
  vehicleStatus?: string;
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

export interface DriverVehicleDocument {
  id: string;
  type: string;
  documentNumber: string;
  issuer: string;
  description: string;
  issuedOn: string;
  expiresOn: string;
  status: string;
  updatedAt: string;
}

export interface DriverVehicleRecentTrip {
  trip: {
    id: string;
    tripCode: string;
    status: string;
    routeName?: string;
    departureAt?: string;
    expectedArrivalAt?: string;
  };
  vehicle: {
    id: string;
    plateNumber: string;
  };
  assignmentStatus: string;
  passengerCount: number;
  passengers: unknown[];
}
