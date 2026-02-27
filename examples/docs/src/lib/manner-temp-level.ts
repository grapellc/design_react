export type MannerTempLevel = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9" | "l10";

const LEVELS: MannerTempLevel[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9", "l10"];

/**
 * Maps a numeric temperature (e.g. 0–100 or 0–10) to a MannerTemp level (l1–l10).
 */
export function mannerTempToLevel(temperature: number): MannerTempLevel {
  const clamped = Math.max(0, Math.min(100, temperature));
  const index = Math.min(Math.floor((clamped / 100) * LEVELS.length), LEVELS.length - 1);
  return LEVELS[index] ?? "l1";
}
