import React from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";
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

function resolveSpacing(value: keyof typeof spacing | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  return spacing[value];
}

function resolveRadius(value: keyof typeof radius | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  return radius[value];
}

function resolveBg(value: BoxProps["bg"]): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb"))) return value;
  const bgKeys = value as keyof typeof colors.bg;
  if (bgKeys in colors.bg) return colors.bg[bgKeys];
  const paletteKeys = value as keyof typeof colors.palette;
  if (paletteKeys in colors.palette) return colors.palette[paletteKeys];
  return value as string;
}

export const Box = React.forwardRef<View, BoxProps>(
  (
    {
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      bg,
      borderRadius,
      width,
      height,
      flex,
      flexDirection,
      alignItems,
      justifyContent,
      gap,
      style,
      ...rest
    },
    ref
  ) => {
    const resolvedStyle = {
      ...(resolveSpacing(p) !== undefined && { padding: resolveSpacing(p) }),
      ...(resolveSpacing(px) !== undefined && { paddingHorizontal: resolveSpacing(px) }),
      ...(resolveSpacing(py) !== undefined && { paddingVertical: resolveSpacing(py) }),
      ...(resolveSpacing(pt) !== undefined && { paddingTop: resolveSpacing(pt) }),
      ...(resolveSpacing(pr) !== undefined && { paddingRight: resolveSpacing(pr) }),
      ...(resolveSpacing(pb) !== undefined && { paddingBottom: resolveSpacing(pb) }),
      ...(resolveSpacing(pl) !== undefined && { paddingLeft: resolveSpacing(pl) }),
      ...(resolveSpacing(m) !== undefined && { margin: resolveSpacing(m) }),
      ...(resolveSpacing(mx) !== undefined && { marginHorizontal: resolveSpacing(mx) }),
      ...(resolveSpacing(my) !== undefined && { marginVertical: resolveSpacing(my) }),
      ...(resolveSpacing(mt) !== undefined && { marginTop: resolveSpacing(mt) }),
      ...(resolveSpacing(mr) !== undefined && { marginRight: resolveSpacing(mr) }),
      ...(resolveSpacing(mb) !== undefined && { marginBottom: resolveSpacing(mb) }),
      ...(resolveSpacing(ml) !== undefined && { marginLeft: resolveSpacing(ml) }),
      ...(resolveBg(bg) && { backgroundColor: resolveBg(bg) }),
      ...(resolveRadius(borderRadius) !== undefined && { borderRadius: resolveRadius(borderRadius) }),
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(flex !== undefined && { flex }),
      ...(flexDirection && { flexDirection }),
      ...(alignItems && { alignItems }),
      ...(justifyContent && { justifyContent }),
      ...(resolveSpacing(gap) !== undefined && { gap: resolveSpacing(gap) }),
    } as ViewStyle;
    return <View ref={ref} style={[resolvedStyle, style]} {...rest} />;
  }
);
Box.displayName = "Box";
