import { FlexProps } from '../Flex';
import * as React from "react";
export interface ResponsivePairProps extends Omit<FlexProps, "flexDirection" | "flexWrap"> {
    /**
     * @default "wrap-reverse"
     */
    wrap?: "wrap" | "wrap-reverse";
    children: [React.ReactNode, React.ReactNode];
}
export declare const ResponsivePair: React.ForwardRefExoticComponent<ResponsivePairProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ResponsivePair.d.ts.map