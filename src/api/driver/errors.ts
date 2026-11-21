import { ApiError } from "@/api/types";

export class DriverApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DriverApiError";
    this.status = status;
  }
}

function toDriverApiError(error: unknown): DriverApiError {
  if (error instanceof DriverApiError) return error;

  if (error instanceof ApiError) {
    return new DriverApiError(error.message, error.status ?? 0);
  }

  return new DriverApiError(
    "Không kết nối được máy chủ. Vui lòng thử lại.",
    0
  );
}

export async function runDriverRequest<T>(
  task: () => Promise<T>
): Promise<T> {
  try {
    return await task();
  } catch (error) {
    throw toDriverApiError(error);
  }
}
