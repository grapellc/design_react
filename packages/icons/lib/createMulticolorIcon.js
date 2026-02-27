import { jsx as _jsx } from "react/jsx-runtime";
import { MulticolorIcon } from "./SvgIcon";
export function createMulticolorIcon(name) {
    const Icon = (props) => (_jsx(MulticolorIcon, { name: name, ...props }));
    Icon.displayName = name;
    return Icon;
}
