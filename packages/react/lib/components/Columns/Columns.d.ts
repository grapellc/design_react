import { BoxProps } from '../Box/Box';
import * as React from "react";
/**
 * @deprecated Use `HStack` instead.
 */
export interface ColumnsProps extends Omit<BoxProps, "display" | "direction"> {
}
/**
 * @deprecated Use `HStack` instead.
 */
export declare const Columns: React.ForwardRefExoticComponent<ColumnsProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `HStack` instead.
 */
export interface ColumnProps extends Omit<BoxProps, "display" | "flexDirection" | "width"> {
    width?: BoxProps["width"] | "content";
}
/**
 * @deprecated Use `HStack` instead.
 */
export declare const Column: React.ForwardRefExoticComponent<ColumnProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Columns.d.ts.map