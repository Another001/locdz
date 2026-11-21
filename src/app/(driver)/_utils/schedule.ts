import type { DaySchedule, Trip, TripPeriod, TripStatus } from "@/types";
import type { ScheduleTrip } from "@/types/driver";
import { formatTime } from "@/utils/format";
import { splitRouteName } from "@/utils/route";

const TIME_ZONE = "Asia/Ho_Chi_Minh";
const DAY_MS = 24 * 60 * 60 * 1000;

const WEEKDAYS = [
  { shortName: "T2", longName: "Thứ Hai" },
  { shortName: "T3", longName: "Thứ Ba" },
  { shortName: "T4", longName: "Thứ Tư" },
  { shortName: "T5", longName: "Thứ Năm" },
  { shortName: "T6", longName: "Thứ Sáu" },
  { shortName: "T7", longName: "Thứ Bảy" },
  { shortName: "CN", longName: "Chủ Nhật" },
] as const;

const dateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export interface ScheduleDay extends DaySchedule {
  dateKey: string;
  dateLabel: string;
  isToday: boolean;
}

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

function formatDateKey(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function toDateKey(date: Date): string {
  return dateKeyFormatter.format(date);
}

export function todayKey(): string {
  return toDateKey(new Date());
}

export function addDays(dateKey: string, days: number): string {
  const date = parseDateKey(dateKey);
  date.setUTCDate(date.getUTCDate() + days);

  return formatDateKey(date);
}

export function startOfWeek(dateKey: string): string {
  const date = parseDateKey(dateKey);
  const offset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - offset);

  return formatDateKey(date);
}

export function formatShortDate(dateKey: string): string {
  const [, month, day] = dateKey.split("-");

  return `${day}/${month}`;
}

export function formatLongDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-");

  return `${day}/${month}/${year}`;
}

export function formatWeekRange(weekStart: string): string {
  return `${formatShortDate(weekStart)} – ${formatShortDate(addDays(weekStart, 6))}`;
}

export function relativeWeekLabel(weekStart: string): string {
  const diff =
    (parseDateKey(weekStart).getTime() -
      parseDateKey(startOfWeek(todayKey())).getTime()) /
    DAY_MS;

  if (diff === 0) return "Tuần này";
  if (diff === -7) return "Tuần trước";
  if (diff === 7) return "Tuần sau";

  return `Tuần ${formatShortDate(weekStart)}`;
}

export function periodFromTime(time: string): TripPeriod {
  const hour = Number(time.slice(0, 2));

  if (!Number.isFinite(hour)) return "Sáng";
  if (hour < 12) return "Sáng";
  if (hour < 14) return "Trưa";
  if (hour < 18) return "Chiều";

  return "Tối";
}

export function mapTripStatus(
  tripStatus: string | undefined,
  assignmentStatus: string | undefined
): TripStatus {
  switch (tripStatus) {
    case "IN_PROGRESS":
      return "dang-chay";
    case "COMPLETED":
      return "hoan-thanh";
    case "CANCELLED":
      return "da-huy";
    default:
      break;
  }

  switch (assignmentStatus) {
    case "ASSIGNED":
      return "chua-nhan";
    case "ACCEPTED":
      return "da-nhan";
    case "PREPARING":
      return "chuan-bi";
    case "ARRIVED":
      return "co-mat";
    case "REJECTED":
      return "da-huy";
    default:
      return "khac";
  }
}

export function scheduleTripToTrip(trip: ScheduleTrip): Trip {
  const [from, to] = splitRouteName(
    trip.routeName || trip.routeCode || trip.tripCode
  );
  const time = formatTime(trip.departureAt);

  return {
    id: trip.id,
    time,
    period: periodFromTime(time),
    from: from || trip.tripCode,
    to,
    passengers: String(trip.passengerCount ?? 0),
    vehicle: trip.vehicleModel || trip.plateNumber,
    status: mapTripStatus(trip.tripStatus, trip.assignmentStatus),
    tripCode: trip.tripCode,
    assignmentStatus: trip.assignmentStatus,
    driverTripStatus: trip.tripStatus,
  };
}

function tripDateKey(trip: ScheduleTrip): string {
  const date = new Date(trip.departureAt);

  return Number.isNaN(date.getTime()) ? "" : toDateKey(date);
}

export function tripsForDate(
  trips: ScheduleTrip[],
  dateKey: string
): ScheduleTrip[] {
  return trips
    .filter((trip) => tripDateKey(trip) === dateKey)
    .sort(
      (a, b) =>
        new Date(a.departureAt).getTime() -
        new Date(b.departureAt).getTime()
    );
}

export function pickFocusDate(
  trips: ScheduleTrip[],
  today: string
): string {
  const dateKeys = Array.from(
    new Set(trips.map(tripDateKey).filter(Boolean))
  ).sort();

  if (!dateKeys.length) return today;

  const nearestUpcoming = dateKeys.find((dateKey) => dateKey >= today);

  return nearestUpcoming ?? dateKeys[dateKeys.length - 1];
}

export function buildWeekDays(
  weekStart: string,
  trips: ScheduleTrip[],
  selectedToday: string
): ScheduleDay[] {
  return WEEKDAYS.map((weekday, index) => {
    const dateKey = addDays(weekStart, index);

    return {
      index,
      shortName: weekday.shortName,
      longName: weekday.longName,
      date: dateKey.slice(8, 10),
      dateKey,
      dateLabel: formatShortDate(dateKey),
      isToday: dateKey === selectedToday,
      trips: tripsForDate(trips, dateKey).map(scheduleTripToTrip),
    };
  });
}
