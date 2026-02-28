#!/usr/bin/env node
/**
 * Generates React icon components from SVG assets (e.g. grape_design_dart/assets/icons).
 * Outputs inline SVG so no /icons public path is needed.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');

const ASSETS_ROOT = process.env.ICONS_ASSETS_PATH
  ? path.resolve(process.env.ICONS_ASSETS_PATH)
  : path.resolve(PACKAGE_ROOT, '../../../grape_design_dart/assets/icons');

function iconNameToFilename(iconName) {
  const withoutIcon = iconName.replace(/^Icon/, '');
  return withoutIcon
    .replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`)
    .replace(/^_/, '');
}

function escapeForJs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

function loadSvg(dir, filename) {
  const filePath = path.join(dir, `${filename}.svg`);
  if (!fs.existsSync(filePath)) return null;
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content
    .replace(/\s*width="24"\s*/i, ' width="100%" ')
    .replace(/\s*height="24"\s*/i, ' height="100%" ')
    .trim();
  return content;
}

const MONOCHROME_NAMES = [
  'IconArrowClockwiseCircularFill', 'IconArrowClockwiseCircularLine', 'IconArrowUpBracketDownLine',
  'IconArrowUpRightLine', 'IconBellFill', 'IconBellLine', 'IconBellSlashLine', 'IconCalendarFill',
  'IconCarrotFill', 'IconCheckmarkCircleFill', 'IconCheckmarkFatFill', 'IconCheckmarkFill',
  'IconCheckmarkLine', 'IconChevronDownFill', 'IconChevronDownLine', 'IconChevronLeftLine',
  'IconChevronRightFill', 'IconChevronRightLine', 'IconExclamationmarkCircleFill', 'IconEyeSlashLine',
  'IconFaceSmileCircleFill', 'IconHeartFill', 'IconHouseLine', 'IconILowercaseSerifCircleFill', 'IconILowercaseSerifCircleLine',
  'IconLocationpinFill', 'IconLockLine', 'IconMagnifyingglassLine', 'IconMegaphoneFill', 'IconMinusFatFill',
  'IconPenHorizlineFill', 'IconPersonCircleLine', 'IconPlusCircleLine', 'IconPlusFill', 'IconPlusLine',
  'IconQuestionmarkCircleFill', 'IconSlashCircleLine', 'IconSquare2StackedFill', 'IconStarFill',
  'IconHorizline2VerticalChatbubbleRectangularRightFill', 'IconTagLine', 'IconTimer_10Line', 'IconTimer_3Line',
  'IconTrashcanLine', 'IconWonLine', 'IconXmarkCircleFill', 'IconXmarkLine',
];

const MULTICOLOR_NAMES = ['IconCheckFill', 'IconDiamond', 'IconIcecreamcone', 'IconSparkle2'];

let assetsMissingLogged = false;
function generateFile(variant, names) {
  const dir = path.join(ASSETS_ROOT, variant);
  if (!fs.existsSync(dir)) {
    if (!assetsMissingLogged) {
      assetsMissingLogged = true;
      console.warn('[icons] Asset dirs not found (set ICONS_ASSETS_PATH if needed); using existing generated files.');
    }
    return null;
  }

  const lines = [
    `"use client";`,
    `import * as React from "react";`,
    ``,
    `const CONTEXTUAL_ICON_SIZE = "var(--seed-icon-size, var(--seed-prefix-icon-size, var(--seed-suffix-icon-size, 24px)))";`,
    `interface InlineSvgIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "name"> { name: string; size?: number; svg: string }`,
    `function InlineSvgIcon({ name, size, svg, ...rest }: InlineSvgIconProps) {`,
    `  const sizeStyle = size != null ? size : CONTEXTUAL_ICON_SIZE;`,
    `  return (`,
    `    <span`,
    `      style={{ width: sizeStyle, height: sizeStyle, display: "inline-flex" }}`,
    `      {...rest}`,
    `    >`,
    `      <span style={{ width: "100%", height: "100%" }} dangerouslySetInnerHTML={{ __html: svg }} />`,
    `    </span>`,
    `  );`,
    `}`,
    ``,
  ];

  for (const name of names) {
    const filename = iconNameToFilename(name);
    const svg = loadSvg(dir, filename);
    if (!svg) {
      console.warn(`[icons] Missing ${variant}/${filename}.svg for ${name}`);
      lines.push(`export function ${name}(props: { size?: number }) { return <span style={{ width: props.size ?? CONTEXTUAL_ICON_SIZE, height: props.size ?? CONTEXTUAL_ICON_SIZE, display: "inline-flex" }} />; }\n`);
      continue;
    }
    const escaped = escapeForJs(svg);
    lines.push(`const ${name}_svg = \`${escaped}\`;`);
    lines.push(`export function ${name}({ size, ...rest }: { size?: number }) { return <InlineSvgIcon name="${name}" size={size} svg={${name}_svg} {...rest} />; }\n`);
  }

  return lines.join('\n');
}

const generatedDir = path.join(PACKAGE_ROOT, 'src', 'generated');
if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir, { recursive: true });

const monochromeOut = generateFile('monochrome', MONOCHROME_NAMES);
if (monochromeOut) {
  fs.writeFileSync(path.join(generatedDir, 'monochrome-icons.tsx'), monochromeOut);
  console.log('[icons] Generated src/generated/monochrome-icons.tsx');
}

const multicolorOut = generateFile('multicolor', MULTICOLOR_NAMES);
if (multicolorOut) {
  fs.writeFileSync(path.join(generatedDir, 'multicolor-icons.tsx'), multicolorOut);
  console.log('[icons] Generated src/generated/multicolor-icons.tsx');
}

function generatePerIconReexports(variant, names) {
  const outDir = path.join(PACKAGE_ROOT, 'src', variant);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const genPath = variant === 'monochrome' ? '../generated/monochrome-icons' : '../generated/multicolor-icons';
  for (const name of names) {
    const content = `export { ${name} as default } from '${genPath}';\n`;
    fs.writeFileSync(path.join(outDir, `${name}.tsx`), content);
  }
  console.log(`[icons] Generated ${names.length} re-exports in src/${variant}/`);
}

if (monochromeOut) {
  generatePerIconReexports('monochrome', MONOCHROME_NAMES);
}
if (multicolorOut) {
  generatePerIconReexports('multicolor', MULTICOLOR_NAMES);
}

if (!monochromeOut && !multicolorOut && !assetsMissingLogged) {
  console.warn('[icons] No assets found; using existing generated files if present.');
}
