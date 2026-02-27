import { jsx as _jsx } from "react/jsx-runtime";
import { MonochromeIcon } from "./SvgIcon";
export function createMonochromeIcon(name) {
    const Icon = (props) => (_jsx(MonochromeIcon, { name: name, ...props }));
    Icon.displayName = name;
    return Icon;
}
