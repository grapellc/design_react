'use client';

import React from 'react';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { ComponentPreview } from './component-preview';
import { ErrorBoundary } from './error-boundary';

interface ComponentExampleProps {
  name: string;
  children?: React.ReactNode;
}

export function ComponentExample({ name, children }: ComponentExampleProps) {
  if (!children) {
    return (
      <ErrorBoundary>
        <div className="flex min-h-[200px]">
          <ComponentPreview name={name} />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Tabs items={['Preview', 'Code']}>
        <Tab value="Preview">
          <div className="flex min-h-[200px]">
            <ComponentPreview name={name} />
          </div>
        </Tab>
        <Tab value="Code">{children}</Tab>
      </Tabs>
    </ErrorBoundary>
  );
}
