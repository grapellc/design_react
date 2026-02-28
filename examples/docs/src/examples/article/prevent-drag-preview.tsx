"use client";

import { VStack, Icon, Text, Article, Divider, Tabs } from "@seed-design/react";
import { TabsCarousel, TabsContent, TabsList, TabsRoot, TabsTrigger } from "seed-design/ui/tabs";
import { IconExclamationmarkCircleFill } from "@karrotmarket/react-monochrome-icon";
import { PageBanner } from "seed-design/ui/page-banner";

export default function ArticlePreventDragPreview() {
  return (
    <div className="min-h-[320px] w-full overflow-auto rounded-lg border border-fd-border bg-[var(--seed-color-bg-layer-default)]">
      <TabsRoot defaultValue="1" contentLayout="fill">
        <TabsList>
          <TabsTrigger value="1">Tab 1</TabsTrigger>
          <TabsTrigger value="2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsCarousel swipeable>
          <TabsContent value="1">
            <VStack gap="x8" style={{ userSelect: "none" }}>
              <PageBanner
                prefixIcon={<Icon svg={<IconExclamationmarkCircleFill />} />}
                description="Parent has `user-select: none;` style applied"
                tone="warning"
                variant="solid"
              />
              <VStack asChild gap="spacingY.componentDefault" px="spacingX.globalGutter">
                <Article {...Tabs.carouselPreventDrag}>
                  <Text textStyle="t6Bold" as="h1">
                    Article
                  </Text>
                  <Text textStyle="articleBody" as="p">
                    This element is inside Article, so text selection is enabled. This Article is set so it
                    does not trigger Tabs gestures. Swiping left here will select text instead of
                    switching tabs.
                  </Text>
                </Article>
              </VStack>
              <Divider />
              <VStack gap="spacingY.componentDefault" px="spacingX.globalGutter">
                <Text textStyle="t6Bold" as="h1">
                  Outside Article
                </Text>
                <Text textStyle="articleBody" as="p">
                  This element is outside Article, so text selection is disabled. This element can trigger
                  tab swipe. Try swiping left here.
                </Text>
              </VStack>
            </VStack>
          </TabsContent>
          <TabsContent value="2">
            <VStack px="spacingX.globalGutter" py="x4">
              Hello!
            </VStack>
          </TabsContent>
        </TabsCarousel>
      </TabsRoot>
    </div>
  );
}
