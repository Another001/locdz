import { authApi } from "@/api/method";
import type { DriverVehicleDocument } from "@/types/driver";

import { DriverApiError, runDriverRequest } from "../../errors";
import { VEHICLE_DOCUMENTS_PATH } from "./_shared";

export function listVehicleDocumentsAPI(): Promise<
  DriverVehicleDocument[]
> {
  return runDriverRequest(async () => {
    const data = await authApi.get<DriverVehicleDocument[]>(
      VEHICLE_DOCUMENTS_PATH
    );

    if (!Array.isArray(data)) {
      throw new DriverApiError("Không tìm thấy dữ liệu giấy tờ xe.", 400);
    }

    return data;
  });
}
