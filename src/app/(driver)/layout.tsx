import type { ReactNode } from "react";

import { RequireSession } from "@/components/auth/require-session";

import { DriverHeader } from "../(main)/_components/driver-header";

export default function DriverLayout({ children }: { children: ReactNode }) {
  return (
    <RequireSession>
      <DriverHeader />
      {children}
    </RequireSession>
  );
}
