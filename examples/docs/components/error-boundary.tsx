"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div role="alert" className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm">
          <p className="font-medium text-red-600 dark:text-red-400">Something went wrong</p>
          <pre className="mt-2 overflow-auto text-fd-muted-foreground">{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
