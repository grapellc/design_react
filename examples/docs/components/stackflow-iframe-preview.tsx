"use client";

import { useEffect, useRef, useState } from "react";

interface StackflowIframePreviewProps {
  path: string;
}

const STACKFLOW_SPA_DEV_URL = "http://localhost:5173";

function getStackflowSpaUrl(path: string): string {
  if (typeof window === "undefined") return "";
  const baseURL =
    process.env.NODE_ENV === "development" ? STACKFLOW_SPA_DEV_URL : STACKFLOW_SPA_DEV_URL;
  return new URL(path, baseURL).toString();
}

export function StackflowIframePreview({ path }: StackflowIframePreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rendered, setRendered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) {
    return (
      <div className="my-6 flex h-[400px] items-center justify-center rounded-lg border border-fd-border bg-fd-muted/30 text-fd-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  const iframeSrc = getStackflowSpaUrl(path);

  return (
    <div className="not-prose my-6 flex w-full justify-center">
      <div className="relative h-[640px] w-full max-w-[360px] overflow-hidden rounded-lg border border-fd-border">
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title="Stackflow Demo"
          onLoad={() => setIsLoaded(true)}
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          loading="lazy"
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-fd-muted/30 p-4">
            <span className="text-fd-muted-foreground text-sm">Loading demo…</span>
            <p className="text-center text-fd-muted-foreground text-xs">
              If the demo does not load, run the stackflow-spa on port 5173:
              <br />
              <code className="mt-1 block rounded bg-fd-muted px-2 py-1 font-mono">
                cd vendor/seed-design/examples/stackflow-spa && pnpm dev
              </code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
