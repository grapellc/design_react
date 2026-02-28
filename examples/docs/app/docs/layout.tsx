import { docsOptions } from '@/app/layout.config';
import { ClientOnlyDocsLayout } from '@/app/react/ClientOnlyDocsLayout';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return <ClientOnlyDocsLayout {...docsOptions}>{children}</ClientOnlyDocsLayout>;
}
