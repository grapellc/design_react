import { BoxProps } from '../Box/Box';
import * as React from "react";
export interface GridItemProps extends Omit<BoxProps, "gridColumn" | "gridRow" | "gridArea"> {
    /**
     * If true, the component will render its children directly without a wrapper element.
     * @default false
     */
    asChild?: boolean;
    /**
     * Number of columns to span, or "full" for full width (1 / -1).
     */
    colSpan?: number | "full";
    /**
     * Number of rows to span, or "full" for full height (1 / -1).
     */
    rowSpan?: number | "full";
    /**
     * Starting column
     */
    colStart?: number;
    /**
     * Ending column.
     */
    colEnd?: number;
    /**
     * Starting row
     */
    rowStart?: number;
    /**
     * Ending row.
     */
    rowEnd?: number;
}
export declare const GridItem: React.ForwardRefExoticComponent<GridItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GridItem.d.ts.map