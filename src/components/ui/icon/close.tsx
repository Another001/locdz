import type { SVGProps } from "react";

export function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `icon-sym ${className}` : "icon-sym"}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}