import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { View } from "react-native";
import { spacing, radius, colors } from "@grape-design/tokens/native";
function resolveSpacing(value) {
    if (value === undefined)
        return undefined;
    if (typeof value === "number")
        return value;
    return spacing[value];
}
function resolveRadius(value) {
    if (value === undefined)
        return undefined;
    if (typeof value === "number")
        return value;
    return radius[value];
}
function resolveBg(value) {
    if (!value)
        return undefined;
    if (typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb")))
        return value;
    const bgKeys = value;
    if (bgKeys in colors.bg)
        return colors.bg[bgKeys];
    const paletteKeys = value;
    if (paletteKeys in colors.palette)
        return colors.palette[paletteKeys];
    return value;
}
export const Box = React.forwardRef(({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, bg, borderRadius, width, height, flex, flexDirection, alignItems, justifyContent, gap, style, ...rest }, ref) => {
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
    };
    return _jsx(View, { ref: ref, style: [resolvedStyle, style], ...rest });
});
Box.displayName = "Box";
