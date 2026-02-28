"use client";

import type { ActivityComponentType } from "@stackflow/react/future";
import type { RegisteredActivityName } from "@stackflow/config";
import * as React from "react";
import { StandalonePreviewContext } from "@/src/StandalonePreviewContext";
import { Stackflow } from "./stackflow/Stackflow";

const ACTIVITY_IMPORTS: Record<
  string,
  () => Promise<{ default: ActivityComponentType<RegisteredActivityName> }>
> = {
  "react/app-screen/preview": () => import("@/src/examples/app-screen/preview"),
  "react/app-screen/transparent": () => import("@/src/examples/app-screen/transparent"),
  "react/app-screen/with-intersection-observer": () =>
    import("@/src/examples/app-screen/with-intersection-observer"),
  "react/app-screen/app-bar-customization": () =>
    import("@/src/examples/app-screen/app-bar-customization"),
  "react/result-section/cta-progress-circle": () =>
    import("@/src/examples/result-section/cta-progress-circle"),
  "react/pull-to-refresh/preview": () => import("@/src/examples/pull-to-refresh/preview"),
  "react/pull-to-refresh/tabs": () => import("@/src/examples/pull-to-refresh/tabs"),
  "react/pull-to-refresh/prevent-pull": () => import("@/src/examples/pull-to-refresh/prevent-pull"),
  "react/chip-tabs/basic-activity": () => import("@/src/examples/chip-tabs/basic-activity"),
  "react/alert-dialog/activity": () => import("@/src/examples/alert-dialog/activity"),
  "react/alert-dialog/stackflow": () => import("@/src/examples/alert-dialog/stackflow"),
  "react/bottom-sheet/activity": () => import("@/src/examples/bottom-sheet/activity"),
  "react/bottom-sheet/stackflow": () => import("@/src/examples/bottom-sheet/stackflow"),
  "react/menu-sheet/activity": () => import("@/src/examples/menu-sheet/activity"),
  "react/menu-sheet/stackflow": () => import("@/src/examples/menu-sheet/stackflow"),
  "react/article/prevent-pull": () => import("@/src/examples/article/prevent-pull"),
  "react/article/prevent-drag": () => import("@/src/examples/article/prevent-drag"),
  "react/inline-banner/activity": () => import("@/src/examples/inline-banner/activity"),
  "demo/home": () => import("@/src/examples/demo/home"),
  "demo/article-detail": () => import("@/src/examples/demo/article-detail"),
};

interface StackflowPreviewProps {
  names: string[];
}

export function StackflowPreview(props: StackflowPreviewProps) {
  const { names } = props;

  const activities = React.useMemo(() => {
    return names
      .filter((name) => ACTIVITY_IMPORTS[name])
      .map((name) => ({
        name: name as RegisteredActivityName,
        component: React.lazy(
          ACTIVITY_IMPORTS[name] as () => Promise<{ default: React.ComponentType<any> }>,
        ) as ActivityComponentType<RegisteredActivityName>,
      }));
  }, [names]);

  if (activities.length === 0) {
    return (
      <div className="my-6 rounded-lg border border-fd-border bg-fd-muted/30 p-4 text-sm text-fd-muted-foreground">
        Preview not available for this example.
      </div>
    );
  }

  return (
    <StandalonePreviewContext.Provider value={false}>
      <React.Suspense
        fallback={
          <div className="my-6 flex h-[320px] items-center justify-center rounded-lg border border-fd-border bg-fd-muted/30 text-fd-muted-foreground">
            Loading…
          </div>
        }
      >
        <Stackflow activities={activities} />
      </React.Suspense>
    </StandalonePreviewContext.Provider>
  );
}
