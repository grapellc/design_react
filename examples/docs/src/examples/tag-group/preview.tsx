"use client";

import { IconLocationpinFill } from "@karrotmarket/react-monochrome-icon";
import { TagGroupRoot, TagGroupItem } from "seed-design/ui/tag-group";

export default function TagGroupPreview() {
  return (
    <TagGroupRoot>
      <TagGroupItem prefixIcon={<IconLocationpinFill />} label="500m" />
      <TagGroupItem label="District 4" />
      <TagGroupItem label="3 min ago" />
    </TagGroupRoot>
  );
}
