import type { ReactNode } from 'react';

interface CardStubProps {
  title?: string;
  href?: string;
  variant?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function Card({ title, href, children }: CardStubProps) {
  const content = title ? (children ? <><strong>{title}</strong> — {children}</> : <strong>{title}</strong>) : children;
  if (href) {
    return (
      <a href={href} className="not-prose block rounded-lg border border-fd-border bg-fd-muted/50 p-4 my-2 text-sm">
        {content}
      </a>
    );
  }
  return <div className="not-prose rounded-lg border border-fd-border bg-fd-muted/50 p-4 my-2 text-sm">{content}</div>;
}
