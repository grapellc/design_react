"use client";

import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { useEffect, useState, type ReactNode } from "react";
import { ErrorBoundary } from "./error-boundary";
import { StackflowIframePreview } from "./stackflow-iframe-preview";
import { StackflowPreview } from "./stackflow-preview";

type StackflowExampleProps = (
  | { names: string[]; path?: never }
  | { names?: never; path: string }
) & {
  children?: ReactNode;
};

const TABS_PLACEHOLDER = (
  <div
    className="min-h-[320px] rounded-lg border border-fd-border bg-fd-muted/30 flex items-center justify-center text-fd-muted-foreground text-sm"
    suppressHydrationWarning
  >
    Loading…
  </div>
);

export function StackflowExample(props: StackflowExampleProps) {
  const { names, path, children } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ErrorBoundary>{TABS_PLACEHOLDER}</ErrorBoundary>;
  }

  return (
    <ErrorBoundary>
      <Tabs items={["Preview", "Code"]}>
        <Tab value="Preview">
          {names != null && names.length > 0 && <StackflowPreview names={names} />}
          {path != null && (
            <div className="not-prose my-6">
              <StackflowIframePreview path={path} />
            </div>
          )}
        </Tab>
        <Tab value="Code">{children}</Tab>
      </Tabs>
    </ErrorBoundary>
  );
}
