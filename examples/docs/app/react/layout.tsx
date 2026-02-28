import { reactOptions } from '@/app/layout.config';
import { ClientOnlyDocsLayout } from './ClientOnlyDocsLayout';

export default function Layout({ children }: LayoutProps<'/react'>) {
  return <ClientOnlyDocsLayout {...reactOptions}>{children}</ClientOnlyDocsLayout>;
}
