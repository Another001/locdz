export type IconName =
  | "calendar"
  | "user"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "check-circle"
  | "chevron-down"
  | "menu"
  | "close"
  | "car"
  | "wallet"
  | "pin"
  | "map"
  | "copy"
  | "alert";

export function Sprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <symbol id="i-calendar" viewBox="0 0 24 24" className="icon-sym">
          <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
          <path d="M8 3v4M16 3v4M3.5 10h17" />
        </symbol>

        <symbol id="i-user" viewBox="0 0 24 24" className="icon-sym">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20c.8-3.4 3.6-5.4 7-5.4s6.2 2 7 5.4" />
        </symbol>

        <symbol id="i-arrow-right" viewBox="0 0 24 24" className="icon-sym">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </symbol>

        <symbol
          id="i-arrow-up-right"
          viewBox="0 0 24 24"
          className="icon-sym"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </symbol>

        <symbol id="i-check" viewBox="0 0 24 24" className="icon-sym">
          <path d="m5 12.5 4.2 4.2L19 7.5" />
        </symbol>

        <symbol
          id="i-chevron-down"
          viewBox="0 0 24 24"
          className="icon-sym"
        >
          <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
        </symbol>

        <symbol id="i-menu" viewBox="0 0 24 24" className="icon-sym">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </symbol>

        <symbol id="i-close" viewBox="0 0 24 24" className="icon-sym">
          <path d="m6 6 12 12M18 6 6 18" />
        </symbol>

        <symbol id="i-car" viewBox="0 0 24 24" className="icon-sym">
          <path d="M4.5 16.5h15l-1.6-5.2a2.3 2.3 0 0 0-2.2-1.7H8.3a2.3 2.3 0 0 0-2.2 1.7L4.5 16.5Z" />
          <path d="M4.5 16.5v2.3M19.5 16.5v2.3" />
          <circle cx="7.6" cy="16.5" r="1.1" />
          <circle cx="16.4" cy="16.5" r="1.1" />
          <path d="M8.2 10.2 8.9 7.9h6.2l.7 2.3" />
        </symbol>

        <symbol id="i-check-circle" viewBox="0 0 24 24" className="icon-sym">
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.5 12.2 2.4 2.4 4.8-5" />
        </symbol>

        <symbol id="i-wallet" viewBox="0 0 24 24" className="icon-sym">
          <path d="M4 8.2A2.7 2.7 0 0 1 6.7 5.5H18a2.8 2.8 0 0 1 2.8 2.8v8.9A2.8 2.8 0 0 1 18 20H6.8A2.8 2.8 0 0 1 4 17.2V8.2Z" />
          <path d="M4 9.5h16.8" />
          <path d="M16.5 14.5h2" />
        </symbol>

        <symbol id="i-pin" viewBox="0 0 24 24" className="icon-sym">
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </symbol>

        <symbol id="i-map" viewBox="0 0 24 24" className="icon-sym">
          <path d="m9 4.5-5.5 2v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2Z" />
          <path d="M9 4.5v13M15 6.5v13" />
        </symbol>

        <symbol id="i-copy" viewBox="0 0 24 24" className="icon-sym">
          <rect x="9" y="9" width="11" height="11" rx="2.5" />
          <path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5" />
        </symbol>

        <symbol id="i-alert" viewBox="0 0 24 24" className="icon-sym">
          <path d="M12 4 21 19.5H3L12 4Z" />
          <path d="M12 10v4.2M12 16.8h.01" />
        </symbol>
      </defs>
    </svg>
  );
}
