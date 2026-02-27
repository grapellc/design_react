/**
 * Converts IconName (e.g. IconBellFill) to grape_design_dart asset filename (e.g. bell_fill).
 */
export function iconNameToFilename(iconName: string): string {
  const withoutIcon = iconName.replace(/^Icon/, "");
  return withoutIcon
    .replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`)
    .replace(/^_/, "");
}
