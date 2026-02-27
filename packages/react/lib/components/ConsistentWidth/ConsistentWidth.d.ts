import { PrimitiveProps } from '@seed-design/react-primitive';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface ConsistentWidthProps extends PrimitiveProps, Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    children: string;
}
export declare const ConsistentWidth: ForwardRefExoticComponent<ConsistentWidthProps & RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=ConsistentWidth.d.ts.map