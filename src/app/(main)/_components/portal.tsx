"use client";

import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";

interface PortalProps {
  children: React.ReactNode;
}

const subscribe = () => () => {};

export default function Portal({ children }: PortalProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) return null;

  return createPortal(children, document.body);
}
