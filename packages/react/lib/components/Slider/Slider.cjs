'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const slider = require('@seed-design/css/recipes/slider');
const sliderTick = require('@seed-design/css/recipes/slider-tick');
const sliderMarker = require('@seed-design/css/recipes/slider-marker');
const reactPrimitive = require('@seed-design/react-primitive');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const reactSlider = require('@seed-design/react-slider');
const React = require('react');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const clsx = require('clsx');
const domUtils = require('@seed-design/dom-utils');
const reactField = require('@seed-design/react-field');
const reactComposeRefs = require('@radix-ui/react-compose-refs');

const { withProvider, withContext, useClassNames } = createSlotRecipeContext.createSlotRecipeContext(slider.slider);
const { withContext: withTickContext } = createRecipeContext.createRecipeContext(sliderTick.sliderTick);
const { withContext: withMarkerContext } = createRecipeContext.createRecipeContext(sliderMarker.sliderMarker);
const withFieldStateProps = createWithStateProps.createWithStateProps([{ useContext: reactField.useFieldContext, strict: false }]);
const withStateProps = createWithStateProps.createWithStateProps([
  reactSlider.useSliderContext,
  { useContext: reactField.useFieldContext, strict: false }
]);
const SliderRoot = withProvider(reactSlider.Slider.Root, "root");
const SliderControl = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "control"
);
const SliderTrack = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "track"
);
const SliderRange = withContext(
  withFieldStateProps(reactSlider.Slider.Range),
  "range"
);
const SliderThumb = React.forwardRef(
  ({ thumbIndex, className, ...props }, ref) => {
    const classNames = useClassNames();
    const fieldContext = reactField.useFieldContext({ strict: false });
    const mergedProps = domUtils.mergeProps(fieldContext?.inputAriaAttributes ?? {}, props);
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactSlider.Slider.Thumb,
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
const SliderHiddenInput = reactSlider.Slider.HiddenInput;
const SliderTick = withTickContext(reactSlider.Slider.Tick);
const SliderMarkers = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "markers"
);
const SliderMarker = withMarkerContext(
  withFieldStateProps(reactSlider.Slider.Marker)
);
const SliderValueIndicatorRoot = withContext(
  reactSlider.Slider.ValueIndicatorRoot,
  "valueIndicatorRoot"
);
const SliderValueIndicatorLabel = withStateProps(reactSlider.Slider.ValueIndicatorLabel);
const SliderValueIndicatorArrow = withContext(withStateProps(reactPrimitive.Primitive.div), "valueIndicatorArrow");
const SliderValueIndicatorArrowTip = React.forwardRef(({ tipRadius = 2, className, ...otherProps }, ref) => {
  const [valueIndicatorArrowTip, setValueIndicatorArrowTip] = React.useState(null);
  const width = valueIndicatorArrowTip?.clientWidth ?? 0;
  const height = valueIndicatorArrowTip?.clientHeight ?? 0;
  const pathData = `M0,0
      H${width}
      L${width / 2 + tipRadius},${height - tipRadius}
      Q${width / 2},${height} ${width / 2 - tipRadius},${height - tipRadius}
      Z`;
  const classNames = useClassNames();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: `0 0 ${width} ${height}`,
      ref: reactComposeRefs.composeRefs(setValueIndicatorArrowTip, ref),
      className: clsx(classNames.valueIndicatorArrowTip, className),
      ...otherProps,
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { stroke: "none", d: pathData })
    }
  );
});
SliderValueIndicatorArrowTip.displayName = "SliderValueIndicatorArrowTip";

exports.SliderControl = SliderControl;
exports.SliderHiddenInput = SliderHiddenInput;
exports.SliderMarker = SliderMarker;
exports.SliderMarkers = SliderMarkers;
exports.SliderRange = SliderRange;
exports.SliderRoot = SliderRoot;
exports.SliderThumb = SliderThumb;
exports.SliderTick = SliderTick;
exports.SliderTrack = SliderTrack;
exports.SliderValueIndicatorArrow = SliderValueIndicatorArrow;
exports.SliderValueIndicatorArrowTip = SliderValueIndicatorArrowTip;
exports.SliderValueIndicatorLabel = SliderValueIndicatorLabel;
exports.SliderValueIndicatorRoot = SliderValueIndicatorRoot;
