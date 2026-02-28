"use client";

import { AppBar, AppScreen } from "@grape-design/stackflow";
import { ActivityComponentType } from "@stackflow/react/future";
import { VStack, PullToRefresh, Box } from "@grape-design/react";
import {
  PullToRefreshContent,
  PullToRefreshIndicator,
  PullToRefreshRoot,
} from "grape-design/ui/pull-to-refresh";

declare module "@stackflow/config" {
  interface Register {
    "react/pull-to-refresh/prevent-pull": {};
  }
}

const PullToRefreshPreventPull: ActivityComponentType<
  "react/pull-to-refresh/prevent-pull"
> = () => {
  // AppScreen is imported from @grape-design/stackflow instead of snippet for demo purpose.
  // AppScreen snippet is integrating PullToRefresh, so it's not necessary to use it here.
  return (
    <AppScreen.Root>
      <AppBar.Root divider>
        <AppBar.Main>
          <AppBar.Title>Pull To Refresh</AppBar.Title>
        </AppBar.Main>
      </AppBar.Root>
      <PullToRefreshRoot
        asChild
        onPtrReady={() => {}}
        onPtrRefresh={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      >
        <AppScreen.Layer>
          <PullToRefreshIndicator />
          <PullToRefreshContent asChild>
            <VStack px="spacingX.globalGutter" gap="x4">
              <Box p="x4" bg="bg.neutralWeak" color="fg.neutral" borderRadius="r2">
                This area can be pulled to refresh. Amet in laborum proident fugiat mollit quis
                aute mollit esse nostrud. Excepteur ea proident ipsum duis. Nulla Lorem pariatur
                exercitation velit anim.
              </Box>
              <Box
                p="x4"
                bg="bg.criticalWeak"
                color="fg.criticalContrast"
                borderRadius="r2"
                {...PullToRefresh.preventPull}
              >
                This area cannot be pulled to refresh. Aliquip ad amet eu dolore id enim
                excepteur laboris officia anim in. Irure irure nulla sit eiusmod aliqua sint
                excepteur amet laboris.
              </Box>
              <Box p="x4" bg="bg.neutralWeak" color="fg.neutral" borderRadius="r2">
                This area can be pulled to refresh. Amet in laborum proident fugiat mollit quis
                aute mollit esse nostrud. Excepteur ea proident ipsum duis. Nulla Lorem pariatur
                exercitation velit anim.
              </Box>
              <Box
                p="x4"
                bg="bg.criticalWeak"
                color="fg.criticalContrast"
                borderRadius="r2"
                {...PullToRefresh.preventPull}
              >
                This area cannot be pulled to refresh. Aliquip ad amet eu dolore id enim
                excepteur laboris officia anim in. Irure irure nulla sit eiusmod aliqua sint
                excepteur amet laboris.
              </Box>
            </VStack>
          </PullToRefreshContent>
        </AppScreen.Layer>
      </PullToRefreshRoot>
    </AppScreen.Root>
  );
};

export default PullToRefreshPreventPull;
