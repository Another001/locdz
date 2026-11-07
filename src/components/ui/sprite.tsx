export type IconName =
  | "calendar"
  | "user"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "chevron-down"
  | "menu"
  | "close"
  | "car";

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
      </defs>
    </svg>
  );
}
