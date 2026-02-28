"use client";

import { VStack } from "@grape-design/react";
import { TagGroupRoot, TagGroupItem } from "grape-design/ui/tag-group";

export default function TagGroupSizes() {
  return (
    <VStack gap="spacingY.componentDefault" align="center">
      <TagGroupRoot size="t2">
        <TagGroupItem label="t2" />
        <TagGroupItem label="t2" />
        <TagGroupItem label="t2" />
      </TagGroupRoot>
      <TagGroupRoot size="t3">
        <TagGroupItem label="t3" />
        <TagGroupItem label="t3" />
        <TagGroupItem label="t3" />
      </TagGroupRoot>
      <TagGroupRoot size="t4">
        <TagGroupItem label="t4" />
        <TagGroupItem label="t4" />
        <TagGroupItem label="t4" />
      </TagGroupRoot>
    </VStack>
  );
}
