'use client';

import type { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const PullToRefreshPreview = dynamic(
  () => import('./preview') as Promise<{ default: ComponentType<{ params?: unknown }> }>,
  { ssr: false },
);

export default function PullToRefreshPreviewClient() {
  return <PullToRefreshPreview />;
}
