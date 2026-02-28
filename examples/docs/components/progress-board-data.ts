/**
 * Progress board component list and status.
 * Sync with content/docs/components/meta.json (exclude separator "---Deprecated---").
 */
const DOCS_COMPONENT_SLUGS = [
  'action-button',
  'action-chip',
  'alert-dialog',
  'app-screen',
  'article',
  'aspect-ratio',
  'avatar',
  'badge',
  'bottom-sheet',
  'callout',
  'checkbox',
  'chip-tabs',
  'chip',
  'contextual-floating-button',
  'field-button',
  'floating-action-button',
  'grid',
  'help-bubble',
  'identity-placeholder',
  'image-frame',
  'list',
  'manner-temp-badge',
  'manner-temp',
  'menu-sheet',
  'page-banner',
  'progress-circle',
  'pull-to-refresh',
  'radio-group',
  'reaction-button',
  'result-section',
  'scroll-fog',
  'segmented-control',
  'select-box',
  'skeleton',
  'slider',
  'snackbar',
  'tabs',
  'tag-group',
  'text-field-input',
  'text-field-textarea',
  'toggle-button',
  'action-sheet',
  'extended-action-sheet',
  'extended-fab',
  'fab',
  'control-chip',
  'error-state',
  'inline-banner',
  'inline',
  'link-content',
] as const;

export type PlatformStatus = 'ready' | 'not-ready' | 'not-planned' | 'in-progress' | 'deprecated';

export interface ProgressBoardRow {
  id: string;
  name: string;
  figma: PlatformStatus;
  react: PlatformStatus;
  ios: PlatformStatus;
  android: PlatformStatus;
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export const PROGRESS_BOARD_ROWS: ProgressBoardRow[] = DOCS_COMPONENT_SLUGS.map((id) => ({
  id,
  name: slugToTitle(id),
  figma: 'not-ready',
  react: 'ready',
  ios: 'not-ready',
  android: 'not-ready',
}));

const PLATFORMS = ['figma', 'react', 'ios', 'android'] as const;
type PlatformKey = (typeof PLATFORMS)[number];

export function getProgressStats(): Record<
  PlatformKey,
  { ready: number; total: number; percentage: number }
> {
  const total = PROGRESS_BOARD_ROWS.length;
  return PLATFORMS.reduce(
    (acc, platform) => {
      const key = platform as keyof ProgressBoardRow;
      const ready = PROGRESS_BOARD_ROWS.filter((r) => r[key] === 'ready').length;
      const notPlanned = PROGRESS_BOARD_ROWS.filter((r) => r[key] === 'not-planned').length;
      const totalForPlatform = total - notPlanned;
      acc[platform] = {
        ready,
        total: totalForPlatform || total,
        percentage: totalForPlatform ? Math.round((ready / totalForPlatform) * 100) : 0,
      };
      return acc;
    },
    {} as Record<PlatformKey, { ready: number; total: number; percentage: number }>,
  );
}
