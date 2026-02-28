"use client";

import * as Icons from "@grape-design/icons/react-icon";

/**
 * Renders an icon by name from the Grape icon set (same pattern as seed-design migration).
 * Usage: <GrapeIcon name="IconCheckmarkFill" /> or <GrapeIcon name="IconBellLine" />
 */
export function GrapeIcon({
  name,
  size = 20,
}: {
  name: keyof typeof Icons;
  size?: number;
}) {
  const Icon = Icons[name];

  if (!Icon || typeof Icon !== "function") {
    return <code>{name}</code>;
  }

  return (
    <div className="flex items-center gap-2">
      <Icon size={size} />
      <code>{name}</code>
    </div>
  );
}

/**
 * Same pattern as seed-design: import * as Icons from "@grape-design/icons/react-icon";
 * Then use <Icons.IconCheckmarkFill size={20} /> or Icons[name] for dynamic lookup.
 */
