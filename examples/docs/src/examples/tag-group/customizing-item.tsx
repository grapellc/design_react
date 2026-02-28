"use client";

import {
  IconCheckmarkCircleFill,
  IconHeartFill,
  IconHorizline2VerticalChatbubbleRectangularRightFill,
  IconStarFill,
} from "@karrotmarket/react-monochrome-icon";
import { Icon, VStack } from "@seed-design/react";
import { TagGroupRoot, TagGroupItem } from "seed-design/ui/tag-group";
import { TagGroup as SeedTagGroup } from "@seed-design/react";

export default function TagGroupCustomizingItem() {
  return (
    <VStack gap="spacingY.componentDefault" align="center">
      <TagGroupRoot>
        {/* You can use the compound components to customize the items */}
        <SeedTagGroup.Item weight="bold" tone="neutral" aria-label="Rating 4.5">
          <Icon svg={<IconStarFill />} color="fg.brand" />
          <SeedTagGroup.ItemLabel>4.5</SeedTagGroup.ItemLabel>
        </SeedTagGroup.Item>
        <TagGroupItem label="37 reviews" />
        <TagGroupItem label="12 regulars" />
      </TagGroupRoot>
      <TagGroupRoot tone="neutral">
        <TagGroupItem tone="brand" suffixIcon={<IconCheckmarkCircleFill />} label="Verified" />
        <TagGroupItem aria-label="10 likes" prefixIcon={<IconHeartFill />} label="10" />
        <TagGroupItem
          aria-label="3 comments"
          prefixIcon={<IconHorizline2VerticalChatbubbleRectangularRightFill />}
          label="3"
        />
      </TagGroupRoot>
    </VStack>
  );
}
