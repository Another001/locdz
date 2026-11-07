export type TripStatus = "chua-nhan" | "da-nhan" | "chuan-bi" | "co-mat";

export type TripPeriod = "Sáng" | "Trưa" | "Chiều" | "Tối";

export interface Trip {
  id: string;
  time: string;
  period: TripPeriod;
  from: string;
  to: string;
  passengers: string;
  vehicle: string;
  status: TripStatus;
  lateMinutes?: number;
}

export interface DaySchedule {
  index: number;
  shortName: string;
  longName: string;
  date: string;
  trips: Trip[];
}

export interface WeekOverview {
  relativeLabel: string;
  range: string;
  jumpLabel: string;
  todayIndex: number;
}

export type PassengerStatus = "cho-don" | "da-don" | "da-tra";

export interface Passenger {
  id: string;
  initial: string;
  name: string;
  phoneMasked: string;
  phone: string;
  status: PassengerStatus;
  paid: boolean;
  amount: number;
  fare: string;
  paymentMethod: string;
  pickup: string;
  dropoff: string;
}

export type RouteStopState = "done" | "active" | "end";

export interface RouteStop {
  id: string;
  name: string;
  time: string;
  state: RouteStopState;
  detail: string;
}

export interface OperateProgress {
  boarded: number;
  totalPassengers: number;
  stopsDone: number;
  totalStops: number;
  percent: number;
  cashCollected: number;
}

export interface SummaryItem {
  label: string;
  value: string;
}

export interface OperateTrip {
  code: string;
  from: string;
  to: string;
  status: string;
  vehicle: string;
  progress: OperateProgress;
  summary: SummaryItem[];
  passengers: Passenger[];
  stops: RouteStop[];
}

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface Vehicle {
  name: string;
  plate: string;
  status: string;
  specs: VehicleSpec[];
}

export interface VehicleDocument {
  id: string;
  name: string;
  detail: string;
  valid: boolean;
  expiry: string;
}

export interface VehicleTrip {
  id: string;
  route: string;
  time: string;
  success: boolean;
}

export interface VehiclePageData {
  vehicle: Vehicle;
  documentsUpdatedAt: string;
  documents: VehicleDocument[];
  trips: VehicleTrip[];
  adminNote: string;
  tipNote: string;
}

export type ProfileBadge = "sky" | "green";

export interface ProfileField {
  label: string;
  value: string;
  badge?: ProfileBadge;
}

export interface DriverProfile {
  name: string;
  initial: string;
  meta: string;
  fields: SummaryItem[];
  licenseNote: string;
  licenseFields: ProfileField[];
}

export type TripStopKind = "start" | "end";

export interface TripRoutePoint {
  time: string;
  name: string;
  address: string;
  kind: TripStopKind;
}

export interface TripDetailStop {
  id: string;
  name: string;
  time: string;
  detail: string;
  kind: TripStopKind;
}

export interface TripDetailPassenger {
  id: string;
  initial: string;
  name: string;
  phone: string;
  phoneRaw: string;
  picked: boolean;
  paid: boolean;
  pickup: string;
  dropoff: string;
}

export interface TripDetailVehicle {
  name: string;
  plate: string;
  meta: string;
}

export type AssignmentStepState = "done" | "current" | "upcoming";

export interface AssignmentStep {
  label: string;
  state: AssignmentStepState;
}

export interface TripDetailAssignment {
  label: string;
  steps: AssignmentStep[];
  hint: string;
}

export interface TripDetail {
  code: string;
  when: string;
  route: string;
  statusLabel: string;
  departTime: string;
  totalSeats: number;
  routePoints: TripRoutePoint[];
  stats: SummaryItem[];
  vehicle: TripDetailVehicle;
  stops: TripDetailStop[];
  passengers: TripDetailPassenger[];
  summary: SummaryItem[];
  assignment: TripDetailAssignment;
}
