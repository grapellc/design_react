import { BoxProps } from '../Box/Box';
import * as React from "react";
export interface GridProps extends Omit<BoxProps, "display"> {
    /**
     * @default "grid"
     */
    display?: "grid" | "none";
    /**
     * Shorthand for `alignItems`.
     */
    align?: BoxProps["alignItems"];
    /**
     * Shorthand for `justifyContent`.
     */
    justify?: BoxProps["justifyContent"];
    justifyItems?: "flex-start" | "flex-end" | "center" | "stretch";
    /**
     * Shorthand for `gridTemplateColumns`.
     * If number, `repeat({columns}, minmax(0, 1fr))` is applied.
     */
    columns?: number | string;
    /**
     * Shorthand for `gridTemplateRows`.
     * If number, `repeat({rows}, minmax(0, 1fr))` is applied.
     */
    rows?: number | string;
    /**
     * Shorthand for `gridAutoFlow`.
     */
    autoFlow?: "row" | "column" | "row dense" | "column dense";
    /**
     * Shorthand for `gridAutoColumns`.
     */
    autoColumns?: string;
    /**
     * Shorthand for `gridAutoRows`.
     */
    autoRows?: string;
}
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Grid.d.ts.map