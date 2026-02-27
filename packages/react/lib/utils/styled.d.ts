import { ScopedColorBg, ScopedColorFg, ScopedColorPalette, ScopedColorStroke, Dimension, Radius, SpacingX, SpacingY, Gradient, Shadow, ScopedColorBanner } from '@seed-design/css/vars';
import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
export declare function handleColor(color: string | undefined): any;
export declare function handleDimension(dimension: string | 0 | undefined): string | undefined;
export declare function handlePaddingWithSafeArea(padding: string | 0 | undefined, direction: "top" | "bottom"): string | undefined;
export declare function handleRadius(radius: string | 0 | undefined): any;
export interface StyleProps {
    /**
     * Shorthand for `background`.
     */
    bg?: ScopedColorBg | ScopedColorPalette | ScopedColorBanner | (string & {});
    background?: ScopedColorBg | ScopedColorPalette | ScopedColorBanner | (string & {});
    /**
     * Shorthand for `backgroundGradient`.
     */
    bgGradient?: Gradient;
    backgroundGradient?: Gradient;
    /**
     * Shorthand for `backgroundGradientDirection`.
     * e.g. `43deg`
     */
    bgGradientDirection?: "to right" | "to left" | "to top" | "to bottom" | "to top right" | "to top left" | "to bottom right" | "to bottom left" | (string & {});
    /**
     * e.g. `43deg`
     */
    backgroundGradientDirection?: "to right" | "to left" | "to top" | "to bottom" | "to top right" | "to top left" | "to bottom right" | "to bottom left" | (string & {});
    color?: ScopedColorFg | ScopedColorPalette | (string & {});
    borderColor?: ScopedColorStroke | ScopedColorPalette | (string & {});
    borderWidth?: 0 | 1 | (string & {});
    borderTopWidth?: 0 | 1 | (string & {});
    borderRightWidth?: 0 | 1 | (string & {});
    borderBottomWidth?: 0 | 1 | (string & {});
    borderLeftWidth?: 0 | 1 | (string & {});
    borderRadius?: Radius | 0 | (string & {});
    borderTopLeftRadius?: Radius | 0 | (string & {});
    borderTopRightRadius?: Radius | 0 | (string & {});
    borderBottomRightRadius?: Radius | 0 | (string & {});
    borderBottomLeftRadius?: Radius | 0 | (string & {});
    boxShadow?: Shadow | (string & {});
    width?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {});
    minWidth?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {});
    maxWidth?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {});
    height?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {});
    minHeight?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {});
    maxHeight?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | "full" | (string & {});
    top?: 0 | (string & {});
    left?: 0 | (string & {});
    right?: 0 | (string & {});
    bottom?: 0 | (string & {});
    padding?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Shorthand for `padding`.
     */
    p?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    paddingX?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Shorthand for `paddingX`.
     */
    px?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    paddingY?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Shorthand for `paddingY`.
     */
    py?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    paddingTop?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {});
    /**
     * Shorthand for `paddingTop`.
     */
    pt?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {});
    paddingRight?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Shorthand for `paddingRight`.
     */
    pr?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    paddingBottom?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {});
    /**
     * Shorthand for `paddingBottom`.
     */
    pb?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | "safeArea" | (string & {});
    paddingLeft?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Shorthand for `paddingLeft`.
     */
    pl?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Negative x-axis margin to extend the element outside its parent.
     * If set to "asPadding", it will use the padding value in the same direction.
     */
    bleedX?: "asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Negative y-axis margin to extend the element outside its parent.
     * If set to "asPadding", it will use the padding value in the same direction.
     */
    bleedY?: "asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Negative top margin to extend the element outside its parent.
     * If set to "asPadding", it will use the padding value in the same direction.
     */
    bleedTop?: "asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Negative right margin to extend the element outside its parent.
     * If set to "asPadding", it will use the padding value in the same direction.
     */
    bleedRight?: "asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Negative bottom margin to extend the element outside its parent.
     * If set to "asPadding", it will use the padding value in the same direction.
     */
    bleedBottom?: "asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    /**
     * Negative left margin to extend the element outside its parent.
     * If set to "asPadding", it will use the padding value in the same direction.
     */
    bleedLeft?: "asPadding" | Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    display?: "block" | "flex" | "inline-flex" | "inline" | "inline-block" | "none" | "inlineFlex" | "inlineBlock";
    position?: "relative" | "absolute" | "fixed" | "sticky";
    overflowX?: "visible" | "hidden" | "scroll" | "auto";
    overflowY?: "visible" | "hidden" | "scroll" | "auto";
    zIndex?: number | (string & {});
    /**
     * If true, flex-grow will be set to `1`.
     */
    flexGrow?: 0 | 1 | (number & {}) | true;
    /**
     * If true, flex-shrink will be set to `1`.
     */
    flexShrink?: 0 | (number & {}) | true;
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | "rowReverse" | "columnReverse";
    /**
     * If true, flex-wrap will be set to `wrap`.
     */
    flexWrap?: "wrap" | "wrap-reverse" | "nowrap" | true;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "flexStart" | "flexEnd" | "spaceBetween" | "spaceAround";
    /**
     * In flexbox layout, this property is ignored.
     */
    justifySelf?: "center" | "start" | "end" | "stretch";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "flexStart" | "flexEnd";
    alignContent?: "flex-start" | "flex-end" | "center" | "stretch" | "flexStart" | "flexEnd";
    alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "flexStart" | "flexEnd";
    gap?: Dimension | `spacingX.${SpacingX}` | `spacingY.${SpacingY}` | 0 | (string & {});
    gridColumn?: string;
    gridRow?: string;
    unstable_transform?: string;
    _active?: {
        bg?: ScopedColorBg | ScopedColorPalette | (string & {});
        background?: ScopedColorBg | ScopedColorPalette | (string & {});
    };
}
interface UseStyleProps extends StyleProps {
    style?: React.CSSProperties;
}
export declare function useStyleProps<T extends UseStyleProps>(props: T): {
    style: React.CSSProperties;
    restProps: Omit<T, keyof UseStyleProps>;
};
export declare function withStyleProps<P extends {}, R>(Component: React.ComponentType<P & React.RefAttributes<R>>): ForwardRefExoticComponent< PropsWithoutRef<P> & RefAttributes<R>>;
export {};
//# sourceMappingURL=styled.d.ts.map