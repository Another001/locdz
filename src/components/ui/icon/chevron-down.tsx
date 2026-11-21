import type { SVGProps } from "react";

export function ChevronDownIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `icon-sym ${className}` : "icon-sym"}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
    </svg>
  );
}