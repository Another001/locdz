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
