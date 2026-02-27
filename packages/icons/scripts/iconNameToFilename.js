/**
 * Converts IconName (e.g. IconBellFill) to asset filename without extension (e.g. bell_fill).
 */
function iconNameToFilename(iconName) {
  const withoutIcon = iconName.replace(/^Icon/, '');
  return withoutIcon
    .replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`)
    .replace(/^_/, '');
}

module.exports = { iconNameToFilename };
