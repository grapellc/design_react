import type { SVGProps } from "react";
export interface SvgIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}
interface MonochromeIconProps extends SvgIconProps {
    name: string;
}
export declare function MonochromeIcon({ name, size, ...rest }: MonochromeIconProps): import("react/jsx-runtime").JSX.Element;
interface MulticolorIconProps extends SvgIconProps {
    name: string;
}
export declare function MulticolorIcon({ name, size, ...rest }: MulticolorIconProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SvgIcon.d.ts.map