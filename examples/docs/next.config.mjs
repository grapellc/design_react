import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname);

const withMDX = createMDX();

const REGISTRY_MODULES = [
  'action-button', 'action-sheet', 'alert-dialog', 'app-bar', 'app-screen', 'avatar', 'bottom-sheet',
  'callout', 'checkbox', 'chip', 'chip-tabs', 'contextual-floating-button', 'control-chip', 'error-state',
  'extended-action-sheet', 'field-button', 'floating-action-button', 'help-bubble', 'identity-placeholder',
  'inline-banner', 'list', 'list-header', 'loading-indicator', 'manner-temp', 'manner-temp-badge',
  'menu-sheet', 'page-banner', 'progress-circle', 'pull-to-refresh', 'radio-group', 'reaction-button',
  'result-section', 'segmented-control', 'select-box', 'slider', 'snackbar', 'switch', 'tabs', 'tag-group',
  'text-field', 'toggle-button',
];

const registryPath = path.join(docsRoot, 'src/registry');
const registryRelative = 'src/registry';
const resolveAliases = {
  'seed-design/ui': registryPath,
  ...Object.fromEntries(REGISTRY_MODULES.map((m) => [`seed-design/ui/${m}`, path.join(registryPath, `${m}.tsx`)])),
  'grape-design/ui': registryPath,
  ...Object.fromEntries(REGISTRY_MODULES.map((m) => [`grape-design/ui/${m}`, path.join(registryPath, `${m}.tsx`)])),
  'grapu-design/ui': registryPath,
  ...Object.fromEntries(REGISTRY_MODULES.map((m) => [`grapu-design/ui/${m}`, path.join(registryPath, `${m}.tsx`)])),
  '@seed-design/react': '@grapu-design/react',
  '@karrotmarket/react-monochrome-icon': '@grapu-design/icons/monochrome',
  '@karrotmarket/react-monochrome-icon/IconCheckmarkCircleFill': '@grapu-design/icons/monochrome/IconCheckmarkCircleFill',
  '@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill': '@grapu-design/icons/monochrome/IconCheckmarkFatFill',
  '@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill': '@grapu-design/icons/monochrome/IconExclamationmarkCircleFill',
  '@karrotmarket/react-monochrome-icon/IconMinusFatFill': '@grapu-design/icons/monochrome/IconMinusFatFill',
  '@karrotmarket/react-monochrome-icon/IconPlusLine': '@grapu-design/icons/monochrome/IconPlusLine',
  '@karrotmarket/react-monochrome-icon/IconXmarkLine': '@grapu-design/icons/monochrome/IconXmarkLine',
  '@karrotmarket/react-multicolor-icon': '@grapu-design/icons/multicolor',
  '@seed-design/react-icon': '@grapu-design/icons/react-icon',
  '@grape-design/react-icon': '@grapu-design/icons/react-icon',
  '@grapu-design/react-icon': '@grapu-design/icons/react-icon',
  '@seed-design/stackflow': '@grapu-design/stackflow',
};
const turbopackAliases = {
  'seed-design/ui': registryRelative,
  ...Object.fromEntries(REGISTRY_MODULES.map((m) => [`seed-design/ui/${m}`, `${registryRelative}/${m}.tsx`])),
  'grape-design/ui': registryRelative,
  ...Object.fromEntries(REGISTRY_MODULES.map((m) => [`grape-design/ui/${m}`, `${registryRelative}/${m}.tsx`])),
  'grapu-design/ui': registryRelative,
  ...Object.fromEntries(REGISTRY_MODULES.map((m) => [`grapu-design/ui/${m}`, `${registryRelative}/${m}.tsx`])),
  '@seed-design/react': '@grapu-design/react',
  '@karrotmarket/react-monochrome-icon': '@grapu-design/icons/monochrome',
  '@karrotmarket/react-monochrome-icon/IconCheckmarkCircleFill': '@grapu-design/icons/monochrome/IconCheckmarkCircleFill',
  '@karrotmarket/react-monochrome-icon/IconCheckmarkFatFill': '@grapu-design/icons/monochrome/IconCheckmarkFatFill',
  '@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill': '@grapu-design/icons/monochrome/IconExclamationmarkCircleFill',
  '@karrotmarket/react-monochrome-icon/IconMinusFatFill': '@grapu-design/icons/monochrome/IconMinusFatFill',
  '@karrotmarket/react-monochrome-icon/IconPlusLine': '@grapu-design/icons/monochrome/IconPlusLine',
  '@karrotmarket/react-monochrome-icon/IconXmarkLine': '@grapu-design/icons/monochrome/IconXmarkLine',
  '@karrotmarket/react-multicolor-icon': '@grapu-design/icons/multicolor',
  '@seed-design/react-icon': '@grapu-design/icons/react-icon',
  '@grape-design/react-icon': '@grapu-design/icons/react-icon',
  '@grapu-design/react-icon': '@grapu-design/icons/react-icon',
  '@seed-design/stackflow': '@grapu-design/stackflow',
};

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  serverExternalPackages: ['@takumi-rs/image-response'],
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  turbopack: {
    resolveAlias: turbopackAliases,
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.alias = { ...config.resolve.alias, ...resolveAliases };
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.ts', '.tsx'],
    };
    return config;
  },
  transpilePackages: ['@grapu-design/icons', '@grapu-design/react', '@grapu-design/css', '@grapu-design/stackflow'],
};

export default withMDX(config);
