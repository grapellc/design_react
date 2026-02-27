import { readFileSync } from 'fs';
import path from 'path';
import { Pre } from 'fumadocs-ui/components/codeblock';

const EXAMPLES_ROOT = path.join(process.cwd(), 'src/examples');

interface CodeFromFileProps {
  /** Path relative to src/examples, e.g. "action-button/preview.tsx" */
  path: string;
}

export function CodeFromFile({ path: filePath }: CodeFromFileProps) {
  const absolutePath = path.join(EXAMPLES_ROOT, filePath);
  let source: string;
  try {
    source = readFileSync(absolutePath, 'utf-8');
  } catch {
    return <pre className="rounded-lg bg-fd-muted p-4 text-sm">File not found: {filePath}</pre>;
  }
  const lang = filePath.endsWith('.tsx') ? 'tsx' : filePath.endsWith('.ts') ? 'ts' : 'text';
  return (
    <Pre className="not-prose">
      <code className={`language-${lang}`}>{source}</code>
    </Pre>
  );
}
