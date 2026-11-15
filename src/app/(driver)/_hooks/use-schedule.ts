"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import type { Trip } from "@/types";
import type { ScheduleTrip } from "@/types/driver";
import {
  DriverApiError,
  acceptScheduleTrip,
  fetchScheduleTrips,
  rejectScheduleTrip,
  updateScheduleAssignmentStatus,
  updateScheduleTripStatus,
} from "@/lib/api/driver-trips";

import {
  addDays,
  buildWeekDays,
  formatWeekRange,
  relativeWeekLabel,
  startOfWeek,
  todayKey,
} from "../_utils/schedule";
import type { ScheduleDay } from "../_utils/schedule";

const EMPTY_DAY: ScheduleDay = {
  index: 0,
  shortName: "T2",
  longName: "Hôm nay",
  date: "--",
  dateKey: "",
  dateLabel: "--/--",
  isToday: false,
  trips: [],
};

const subscribeToClock = (onChange: () => void) => {
  const timer = setInterval(onChange, 60_000);

  return () => clearInterval(timer);
};

const getServerToday = () => "";

function errorMessage(error: unknown): string {
  return error instanceof DriverApiError
    ? error.message
    : "Không kết nối được máy chủ. Vui lòng thử lại.";
}

export function useSchedule() {
  const [trips, setTrips] = useState<ScheduleTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingTripId, setPendingTripId] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const today = useSyncExternalStore(
    subscribeToClock,
    todayKey,
    getServerToday
  );

  const activeWeekStart = weekStart ?? (today ? startOfWeek(today) : null);
  const activeDate = selectedDate ?? (today || null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setTrips(await fetchScheduleTrips());
    } catch (loadError) {
      setError(errorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchScheduleTrips()
      .then((data) => {
        if (!cancelled) {
          setTrips(data);
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (!cancelled) setError(errorMessage(loadError));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const weekDays = useMemo(
    () =>
      activeWeekStart && today
        ? buildWeekDays(activeWeekStart, trips, today)
        : [],
    [activeWeekStart, today, trips]
  );
  const selectedDay =
    weekDays.find((day) => day.dateKey === activeDate) ??
    weekDays[0] ??
    EMPTY_DAY;

  const goToPreviousWeek = useCallback(() => {
    if (!activeWeekStart || !activeDate) return;

    setWeekStart(addDays(activeWeekStart, -7));
    setSelectedDate(addDays(activeDate, -7));
    setActionError(null);
  }, [activeDate, activeWeekStart]);

  const goToNextWeek = useCallback(() => {
    if (!activeWeekStart || !activeDate) return;

    setWeekStart(addDays(activeWeekStart, 7));
    setSelectedDate(addDays(activeDate, 7));
    setActionError(null);
  }, [activeDate, activeWeekStart]);

  const goToDate = useCallback((dateKey: string) => {
    if (!dateKey) return;

    setSelectedDate(dateKey);
    setWeekStart(startOfWeek(dateKey));
    setActionError(null);
  }, []);

  const clearActionError = useCallback(() => setActionError(null), []);

  const runAction = useCallback(
    async (tripId: string, action: () => Promise<void>) => {
      setPendingTripId(tripId);
      setActionError(null);

      try {
        await action();
        return true;
      } catch (actionFailure) {
        setActionError(errorMessage(actionFailure));
        return false;
      } finally {
        setPendingTripId(null);
      }
    },
    []
  );

  const acceptTrip = useCallback(
    (trip: Trip) =>
      runAction(trip.id, async () => {
        const result = await acceptScheduleTrip(trip.id);

        setTrips((current) =>
          current.map((item) =>
            item.id === trip.id
              ? {
                  ...item,
                  assignmentStatus:
                    result.assignmentStatus ?? "ACCEPTED",
                  tripStatus: result.trip?.status ?? item.tripStatus,
                }
              : item
          )
        );
      }),
    [runAction]
  );

  const rejectTrip = useCallback(
    (trip: Trip, reason: string) =>
      runAction(trip.id, async () => {
        const result = await rejectScheduleTrip(trip.id, reason);

        setTrips((current) =>
          current.map((item) =>
            item.id === trip.id
              ? {
                  ...item,
                  assignmentStatus:
                    result.assignmentStatus ?? "REJECTED",
                  tripStatus: result.trip?.status ?? "CANCELLED",
                }
              : item
          )
        );
      }),
    [runAction]
  );

  const setAssignmentStatus = useCallback(
    (trip: Trip, status: "PREPARING" | "ARRIVED") =>
      runAction(trip.id, async () => {
        const result = await updateScheduleAssignmentStatus(trip.id, status);

        setTrips((current) =>
          current.map((item) =>
            item.id === trip.id
              ? {
                  ...item,
                  assignmentStatus:
                    result.assignmentStatus ?? status,
                }
              : item
          )
        );
      }),
    [runAction]
  );

  const setTripStatus = useCallback(
    (trip: Trip, status: "IN_PROGRESS" | "COMPLETED") =>
      runAction(trip.id, async () => {
        const result = await updateScheduleTripStatus(trip.id, status);

        setTrips((current) =>
          current.map((item) =>
            item.id === trip.id
              ? {
                  ...item,
                  tripStatus: result.trip?.status ?? status,
                }
              : item
          )
        );
      }),
    [runAction]
  );

  return {
    trips,
    loading,
    error,
    actionError,
    pendingTripId,
    today,
    weekDays,
    selectedDay,
    selectedDate: activeDate ?? "",
    weekStart: activeWeekStart ?? "",
    weekLabel: activeWeekStart ? relativeWeekLabel(activeWeekStart) : "",
    weekRange: activeWeekStart ? formatWeekRange(activeWeekStart) : "",
    reload,
    goToPreviousWeek,
    goToNextWeek,
    goToDate,
    clearActionError,
    acceptTrip,
    rejectTrip,
    setAssignmentStatus,
    setTripStatus,
  };
}
