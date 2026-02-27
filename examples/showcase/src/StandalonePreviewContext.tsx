import { createContext } from "react";

/**
 * When true, AppScreen/AppBar render without Stackflow (for showcase preview without a stack).
 */
export const StandalonePreviewContext = createContext(false);
