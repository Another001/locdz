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
