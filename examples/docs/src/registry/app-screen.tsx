"use client";

import { PullToRefreshRoot, PullToRefreshContent, PullToRefreshIndicator } from "./pull-to-refresh";
import { AppScreen as SeedAppScreen } from "@seed-design/stackflow";
import { useActions, useActivity } from "@stackflow/react";
import { forwardRef, useContext } from "react";
import { StandalonePreviewContext } from "../StandalonePreviewContext";

export interface AppScreenProps extends SeedAppScreen.RootProps {
  preventSwipeBack?: boolean;
}

export const AppScreen = forwardRef<HTMLDivElement, AppScreenProps>(
  ({ children, onSwipeBackEnd, preventSwipeBack, ...otherProps }, ref) => {
    const standalone = useContext(StandalonePreviewContext);

    if (standalone) {
      return (
        <div ref={ref} {...otherProps}>
          {children}
        </div>
      );
    }

    const actions = useActions();
    const activity = useActivity();
    const isRoot = activity?.isRoot ?? true;
    const pop = actions?.pop ?? (() => {});
    const shouldSwipeBack = !isRoot && !preventSwipeBack;

    return (
      <SeedAppScreen.Root
        ref={ref}
        onSwipeBackEnd={({ swiped }) => {
          if (swiped) {
            pop();
          }
          onSwipeBackEnd?.({ swiped });
        }}
        {...otherProps}
      >
        <SeedAppScreen.Dim />
        {children}
        {shouldSwipeBack && <SeedAppScreen.Edge />}
      </SeedAppScreen.Root>
    );
  },
);
AppScreen.displayName = "AppScreen";

export interface AppScreenContentProps extends SeedAppScreen.LayerProps {
  ptr?: boolean;

  onPtrReady?: () => void;

  onPtrRefresh?: () => Promise<void>;
}

export const AppScreenContent = forwardRef<HTMLDivElement, AppScreenContentProps>(
  ({ children, ptr, onPtrReady, onPtrRefresh, ...otherProps }, ref) => {
    const standalone = useContext(StandalonePreviewContext);

    if (standalone) {
      if (!ptr) {
        return (
          <div ref={ref} {...otherProps}>
            {children}
          </div>
        );
      }
      return (
        <PullToRefreshRoot asChild onPtrReady={onPtrReady} onPtrRefresh={onPtrRefresh}>
          <div ref={ref} {...otherProps}>
            <PullToRefreshIndicator />
            <PullToRefreshContent asChild>{children}</PullToRefreshContent>
          </div>
        </PullToRefreshRoot>
      );
    }

    if (!ptr) {
      return (
        <SeedAppScreen.Layer ref={ref} {...otherProps}>
          {children}
        </SeedAppScreen.Layer>
      );
    }

    return (
      <PullToRefreshRoot asChild onPtrReady={onPtrReady} onPtrRefresh={onPtrRefresh}>
        <SeedAppScreen.Layer ref={ref} {...otherProps}>
          <PullToRefreshIndicator />
          <PullToRefreshContent asChild>{children}</PullToRefreshContent>
        </SeedAppScreen.Layer>
      </PullToRefreshRoot>
    );
  },
);
