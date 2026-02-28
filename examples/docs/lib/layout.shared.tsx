import { BookOpen, Code2 } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const gitConfig = {
  user: 'fuma-nama',
  repo: 'fumadocs',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Grape Design',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { icon: <BookOpen />, text: 'Docs', url: '/docs', active: 'nested-url' },
      { icon: <Code2 />, text: 'React', url: '/react', active: 'nested-url' },
    ],
  };
}
