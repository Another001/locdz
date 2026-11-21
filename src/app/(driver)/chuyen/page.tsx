"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import {
  acceptTripAPI,
  getTripAPI,
  reportIncidentAPI,
  updateAssignmentStatusAPI,
  updateTripStatusAPI,
} from "@/api/driver/trips/api";
import { normalizeTripDetail } from "@/lib/driver/trips";
import type { TripDetail } from "@/types";

import { AssignmentPanel } from "./_components/assignment-panel";
import { IncidentModal } from "./_components/incident-modal";
import { TripInfoPanel } from "./_components/trip-info-panel";
import { TripPassengersPanel } from "./_components/trip-passengers-panel";
import { TripSummary } from "./_components/trip-summary";
import { TripTimelinePanel } from "./_components/trip-timeline-panel";
import { useRouter } from "next/navigation";

const STATUS_BADGE =
  "inline-flex flex-none items-center rounded-full bg-sky-100 px-2.5 py-[5px] text-[11px] font-bold tracking-[0.02em] whitespace-nowrap text-sky-800";
const PRIMARY =
  "inline-flex h-[52px] w-full items-center justify-center gap-[9px] rounded-[13px] bg-sky-700 px-[26px] text-[15px] font-bold leading-none text-white shadow-[0_10px_24px_-14px_rgba(3,105,161,0.9)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-sky-800 hover:shadow-[0_16px_30px_-14px_rgba(3,105,161,0.95)] active:translate-y-0 disabled:cursor-not-allowed min-[641px]:w-auto";
const GHOST =
  "inline-flex h-12 grow items-center justify-center gap-[9px] rounded-xl border border-line bg-white px-[22px] text-[14.5px] font-bold leading-none text-ink transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 min-[641px]:grow-0";

function messageOf(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export default function TripDetailPage() {
  return (
    <Suspense
      fallback={
        <main id="main" className="p-6">
          <div className="text-center text-slate-600">
            Đang tải chi tiết chuyến…
          </div>
        </main>
      }
    >
      <TripDetailContent />
    </Suspense>
  );
}

function TripDetailContent() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId") || "";

  const [tripData, setTripData] = useState<TripDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [mutating, setMutating] = useState<Set<string>>(new Set());
  const router = useRouter()

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
      const data = await getTripAPI(tripId);
      setTripData(normalizeTripDetail(data));
    } catch (err: unknown) {
      setError(messageOf(err, "Không tải được chi tiết chuyến."));
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    if (!tripId) return;

    let cancelled = false;

    getTripAPI(tripId)
      .then((data) => {
        if (!cancelled) {
          setTripData(normalizeTripDetail(data));
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(messageOf(loadError, "Không tải được chi tiết chuyến."));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tripId]);

  const startMutating = useCallback((action: string) => {
    setMutating((prev) => new Set([...prev, action]));
  }, []);

  const stopMutating = useCallback((action: string) => {
    setMutating((prev) => {
      const next = new Set(prev);
      next.delete(action);
      return next;
    });
  }, []);

  const handleAccept = async () => {
    if (!tripId) return;
    startMutating("accept");
    try {
      await acceptTripAPI(tripId);
      await loadTrip();
    } catch (err: unknown) {
      alert(messageOf(err, "Không nhận được chuyến."));
    } finally {
      stopMutating("accept");
    }
  };

  const handleAssignmentStatus = async (
    status: "PREPARING" | "ARRIVED"
  ) => {
    if (!tripId) return;
    const action = status === "PREPARING" ? "preparing" : "arrived";
    startMutating(action);
    try {
      await updateAssignmentStatusAPI(tripId, status);
      await loadTrip();
    } catch (err: unknown) {
      alert(
        messageOf(
          err,
          status === "PREPARING"
            ? "Không cập nhật được trạng thái chuẩn bị."
            : "Không xác nhận được đã tới."
        )
      );
    } finally {
      stopMutating(action);
    }
  };

  const handleStartTrip = async () => {
    if (!tripId) return;
    startMutating("start");
    // console.log("try tryt")
    try {
      await updateTripStatusAPI(tripId, "IN_PROGRESS");
      await loadTrip();
      // console.log("done try")
      router.push(`/dieu-hanh?tripId=${tripId}`)
    } catch (err: unknown) {
      alert(messageOf(err, "Không bắt đầu được chuyến."));
    } finally {
      stopMutating("start");
    }
  };

  const handleOpenOperate = () => {
    if (!tripId) return;
    router.push(`/dieu-hanh?tripId=${tripId}`);
  };

  const handleIncidentSubmit = async (
    type: string,
    description: string
  ) => {
    if (!tripId) return;
    startMutating("incident");
    try {
      await reportIncidentAPI(tripId, type, description);
      setIncidentOpen(false);
      await loadTrip();
    } catch (err: unknown) {
      alert(messageOf(err, "Không gửi được báo cáo sự cố."));
    } finally {
      stopMutating("incident");
    }
  };

  if (!tripId) {
    return (
      <main id="main" className="p-6">
        <div className="text-center text-red-600">Thiếu mã chuyến.</div>
      </main>
    );
  }

  if (loading) {
    return (
      <main id="main" className="p-6">
        <div className="text-center text-slate-600">Đang tải chi tiết chuyến…</div>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main" className="p-6">
        <div className="text-center text-red-600">{error}</div>
      </main>
    );
  }

  if (!tripData) {
    return (
      <main id="main" className="p-6">
        <div className="text-center text-slate-600">Không có dữ liệu chuyến.</div>
      </main>
    );
  }

  const canStart =
    tripData.tripStatus === "SCHEDULED" &&
    ["ACCEPTED", "PREPARING", "ARRIVED"].includes(tripData.assignmentStatus);

  const canOpenOperate =
    tripData.tripStatus === "IN_PROGRESS" ||
    tripData.tripStatus === "COMPLETED";

  return (
    <main id="main">
      <div className="pb-[clamp(56px,6vw,88px)] pt-[clamp(32px,4vw,56px)]">
        <div className="mx-auto w-full max-w-[1240px] px-4 min-[769px]:px-5">
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-5">
            <div>
              <span className="inline-flex items-center gap-[9px] text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-[22px] rounded bg-sky-500"
                />
                Chuyến {tripData.code}
              </span>
              <h1 className="mt-2.5 text-balance font-heading text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-ink">
                {tripData.when}
              </h1>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate-600">
                {tripData.route}
              </p>
            </div>

            <span className={STATUS_BADGE}>{tripData.statusLabel}</span>
          </header>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {canStart ? (
              <button
                type="button"
                onClick={handleStartTrip}
                disabled={isMutating("start")}
                aria-describedby="tcdLenhHint"
                className={PRIMARY}
              >
                {isMutating("start") ? "Đang khởi hành..." : "Bắt đầu chuyến"}
                <Icon name="arrow-right" className="h-[18px] w-[18px]" />
              </button>
            ) : null}

            {canOpenOperate ? (
              <button
                type="button"
                onClick={handleOpenOperate}
                className={PRIMARY}
              >
                Vào điều hành
                <Icon name="arrow-right" className="h-[18px] w-[18px]" />
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => setIncidentOpen(true)}
              aria-haspopup="dialog"
              aria-controls="tcdIncidentModal"
              className={GHOST}
            >
              <Icon name="alert" className="h-[18px] w-[18px]" />
              Báo sự cố
            </button>
          </div>

          <div className="mt-[clamp(22px,3vw,30px)] grid grid-cols-1 items-start gap-[clamp(20px,3vw,32px)] min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,260px)] min-[1025px]:grid-cols-[minmax(0,1fr)_minmax(0,300px)]">
            <div className="grid gap-[clamp(18px,2.4vw,24px)]">
              <AssignmentPanel
                assignment={tripData.assignment}
                assignmentStatus={tripData.assignmentStatus}
                onAccept={handleAccept}
                onPreparing={() => void handleAssignmentStatus("PREPARING")}
                onArrived={() => void handleAssignmentStatus("ARRIVED")}
                isAccepting={isMutating("accept")}
                isPreparing={isMutating("preparing")}
                isArrived={isMutating("arrived")}
              />
              <TripInfoPanel
                departTime={tripData.departTime}
                routePoints={tripData.routePoints}
                stats={tripData.stats}
                vehicle={tripData.vehicle}
              />
              <TripTimelinePanel stops={tripData.stops} />
              <TripPassengersPanel
                passengers={tripData.passengers}
                totalSeats={tripData.totalSeats}
              />
            </div>

            <aside className="order-first grid gap-[clamp(18px,2.4vw,24px)] min-[901px]:order-none min-[901px]:sticky min-[901px]:top-[94px]">
              <TripSummary summary={tripData.summary} />
            </aside>
          </div>
        </div>
      </div>

      <IncidentModal
        open={incidentOpen}
        onOpenChange={setIncidentOpen}
        onSubmit={handleIncidentSubmit}
        isSubmitting={isMutating("incident")}
      />
    </main>
  );
}
