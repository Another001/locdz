import type { SVGProps } from "react";

export function AlertIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `icon-sym ${className}` : "icon-sym"}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 4 21 19.5H3L12 4Z" />
      <path d="M12 10v4.2M12 16.8h.01" />
    </svg>
  );
}