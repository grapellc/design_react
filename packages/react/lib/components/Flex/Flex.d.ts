import { BoxProps } from '../Box/Box';
import * as React from "react";
export interface FlexProps extends Omit<BoxProps, "display"> {
    /**
     * @default "flex"
     */
    display?: "flex" | "none";
    /**
     * Shorthand for `flexDirection`.
     */
    direction?: BoxProps["flexDirection"];
    /**
     * Shorthand for `flexWrap`.
     */
    wrap?: BoxProps["flexWrap"];
    /**
     * Shorthand for `alignItems`.
     */
    align?: BoxProps["alignItems"];
    /**
     * Shorthand for `justifyContent`.
     */
    justify?: BoxProps["justifyContent"];
    /**
     * Shorthand for `flexGrow`.
     */
    grow?: BoxProps["flexGrow"];
    /**
     * Shorthand for `flexShrink`.
     */
    shrink?: BoxProps["flexShrink"];
}
export declare const Flex: React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Flex.d.ts.map