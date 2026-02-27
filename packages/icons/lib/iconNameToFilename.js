/**
 * Converts IconName (e.g. IconBellFill) to asset filename (e.g. bell_fill).
 */
export function iconNameToFilename(iconName) {
    const withoutIcon = iconName.replace(/^Icon/, "");
    return withoutIcon
        .replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`)
        .replace(/^_/, "");
}
