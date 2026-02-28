import { source, reactSource } from '@/lib/source';
import { gitConfig } from '@/lib/layout.shared';
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/notebook';

const baseOptions: Omit<DocsLayoutProps, 'tree'> = {
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  nav: {
    title: 'Grape Design',
    mode: 'top',
  },
  sidebar: {
    tabs: [
      {
        title: 'Docs',
        description: 'Design language and foundation',
        url: '/docs',
      },
      {
        title: 'React',
        description: 'React component library',
        url: '/react',
      },
    ],
  },
  tabMode: 'navbar',
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.getPageTree(),
};

export const reactOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: reactSource.getPageTree(),
};
