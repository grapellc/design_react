import { Dimension } from '@seed-design/css/vars';
import * as React from "react";
export interface FloatProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    placement: "bottom-end" | "bottom-start" | "top-end" | "top-start" | "bottom-center" | "top-center" | "middle-center" | "middle-end" | "middle-start";
    /**
     * @default 0
     */
    offsetX?: 0 | Dimension | (string & {});
    /**
     * @default 0
     */
    offsetY?: 0 | Dimension | (string & {});
    zIndex?: number | (string & {});
}
export declare const Float: React.ForwardRefExoticComponent<FloatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Float.d.ts.map