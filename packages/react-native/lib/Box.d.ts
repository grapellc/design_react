import React from "react";
import { View, type ViewProps } from "react-native";
import { spacing, radius, colors } from "@grape-design/tokens/native";
export interface BoxProps extends ViewProps {
    p?: keyof typeof spacing | number;
    px?: keyof typeof spacing | number;
    py?: keyof typeof spacing | number;
    pt?: keyof typeof spacing | number;
    pr?: keyof typeof spacing | number;
    pb?: keyof typeof spacing | number;
    pl?: keyof typeof spacing | number;
    m?: keyof typeof spacing | number;
    mx?: keyof typeof spacing | number;
    my?: keyof typeof spacing | number;
    mt?: keyof typeof spacing | number;
    mr?: keyof typeof spacing | number;
    mb?: keyof typeof spacing | number;
    ml?: keyof typeof spacing | number;
    bg?: keyof typeof colors.bg | keyof typeof colors.palette | string;
    borderRadius?: keyof typeof radius | number;
    width?: number | string;
    height?: number | string;
    flex?: number;
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    gap?: keyof typeof spacing | number;
}
export declare const Box: React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<View>>;
//# sourceMappingURL=Box.d.ts.map