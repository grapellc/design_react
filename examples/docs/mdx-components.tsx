import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { ComponentExample } from '@/components/component-example';
import { ComponentPreview } from '@/components/component-preview';
import { CodeFromFile } from '@/components/code-from-file';
import { ManualInstallation } from '@/components/manual-installation';
import { ReactTypeTable } from '@/components/react-type-table';
import { Card } from '@/components/card-stub';
import { StackflowExample } from '@/components/stackflow-example-stub';

const IconStub = () => <span className="inline-block size-4 shrink-0" aria-hidden />;
const ThemeToggleStub = () => <span className="text-fd-muted-foreground text-sm">[Theme]</span>;
const SkeletonStub = () => <div className="h-4 w-24 rounded bg-fd-muted animate-pulse" aria-hidden />;
const ScrollFogStub = ({ children }: { children?: React.ReactNode }) => <div className="not-prose">{children}</div>;

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentExample,
    ComponentPreview,
    CodeFromFile,
    ManualInstallation,
    ReactTypeTable,
    'react-type-table': ReactTypeTable,
    Card,
    StackflowExample,
    IconComponent: IconStub,
    IconTerminal: IconStub,
    IconSprout: IconStub,
    ThemeToggle: ThemeToggleStub,
    Skeleton: SkeletonStub,
    ScrollFog: ScrollFogStub,
    Step,
    Steps,
    Accordion,
    Accordions,
    ...components,
  } as MDXComponents;
}
