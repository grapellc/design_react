import { FlexProps } from '../Flex';
import * as React from "react";
/**
 * @deprecated Use `VStack` instead.
 */
export interface StackProps extends Omit<FlexProps, "flexDirection"> {
}
/**
 * @deprecated Use `VStack` instead.
 */
export declare const Stack: React.ForwardRefExoticComponent<StackProps & React.RefAttributes<HTMLDivElement>>;
export interface VStackProps extends Omit<FlexProps, "flexDirection"> {
}
export declare const VStack: React.ForwardRefExoticComponent<VStackProps & React.RefAttributes<HTMLDivElement>>;
export interface HStackProps extends Omit<FlexProps, "flexDirection"> {
}
export declare const HStack: React.ForwardRefExoticComponent<HStackProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Stack.d.ts.map