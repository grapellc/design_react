"use client";

import { IconLocationpinFill, IconMegaphoneFill } from "@karrotmarket/react-monochrome-icon";
import { VStack } from "@grape-design/react";
import { TagGroupRoot, TagGroupItem } from "grape-design/ui/tag-group";

export default function TagGroupWithIcons() {
  return (
    <VStack gap="spacingY.componentDefault" align="center">
      <TagGroupRoot>
        <TagGroupItem label="Ad" suffixIcon={<IconMegaphoneFill />} />
        <TagGroupItem label="Bumped 3 hours ago" />
        <TagGroupItem label="District 4" />
      </TagGroupRoot>
      <TagGroupRoot>
        <TagGroupItem prefixIcon={<IconLocationpinFill />} label="District 4" />
        <TagGroupItem label="Verified 5" />
        <TagGroupItem label="3 min ago" />
      </TagGroupRoot>
    </VStack>
  );
}
