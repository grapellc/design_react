"use client";

import {
  VStack,
  Icon,
  Text,
  Article,
  Divider,
  PullToRefresh,
} from "@grape-design/react";
import {
  PullToRefreshContent,
  PullToRefreshIndicator,
  PullToRefreshRoot,
} from "seed-design/ui/pull-to-refresh";
import { IconExclamationmarkCircleFill } from "@karrotmarket/react-monochrome-icon";
import { PageBanner } from "seed-design/ui/page-banner";

export default function ArticlePreventPullPreview() {
  return (
    <div className="min-h-[320px] w-full overflow-auto rounded-lg border border-fd-border bg-[var(--seed-color-bg-layer-default)]">
      <PullToRefreshRoot
        onPtrReady={() => {}}
        onPtrRefresh={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      >
        <PullToRefreshIndicator />
        <PullToRefreshContent asChild>
          <VStack gap="x8" style={{ userSelect: "none" }}>
            <PageBanner
              prefixIcon={<Icon svg={<IconExclamationmarkCircleFill />} />}
              description="Parent has `user-select: none;` style applied"
              tone="warning"
              variant="solid"
            />
            <VStack asChild gap="spacingY.componentDefault" px="spacingX.globalGutter">
              <Article {...PullToRefresh.preventPull}>
                <Text textStyle="t6Bold" as="h1">
                  Article
                </Text>
                <Text textStyle="articleBody" as="p">
                  This element is inside Article, so text selection is enabled. This Article is set so it
                  does not trigger PTR gestures. Pulling down here will select text instead of
                  triggering PTR.
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
                PTR. Try pulling down here.
              </Text>
            </VStack>
          </VStack>
        </PullToRefreshContent>
      </PullToRefreshRoot>
    </div>
  );
}
