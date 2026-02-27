import { BoxProps } from '../Box/Box';
import * as React from "react";
export interface AspectRatioProps extends BoxProps {
    /**
     * The aspect ratio of the aspect ratio container (width / height).
     * @default 4 / 3
     */
    ratio?: number;
    /**
     * @default "relative"
     */
    position?: BoxProps["position"];
    /**
     * @default "hidden"
     */
    overflowX?: BoxProps["overflowX"];
    /**
     * @default "hidden"
     */
    overflowY?: BoxProps["overflowY"];
}
export declare const AspectRatio: React.ForwardRefExoticComponent<AspectRatioProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AspectRatio.d.ts.map