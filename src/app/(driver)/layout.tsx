import type { ReactNode } from "react";

import { DriverHeader } from "./_components/driver-header";

export default function DriverLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DriverHeader />
      {children}
    </>
  );
}
