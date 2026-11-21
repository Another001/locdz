import type { SVGProps } from "react";

export function WalletIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ? `icon-sym ${className}` : "icon-sym"}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 8.2A2.7 2.7 0 0 1 6.7 5.5H18a2.8 2.8 0 0 1 2.8 2.8v8.9A2.8 2.8 0 0 1 18 20H6.8A2.8 2.8 0 0 1 4 17.2V8.2Z" />
      <path d="M4 9.5h16.8" />
      <path d="M16.5 14.5h2" />
    </svg>
  );
}