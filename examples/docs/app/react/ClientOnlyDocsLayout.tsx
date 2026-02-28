"use client";

import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { useEffect, useState } from "react";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/notebook";

export interface ClientOnlyDocsLayoutProps extends DocsLayoutProps {
  children: React.ReactNode;
}

const LAYOUT_PLACEHOLDER = (
  <div
    className="flex min-h-screen flex-col"
    suppressHydrationWarning
    aria-busy="true"
    aria-label="Loading"
  >
    <div className="flex flex-1 items-center justify-center text-fd-muted-foreground text-sm">
      Loading…
    </div>
  </div>
);

export function ClientOnlyDocsLayout({ children, ...options }: ClientOnlyDocsLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return LAYOUT_PLACEHOLDER;
  }

  return <DocsLayout {...options}>{children}</DocsLayout>;
}
