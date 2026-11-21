const TIME_ZONE = "Asia/Ho_Chi_Minh";

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const localTimeFormatter = new Intl.DateTimeFormat("vi-VN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return phone;
  const head = digits.slice(0, 4);
  const tail = digits.slice(-3);
  return `${head} *** ${tail}`;
}

export function formatMoney(amount: number): string {
  return moneyFormatter.format(amount);
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null || !Number.isFinite(amount)) return "—";

  return currencyFormatter.format(amount);
}

export function formatTime(iso: string | undefined): string {
  if (!iso) return "--:--";
  try {
    return timeFormatter.format(new Date(iso));
  } catch {
    return "--:--";
  }
}

export function formatLocalTime(iso: string | undefined): string {
  if (!iso) return "--:--";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "--:--";

  return localTimeFormatter.format(date);
}

export function formatTripTime(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return localTimeFormatter.format(new Date(iso));
  } catch {
    return "—";
  }
}

export function formatWhen(iso: string | undefined): string {
  if (!iso) return "—";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "—";

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const dayLabel = isToday
    ? "Hôm nay"
    : date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });

  return `${dayLabel} · ${formatLocalTime(iso)}`;
}

export function formatDuration(minutes: number | null | undefined): string {
  if (minutes == null || !Number.isFinite(minutes) || minutes <= 0) return "—";

  const total = Math.round(minutes);
  const hours = Math.floor(total / 60);
  const mins = total % 60;

  if (hours > 0 && mins > 0) return `${hours} giờ ${mins} phút`;
  if (hours > 0) return `${hours} giờ`;

  return `${mins} phút`;
}

export function formatDistance(km: number | null | undefined): string {
  if (km == null || !Number.isFinite(km) || km < 0) return "—";

  return `${km.toLocaleString("vi-VN", { maximumFractionDigits: 1 })} km`;
}

export function formatInspection(iso: string | null | undefined): string {
  if (!iso) return "";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "";

  return `Đăng kiểm ${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}/${date.getFullYear()}`;
}

export function formatExpiryDate(isoDate: string | undefined): string {
  if (!isoDate) return "—";
  try {
    const d = new Date(isoDate);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `HSD ${month}/${year}`;
  } catch {
    return "—";
  }
}