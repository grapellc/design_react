import { Badge } from '@grapu-design/react';
import Link from 'next/link';
import {
  PROGRESS_BOARD_ROWS,
  getProgressStats,
  type PlatformStatus,
} from '@/components/progress-board-data';

const PLATFORM_LABELS = {
  figma: 'Figma',
  react: 'React',
  ios: 'iOS',
  android: 'Android',
} as const;

const STATUS_CONFIG: Record<
  PlatformStatus,
  { label: string; tone: 'positive' | 'warning' | 'neutral'; variant: 'weak' | 'solid' | 'outline' }
> = {
  ready: { label: 'Done', tone: 'positive', variant: 'weak' },
  'in-progress': { label: 'In Progress', tone: 'warning', variant: 'weak' },
  'not-ready': { label: 'Not Ready', tone: 'neutral', variant: 'weak' },
  deprecated: { label: 'Deprecated', tone: 'neutral', variant: 'weak' },
  'not-planned': { label: 'Not Planned', tone: 'neutral', variant: 'weak' },
};

function StatusBadge({ status }: { status: PlatformStatus }) {
  const { label, tone, variant } = STATUS_CONFIG[status] ?? {
    label: 'Not Ready',
    tone: 'neutral' as const,
    variant: 'weak' as const,
  };
  return (
    <Badge size="large" variant={variant} tone={tone}>
      {label}
    </Badge>
  );
}

export function ProgressBoardTable() {
  const stats = getProgressStats();
  const platforms = (['figma', 'react', 'ios', 'android'] as const);

  return (
    <div className="not-prose my-6">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {platforms.map((platform) => {
          const stat = stats[platform];
          return (
            <div key={platform} className="rounded-lg border border-fd-border p-4">
              <div className="mb-2 text-sm font-medium text-fd-muted-foreground">
                {PLATFORM_LABELS[platform]}
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold">{stat.percentage}%</div>
                <div className="text-sm text-fd-muted-foreground">
                  ({stat.ready}/{stat.total})
                </div>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-fd-secondary">
                <div
                  className="h-full bg-fd-primary transition-all"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-fd-border bg-fd-muted/50">
              <th className="sticky left-0 bg-fd-muted/50 px-4 py-3 text-left text-sm font-semibold">
                Component
              </th>
              {platforms.map((platform) => (
                <th
                  key={platform}
                  className="px-4 py-3 text-center text-sm font-semibold"
                >
                  {PLATFORM_LABELS[platform]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROGRESS_BOARD_ROWS.map((row) => (
              <tr
                key={row.id}
                className="border-b border-fd-border hover:bg-fd-muted/50"
              >
                <td className="sticky left-0 bg-fd-background px-4 py-3 text-sm font-medium">
                  <Link
                    href={`/docs/components/${row.id}`}
                    className="text-fd-primary hover:underline"
                  >
                    {row.name}
                  </Link>
                </td>
                {platforms.map((platform) => (
                  <td key={platform} className="px-4 py-3 text-center">
                    {platform === 'react' && row.react === 'ready' ? (
                      <Link
                        href={`/react/components/${row.id}`}
                        title="ready"
                        className="inline-block"
                      >
                        <StatusBadge status={row.react} />
                      </Link>
                    ) : (
                      <StatusBadge status={row[platform]} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
