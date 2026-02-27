import { TextVariantProps } from '@seed-design/css/recipes/text';
import { FontSize, FontWeight, LineHeight, ScopedColorFg, ScopedColorPalette } from '@seed-design/css/vars';
import type * as React from "react";
import type * as CSS from "csstype";
export interface TextProps extends Omit<TextVariantProps, "maxLines">, React.HTMLAttributes<HTMLSpanElement> {
    /**
     * The element to render as
     * @default "span"
     */
    as?: "dt" | "dd" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "legend";
    /**
     * The color of the text.
     */
    color?: ScopedColorFg | ScopedColorPalette | (string & {});
    /**
     * The font size of the text. Partially overrides the textStyle.
     */
    fontSize?: FontSize | (string & {});
    /**
     * The line height of the text. Partially overrides the textStyle.
     */
    lineHeight?: LineHeight | (string & {});
    /**
     * The font weight of the text. Partially overrides the textStyle.
     */
    fontWeight?: FontWeight;
    /**
     * The maximum number of lines to display. If the text overflows, it will be truncated.
     */
    maxLines?: number;
    /**
     * The alignment of the text.
     */
    align?: Extract<CSS.Property.TextAlign, "left" | "center" | "right">;
    /**
     * The user-select behavior of the text.
     */
    userSelect?: Extract<CSS.Property.UserSelect, "none" | "text" | "auto">;
    /**
     * The white-space behavior of the text.
     */
    whiteSpace?: Extract<CSS.Property.WhiteSpace, "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "break-spaces">;
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Text.d.ts.map