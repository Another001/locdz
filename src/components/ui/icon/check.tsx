import type { SVGProps } from "react";

export function CheckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `icon-sym ${className}` : "icon-sym"}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m5 12.5 4.2 4.2L19 7.5" />
    </svg>
  );
}