import type { ReactNode } from 'react';

interface StackflowExampleStubProps {
  names?: string[];
  children?: ReactNode;
}

export function StackflowExample({ children }: StackflowExampleStubProps) {
  return <>{children}</>;
}
