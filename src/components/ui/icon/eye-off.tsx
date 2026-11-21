import type { SVGProps } from "react";

export function EyeOffIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `icon-sym ${className}` : "icon-sym"}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 12s3-5.2 7.4-5.6c1.3-.1 2.5.2 3.5.7" />
      <path d="M20 12s-1.2 2-3.2 3.5" />
    </svg>
  );
}