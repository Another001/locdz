"use client";

import { useCallback, useEffect, useState } from "react";

import type { Vehicle, VehicleDocument, VehicleTrip } from "@/types";
import {
  getVehicleAPI,
  listVehicleDocumentsAPI,
  listVehicleRecentTripsAPI,
} from "@/api/driver/vehicle/api";
import {
  normalizeVehicle,
  normalizeVehicleDocuments,
  normalizeVehicleRecentTrips,
} from "@/lib/driver/vehicle";

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

const ADMIN_NOTE =
  "Xe do admin gán. Mọi thay đổi về xe vui lòng liên hệ admin — tài xế không tự đổi xe.";
const TIP_NOTE =
  "Trước mỗi chuyến, kiểm tra lốp, đèn và nhiên liệu. Nếu phát hiện sự cố, mở chi tiết chuyến và bấm “Báo sự cố” để admin hỗ trợ.";

async function loadVehicleData() {
  const [vehicleData, documentsData, tripsData] = await Promise.all([
    getVehicleAPI(),
    listVehicleDocumentsAPI(),
    listVehicleRecentTripsAPI(),
  ]);

  return {
    vehicle: normalizeVehicle(vehicleData),
    documents: normalizeVehicleDocuments(documentsData),
    documentsUpdatedAt: new Date().toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    trips: normalizeVehicleRecentTrips(tripsData),
  };
}

export function useVehicle(): UseVehicleResult {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [documents, setDocuments] = useState<VehicleDocument[]>([]);
  const [documentsUpdatedAt, setDocumentsUpdatedAt] = useState("");
  const [trips, setTrips] = useState<VehicleTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loadVehicleData();

      setVehicle(data.vehicle);
      setDocuments(data.documents);
      setDocumentsUpdatedAt(data.documentsUpdatedAt);
      setTrips(data.trips);
    } catch (loadError: unknown) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Không tải được thông tin xe."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadVehicleData()
      .then((data) => {
        if (!cancelled) {
          setVehicle(data.vehicle);
          setDocuments(data.documents);
          setDocumentsUpdatedAt(data.documentsUpdatedAt);
          setTrips(data.trips);
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Không tải được thông tin xe."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    vehicle,
    documents,
    documentsUpdatedAt,
    trips,
    adminNote: ADMIN_NOTE,
    tipNote: TIP_NOTE,
    loading,
    error,
    reload,
  };
}
