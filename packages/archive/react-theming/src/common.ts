export const ColorModeValues = Object.freeze(["auto", "light-only", "dark-only"] as const);
export const DefaultColorModeValue = ColorModeValues[0];
export type ColorMode = (typeof ColorModeValues)[number];

export const StorageKey = {
  COLOR: "@grape_design_react/scale-color",
  PLATFORM: "@grape_design_react/platform",
} as const;
