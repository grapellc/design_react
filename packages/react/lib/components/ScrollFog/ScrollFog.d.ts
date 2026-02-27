import { ScrollFogVariantProps } from '@seed-design/css/recipes/scroll-fog';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
type ScrollPlacement = "top" | "bottom" | "left" | "right";
type SizesConfig = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};
export interface ScrollFogProps extends ScrollFogVariantProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Placement of fog effect
     * @default ["top", "bottom"]
     */
    placement?: ScrollPlacement[];
    /**
     * Size of the fog effect in pixels
     * @default 20
     */
    size?: number;
    /**
     * Size of the fog effect for each direction in pixels
     */
    sizes?: SizesConfig;
}
export declare const ScrollFog: ForwardRefExoticComponent<ScrollFogProps & RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=ScrollFog.d.ts.map