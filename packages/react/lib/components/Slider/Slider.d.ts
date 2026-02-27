import { SliderVariantProps } from '@grape-design/css/recipes/slider';
import { SliderTickVariantProps } from '@grape-design/css/recipes/slider-tick';
import { SliderMarkerVariantProps } from '@grape-design/css/recipes/slider-marker';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { Slider } from '@seed-design/react-slider';
import { HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react';
export interface SliderRootProps extends SliderVariantProps, Slider.RootProps {
}
export declare const SliderRoot: ForwardRefExoticComponent<SliderRootProps & RefAttributes<HTMLDivElement>>;
export interface SliderControlProps extends PrimitiveProps, HTMLAttributes<HTMLDivElement> {
}
export declare const SliderControl: ForwardRefExoticComponent<SliderControlProps & RefAttributes<HTMLDivElement>>;
export interface SliderTrackProps extends PrimitiveProps, HTMLAttributes<HTMLDivElement> {
}
export declare const SliderTrack: ForwardRefExoticComponent<SliderTrackProps & RefAttributes<HTMLDivElement>>;
export interface SliderRangeProps extends Slider.RangeProps {
}
export declare const SliderRange: ForwardRefExoticComponent<SliderRangeProps & RefAttributes<HTMLDivElement>>;
export interface SliderThumbProps extends Slider.ThumbProps {
}
export declare const SliderThumb: ForwardRefExoticComponent<Slider.ThumbProps & RefAttributes<HTMLDivElement>>;
export interface SliderHiddenInputProps extends Slider.HiddenInputProps {
}
export declare const SliderHiddenInput: ForwardRefExoticComponent<Slider.HiddenInputProps & RefAttributes<HTMLInputElement>>;
export interface SliderTickProps extends SliderTickVariantProps, Slider.TickProps {
}
export declare const SliderTick: ForwardRefExoticComponent<SliderTickProps & RefAttributes<HTMLDivElement>>;
export interface SliderMarkersProps extends PrimitiveProps, HTMLAttributes<HTMLDivElement> {
}
export declare const SliderMarkers: ForwardRefExoticComponent<SliderMarkersProps & RefAttributes<HTMLDivElement>>;
export interface SliderMarkerProps extends SliderMarkerVariantProps, Slider.MarkerProps {
}
export declare const SliderMarker: ForwardRefExoticComponent<SliderMarkerProps & RefAttributes<HTMLDivElement>>;
export interface SliderValueIndicatorRootProps extends Slider.ValueIndicatorRootProps {
}
export declare const SliderValueIndicatorRoot: ForwardRefExoticComponent<SliderValueIndicatorRootProps & RefAttributes<HTMLDivElement>>;
export interface SliderValueIndicatorLabelProps extends Slider.ValueIndicatorLabelProps {
}
export declare const SliderValueIndicatorLabel: ForwardRefExoticComponent<Omit<Slider.ValueIndicatorLabelProps & RefAttributes<HTMLSpanElement>, "ref"> & RefAttributes<HTMLSpanElement>>;
export interface SliderValueIndicatorArrowProps extends PrimitiveProps, HTMLAttributes<HTMLDivElement> {
}
export declare const SliderValueIndicatorArrow: ForwardRefExoticComponent<SliderValueIndicatorArrowProps & RefAttributes<HTMLDivElement>>;
export interface SliderValueIndicatorArrowTipProps extends React.SVGProps<SVGSVGElement> {
    /**
     * radius of the arrow tip
     * @default 2
     */
    tipRadius?: number;
}
export declare const SliderValueIndicatorArrowTip: ForwardRefExoticComponent<Omit<SliderValueIndicatorArrowTipProps, "ref"> & RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=Slider.d.ts.map