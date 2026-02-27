import { StyleProps } from '../../utils/styled';
import * as React from "react";
export interface BoxProps extends StyleProps, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
    as?: React.ElementType;
    asChild?: boolean;
}
export declare const Box: React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Box.d.ts.map