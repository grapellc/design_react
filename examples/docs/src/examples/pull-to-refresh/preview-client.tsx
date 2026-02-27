'use client';

import dynamic from 'next/dynamic';

const PullToRefreshPreview = dynamic(() => import('./preview'), { ssr: false });

export default function PullToRefreshPreviewClient() {
  return <PullToRefreshPreview />;
}
