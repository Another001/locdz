export const TRIPS_PATH = "/me/driver/trips";

export function tripPath(tripId: string, suffix?: string): string {
  const base = `${TRIPS_PATH}/${encodeURIComponent(tripId)}`;

  return suffix ? `${base}/${suffix}` : base;
}
