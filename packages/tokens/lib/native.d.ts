/**
 * Grape Design System – resolved token values for React Native.
 * Use these when building components with StyleSheet so token names map to actual values.
 */
export declare const spacing: {
    readonly x0_5: 2;
    readonly x1: 4;
    readonly x1_5: 6;
    readonly x2: 8;
    readonly x2_5: 10;
    readonly x3: 12;
    readonly x3_5: 14;
    readonly x4: 16;
    readonly x4_5: 18;
    readonly x5: 20;
    readonly x6: 24;
    readonly x7: 28;
    readonly x8: 32;
    readonly x9: 36;
    readonly x10: 40;
    readonly x12: 48;
    readonly x13: 52;
    readonly x14: 56;
    readonly x16: 64;
};
export declare const colors: {
    readonly fg: {
        readonly neutral: "#1a1a1a";
        readonly neutralInverse: "#ffffff";
        readonly secondary: "#737373";
        readonly tertiary: "#a3a3a3";
        readonly disabled: "#d4d4d4";
        readonly brand: "#2d7beb";
        readonly brandInverse: "#ffffff";
        readonly danger: "#e34850";
        readonly success: "#2d9d78";
        readonly warning: "#c9950e";
    };
    readonly bg: {
        readonly neutral: "#ffffff";
        readonly neutralWeak: "#f5f5f5";
        readonly neutralWeakPressed: "#eeeeee";
        readonly brandSolid: "#2d7beb";
        readonly brandSolidPressed: "#236bcf";
        readonly disabled: "#f5f5f5";
    };
    readonly stroke: {
        readonly default: "#e5e5e5";
        readonly strong: "#d4d4d4";
    };
    readonly palette: {
        readonly staticWhite: "#ffffff";
        readonly staticBlack: "#000000";
        readonly gray100: "#f5f5f5";
        readonly gray200: "#eeeeee";
        readonly gray300: "#e5e5e5";
        readonly gray400: "#d4d4d4";
        readonly gray500: "#a3a3a3";
        readonly gray600: "#737373";
        readonly gray700: "#525252";
        readonly gray800: "#404040";
        readonly gray900: "#262626";
    };
};
export declare const radius: {
    readonly none: 0;
    readonly x1: 4;
    readonly x2: 8;
    readonly x3: 12;
    readonly x4: 16;
    readonly full: 9999;
};
export declare const fontSize: {
    readonly x1: 12;
    readonly x2: 14;
    readonly x3: 16;
    readonly x4: 18;
    readonly x5: 20;
    readonly x6: 24;
    readonly x7: 28;
    readonly x8: 32;
};
export declare const fontWeight: {
    regular: "400";
    medium: "500";
    bold: "700";
};
export declare const lineHeight: {
    readonly x1: 16;
    readonly x2: 20;
    readonly x3: 24;
    readonly x4: 28;
    readonly x5: 32;
    readonly x6: 40;
    readonly x7: 48;
    readonly x8: 56;
};
export type SpacingKey = keyof typeof spacing;
export type ColorsFgKey = keyof typeof colors.fg;
export type ColorsBgKey = keyof typeof colors.bg;
export type RadiusKey = keyof typeof radius;
export type FontSizeKey = keyof typeof fontSize;
export type FontWeightKey = keyof typeof fontWeight;
export type LineHeightKey = keyof typeof lineHeight;
//# sourceMappingURL=native.d.ts.map