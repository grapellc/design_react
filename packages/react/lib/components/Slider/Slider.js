'use client';
import { jsx } from 'react/jsx-runtime';
import { slider } from '@seed-design/css/recipes/slider';
import { sliderTick } from '@seed-design/css/recipes/slider-tick';
import { sliderMarker } from '@seed-design/css/recipes/slider-marker';
import { Primitive } from '@seed-design/react-primitive';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { Slider, useSliderContext } from '@seed-design/react-slider';
import { forwardRef, useState } from 'react';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import clsx from 'clsx';
import { mergeProps } from '@seed-design/dom-utils';
import { useFieldContext } from '@seed-design/react-field';
import { composeRefs } from '@radix-ui/react-compose-refs';

const { withProvider, withContext, useClassNames } = createSlotRecipeContext(slider);
const { withContext: withTickContext } = createRecipeContext(sliderTick);
const { withContext: withMarkerContext } = createRecipeContext(sliderMarker);
const withFieldStateProps = createWithStateProps([{ useContext: useFieldContext, strict: false }]);
const withStateProps = createWithStateProps([
  useSliderContext,
  { useContext: useFieldContext, strict: false }
]);
const SliderRoot = withProvider(Slider.Root, "root");
const SliderControl = withContext(
  withStateProps(Primitive.div),
  "control"
);
const SliderTrack = withContext(
  withStateProps(Primitive.div),
  "track"
);
const SliderRange = withContext(
  withFieldStateProps(Slider.Range),
  "range"
);
const SliderThumb = forwardRef(
  ({ thumbIndex, className, ...props }, ref) => {
    const classNames = useClassNames();
    const fieldContext = useFieldContext({ strict: false });
    const mergedProps = mergeProps(fieldContext?.inputAriaAttributes ?? {}, props);
    return /* @__PURE__ */ jsx(
      Slider.Thumb,
      {
        ref,
        className: clsx(classNames.thumb, className),
        thumbIndex,
        ...mergedProps
      }
    );
  }
);
SliderThumb.displayName = "SliderThumb";
const SliderHiddenInput = Slider.HiddenInput;
const SliderTick = withTickContext(Slider.Tick);
const SliderMarkers = withContext(
  withStateProps(Primitive.div),
  "markers"
);
const SliderMarker = withMarkerContext(
  withFieldStateProps(Slider.Marker)
);
const SliderValueIndicatorRoot = withContext(
  Slider.ValueIndicatorRoot,
  "valueIndicatorRoot"
);
const SliderValueIndicatorLabel = withStateProps(Slider.ValueIndicatorLabel);
const SliderValueIndicatorArrow = withContext(withStateProps(Primitive.div), "valueIndicatorArrow");
const SliderValueIndicatorArrowTip = forwardRef(({ tipRadius = 2, className, ...otherProps }, ref) => {
  const [valueIndicatorArrowTip, setValueIndicatorArrowTip] = useState(null);
  const width = valueIndicatorArrowTip?.clientWidth ?? 0;
  const height = valueIndicatorArrowTip?.clientHeight ?? 0;
  const pathData = `M0,0
      H${width}
      L${width / 2 + tipRadius},${height - tipRadius}
      Q${width / 2},${height} ${width / 2 - tipRadius},${height - tipRadius}
      Z`;
  const classNames = useClassNames();
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: `0 0 ${width} ${height}`,
      ref: composeRefs(setValueIndicatorArrowTip, ref),
      className: clsx(classNames.valueIndicatorArrowTip, className),
      ...otherProps,
      children: /* @__PURE__ */ jsx("path", { stroke: "none", d: pathData })
    }
  );
});
SliderValueIndicatorArrowTip.displayName = "SliderValueIndicatorArrowTip";

export { SliderControl, SliderHiddenInput, SliderMarker, SliderMarkers, SliderRange, SliderRoot, SliderThumb, SliderTick, SliderTrack, SliderValueIndicatorArrow, SliderValueIndicatorArrowTip, SliderValueIndicatorLabel, SliderValueIndicatorRoot };
