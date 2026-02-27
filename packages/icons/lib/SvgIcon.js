import { jsx as _jsx } from "react/jsx-runtime";
import { iconNameToFilename } from "./iconNameToFilename";
const ICONS_BASE = "/icons";
export function MonochromeIcon({ name, size = 24, ...rest }) {
    const filename = `${iconNameToFilename(name)}.svg`;
    const src = `${ICONS_BASE}/monochrome/${filename}`;
    return (_jsx("img", { src: src, alt: "", width: size, height: size, ...rest }));
}
export function MulticolorIcon({ name, size = 24, ...rest }) {
    const baseName = iconNameToFilename(name);
    const filename = `${baseName}.svg`;
    const src = `${ICONS_BASE}/multicolor/${filename}`;
    return (_jsx("img", { src: src, alt: "", width: size, height: size, ...rest }));
}
