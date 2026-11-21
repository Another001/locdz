import type { SVGProps } from "react";

export function LogoutIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `icon-sym ${className}` : "icon-sym"}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h7" />
      <path d="M10.5 12H20" />
      <path d="m16.5 8.5 3.5 3.5-3.5 3.5" />
    </svg>
  );
}