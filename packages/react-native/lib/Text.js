import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Text as RNText } from "react-native";
import { colors, fontSize, fontWeight, lineHeight, } from "@grape-design/tokens/native";
const TEXT_STYLE_MAP = {
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
function resolveColor(value) {
    if (!value)
        return undefined;
    if (typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb")))
        return value;
    const fgKey = value;
    if (fgKey in colors.fg)
        return colors.fg[fgKey];
    const paletteKey = value;
    if (paletteKey in colors.palette)
        return colors.palette[paletteKey];
    return value;
}
export const Text = React.forwardRef(({ color, fontSize: fontSizeProp, fontWeight: fontWeightProp, lineHeight: lineHeightProp, textStyle, style, ...rest }, ref) => {
    const textStyleResolved = textStyle ? TEXT_STYLE_MAP[textStyle] : undefined;
    const resolvedStyle = {
        ...(resolveColor(color) && { color: resolveColor(color) }),
        ...(fontSizeProp !== undefined && {
            fontSize: typeof fontSizeProp === "number" ? fontSizeProp : fontSize[fontSizeProp],
        }),
        ...(textStyleResolved && !fontSizeProp && { fontSize: textStyleResolved.fontSize }),
        ...(fontWeightProp && { fontWeight: fontWeight[fontWeightProp] }),
        ...(lineHeightProp !== undefined && {
            lineHeight: typeof lineHeightProp === "number" ? lineHeightProp : lineHeight[lineHeightProp],
        }),
        ...(textStyleResolved && lineHeightProp === undefined && { lineHeight: textStyleResolved.lineHeight }),
    };
    return _jsx(RNText, { ref: ref, style: [resolvedStyle, style], ...rest });
});
Text.displayName = "Text";
