"use client";

import { createContext, type ReactNode } from "react";

/**
 * When true, AppScreen/AppBar render without Stackflow (for showcase preview without a stack).
 */
export const StandalonePreviewContext = createContext(false);

export function StandalonePreviewProvider({ children }: { children: ReactNode }) {
  return (
    <StandalonePreviewContext.Provider value={true}>
      {children}
    </StandalonePreviewContext.Provider>
  );
}
