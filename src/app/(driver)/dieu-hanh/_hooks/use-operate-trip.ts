"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import type { OperateTrip } from "@/types";
import {
  collectPassengerPayment,
  fetchTripDetail,
  reportIncident,
  updatePassengerStatus,
  updateScheduleTripStatus,
} from "@/lib/api/driver-trips";
import { normalizeOperateTrip } from "@/lib/api/operate-normalize";

const subscribeToClock = (onChange: () => void) => {
  const timer = setInterval(onChange, 60_000);

  return () => clearInterval(timer);
};

const getServerToday = () => "";

const todayKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Không kết nối được máy chủ. Vui lòng thử lại.";
}

interface UseOperateTripProps {
  tripId: string;
}

export function useOperateTrip({ tripId }: UseOperateTripProps) {
  const [trip, setTrip] = useState<OperateTrip | null>(null);
  const [loading, setLoading] = useState(Boolean(tripId));
  const [error, setError] = useState<string | null>(
    tripId ? null : "Thiếu mã chuyến."
  );
  const [mutating, setMutating] = useState<Set<string>>(new Set());
  const today = useSyncExternalStore(subscribeToClock, todayKey, getServerToday);

  const isMutating = useCallback(
    (action: string) => mutating.has(action),
    [mutating]
  );

  const loadTrip = useCallback(async () => {
    if (!tripId) {
      setError("Thiếu mã chuyến.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTripDetail(tripId);
      setTrip(normalizeOperateTrip(data));
    } catch (err: unknown) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (!tripId) return;

    let cancelled = false;

    fetchTripDetail(tripId)
      .then((data) => {
        if (!cancelled) {
          setTrip(normalizeOperateTrip(data));
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
  }, [tripId]);

  const runAction = useCallback(
    async (action: string, fn: () => Promise<void>) => {
      setMutating((prev) => new Set([...prev, action]));
      try {
        await fn();
      } finally {
        setMutating((prev) => {
          const next = new Set(prev);
          next.delete(action);
          return next;
        });
      }
    },
    []
  );

  const startTrip = useCallback(async () => {
    await runAction("start", async () => {
      await updateScheduleTripStatus(tripId, "IN_PROGRESS");
    });
    await loadTrip();
  }, [tripId, runAction, loadTrip]);

  const completeTrip = useCallback(async () => {
    await runAction("complete", async () => {
      await updateScheduleTripStatus(tripId, "COMPLETED");
    });
    await loadTrip();
  }, [tripId, runAction, loadTrip]);

  const pickUpPassenger = useCallback(
    async (ticketId: string) => {
      await runAction(`pickup-${ticketId}`, async () => {
        await updatePassengerStatus(tripId, ticketId, "PICKED_UP");
      });
      await loadTrip();
    },
    [tripId, runAction, loadTrip]
  );

  const dropOffPassenger = useCallback(
    async (ticketId: string) => {
      await runAction(`dropoff-${ticketId}`, async () => {
        await updatePassengerStatus(tripId, ticketId, "DROPPED_OFF");
      });
      await loadTrip();
    },
    [tripId, runAction, loadTrip]
  );

  const collectPayment = useCallback(
    async (ticketId: string, collectedAmount: number) => {
      await runAction(`payment-${ticketId}`, async () => {
        await collectPassengerPayment(tripId, ticketId, collectedAmount);
      });
      await loadTrip();
    },
    [tripId, runAction, loadTrip]
  );

  const submitIncident = useCallback(
    async (type: string, description: string) => {
      await runAction("incident", async () => {
        await reportIncident(tripId, type, description);
      });
    },
    [tripId, runAction]
  );

  return {
    trip,
    loading,
    error,
    today,
    isMutating,
    reload: loadTrip,
    startTrip,
    completeTrip,
    pickUpPassenger,
    dropOffPassenger,
    collectPayment,
    submitIncident,
  };
}
