import React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  type ColorsFgKey,
  type FontSizeKey,
  type FontWeightKey,
  type LineHeightKey,
} from "@grape-design/tokens/native";

export interface TextProps extends RNTextProps {
  color?: ColorsFgKey | keyof typeof colors.palette | string;
  fontSize?: FontSizeKey | number;
  fontWeight?: FontWeightKey;
  lineHeight?: LineHeightKey | number;
  /** Align with seed-design textStyle; maps to fontSize + lineHeight */
  textStyle?: "title1" | "title2" | "title3" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption1" | "caption2";
}

const TEXT_STYLE_MAP: Record<
  NonNullable<TextProps["textStyle"]>,
  { fontSize: number; lineHeight: number }
> = {
  title1: { fontSize: fontSize.x8, lineHeight: lineHeight.x8 },
  title2: { fontSize: fontSize.x7, lineHeight: lineHeight.x7 },
  title3: { fontSize: fontSize.x6, lineHeight: lineHeight.x6 },
  subtitle1: { fontSize: fontSize.x5, lineHeight: lineHeight.x5 },
  subtitle2: { fontSize: fontSize.x4, lineHeight: lineHeight.x4 },
  body1: { fontSize: fontSize.x3, lineHeight: lineHeight.x3 },
  body2: { fontSize: fontSize.x2, lineHeight: lineHeight.x2 },
  caption1: { fontSize: fontSize.x1, lineHeight: lineHeight.x1 },
  caption2: { fontSize: fontSize.x1, lineHeight: lineHeight.x1 },
};

function resolveColor(value: TextProps["color"]): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb"))) return value;
  const fgKey = value as ColorsFgKey;
  if (fgKey in colors.fg) return colors.fg[fgKey];
  const paletteKey = value as keyof typeof colors.palette;
  if (paletteKey in colors.palette) return colors.palette[paletteKey];
  return value;
}

export const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      color,
      fontSize: fontSizeProp,
      fontWeight: fontWeightProp,
      lineHeight: lineHeightProp,
      textStyle,
      style,
      ...rest
    },
    ref
  ) => {
    const textStyleResolved = textStyle ? TEXT_STYLE_MAP[textStyle] : undefined;
    const resolvedStyle = {
      ...(resolveColor(color) && { color: resolveColor(color) }),
      ...(fontSizeProp !== undefined && {
        fontSize: typeof fontSizeProp === "number" ? fontSizeProp : fontSize[fontSizeProp as FontSizeKey],
      }),
      ...(textStyleResolved && !fontSizeProp && { fontSize: textStyleResolved.fontSize }),
      ...(fontWeightProp && { fontWeight: fontWeight[fontWeightProp] }),
      ...(lineHeightProp !== undefined && {
        lineHeight: typeof lineHeightProp === "number" ? lineHeightProp : lineHeight[lineHeightProp as LineHeightKey],
      }),
      ...(textStyleResolved && lineHeightProp === undefined && { lineHeight: textStyleResolved.lineHeight }),
    };
    return <RNText ref={ref} style={[resolvedStyle, style]} {...rest} />;
  }
);
Text.displayName = "Text";
