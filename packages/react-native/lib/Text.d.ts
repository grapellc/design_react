import React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { colors, type ColorsFgKey, type FontSizeKey, type FontWeightKey, type LineHeightKey } from "@grape-design/tokens/native";
export interface TextProps extends RNTextProps {
    color?: ColorsFgKey | keyof typeof colors.palette | string;
    fontSize?: FontSizeKey | number;
    fontWeight?: FontWeightKey;
    lineHeight?: LineHeightKey | number;
    /** Align with seed-design textStyle; maps to fontSize + lineHeight */
    textStyle?: "title1" | "title2" | "title3" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption1" | "caption2";
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<RNText>>;
//# sourceMappingURL=Text.d.ts.map