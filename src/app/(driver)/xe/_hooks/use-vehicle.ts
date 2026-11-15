"use client";

import { useCallback, useEffect, useState } from "react";

import type { Vehicle, VehicleDocument, VehicleTrip } from "@/types";
import type {
  DriverVehicleDocument,
  DriverVehicleRecentTrip,
  DriverVehicleResponse,
} from "@/types/driver";

import {
  fetchDriverVehicle,
  fetchDriverVehicleDocuments,
  fetchDriverVehicleRecentTrips,
} from "@/lib/api/driver-profile";
import {
  normalizeVehicle,
  normalizeVehicleDocuments,
  normalizeVehicleRecentTrips,
} from "@/lib/api/driver-vehicle-normalize";

export interface UseVehicleResult {
  vehicle: Vehicle | null;
  documents: VehicleDocument[];
  documentsUpdatedAt: string;
  trips: VehicleTrip[];
  adminNote: string;
  tipNote: string;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useVehicle(): UseVehicleResult {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [documents, setDocuments] = useState<VehicleDocument[]>([]);
  const [documentsUpdatedAt, setDocumentsUpdatedAt] = useState("");
  const [trips, setTrips] = useState<VehicleTrip[]>([]);
  const [adminNote, setAdminNote] = useState(
    "Xe do admin gán. Mọi thay đổi về xe vui lòng liên hệ admin — tài xế không tự đổi xe."
  );
  const [tipNote, setTipNote] = useState(
    "Trước mỗi chuyến, kiểm tra lốp, đèn và nhiên liệu. Nếu phát hiện sự cố, mở chi tiết chuyến và bấm “Báo sự cố” để admin hỗ trợ."
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchDriverVehicle().then((data: DriverVehicleResponse) => {
          setVehicle(normalizeVehicle(data));
        }),
        fetchDriverVehicleDocuments().then((data: DriverVehicleDocument[]) => {
          setDocuments(normalizeVehicleDocuments(data));
          setDocumentsUpdatedAt(
            new Date().toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          );
        }),
        fetchDriverVehicleRecentTrips().then(
          (data: DriverVehicleRecentTrip[]) => {
            setTrips(normalizeVehicleRecentTrips(data));
          }
        ),
      ]);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Không tải được thông tin xe."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    vehicle,
    documents,
    documentsUpdatedAt,
    trips,
    adminNote,
    tipNote,
    loading,
    error,
    reload,
  };
}