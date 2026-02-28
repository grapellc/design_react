'use client';
import { jsx } from 'react/jsx-runtime';
import { elementProps, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import { createContext, useContext, forwardRef } from 'react';

function useProgress(props) {
    const { value, minValue = 0, maxValue = 100 } = props;
    const indeterminate = typeof value !== "number";
    const stateProps = elementProps({
        "data-progress-state": value === maxValue ? "complete" : indeterminate ? "indeterminate" : "loading"
    });
    const percent = indeterminate ? -1 : (value - minValue) / (maxValue - minValue) * 100;
    return {
        value,
        indeterminate,
        percent,
        stateProps,
        progressProps: elementProps({
            role: "progressbar",
            "aria-valuenow": indeterminate ? undefined : value,
            "aria-valuemin": minValue,
            "aria-valuemax": maxValue,
            // TODO: provide translation api for aria-valuetext
            "aria-valuetext": indeterminate ? "loading..." : `${percent} percent`,
            ...stateProps
        })
    };
}
// referenced from zag-js/progress
function useProgressCircle(props) {
    const progress = useProgress(props);
    const circleStyle = {
        "--radius": "calc(var(--size) / 2 - var(--thickness) / 2)",
        cx: "calc(var(--size) / 2)",
        cy: "calc(var(--size) / 2)",
        r: "var(--radius)",
        fill: "transparent",
        strokeWidth: "var(--thickness)"
    };
    return {
        ...progress,
        rootProps: elementProps({
            ...progress.progressProps,
            style: {
                width: "var(--size)",
                height: "var(--size)"
            }
        }),
        trackProps: elementProps({
            ...progress.stateProps,
            style: circleStyle
        }),
        rangeProps: elementProps({
            ...progress.stateProps,
            style: {
                ...circleStyle,
                "--percent": progress.percent,
                "--circumference": "calc(2 * 3.14159 * var(--radius))",
                "--offset": "calc(var(--circumference) * (100 - var(--percent)) / 100)",
                strokeDashoffset: "calc(var(--circumference) * ((100 - var(--percent)) / 100))",
                strokeDasharray: progress.indeterminate ? undefined : "var(--circumference)",
                transformOrigin: "center",
                transform: "rotate(-90deg)",
                opacity: progress.value === 0 ? 0 : undefined
            }
        })
    };
}

const ProgressCircleContext = /*#__PURE__*/ createContext(null);
const ProgressCircleProvider = ProgressCircleContext.Provider;
function useProgressCircleContext({ strict = true } = {}) {
    const context = useContext(ProgressCircleContext);
    if (!context && strict) {
        throw new Error("useProgressCircleContext must be used within a ProgressCircle");
    }
    return context;
}

const ProgressCircleRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { value, maxValue, minValue, ...otherProps } = props;
    const api = useProgressCircle(useProgress({
        value,
        maxValue,
        minValue
    }));
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(ProgressCircleProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.svg, {
            ref: ref,
            ...mergedProps
        })
    });
});
ProgressCircleRoot.displayName = "ProgressCircleRoot";
const ProgressCircleTrack = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { trackProps } = useProgressCircleContext();
    const mergedProps = mergeProps(trackProps, props);
    return /*#__PURE__*/ jsx(Primitive.circle, {
        ref: ref,
        ...mergedProps
    });
});
ProgressCircleTrack.displayName = "ProgressCircleTrack";
const ProgressCircleRange = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { rangeProps } = useProgressCircleContext();
    const mergedProps = mergeProps(rangeProps, props);
    return /*#__PURE__*/ jsx(Primitive.circle, {
        ref: ref,
        ...mergedProps
    });
});
ProgressCircleRange.displayName = "ProgressCircleRange";

export { ProgressCircleRange as P, ProgressCircleRoot as a, ProgressCircleTrack as b, useProgressCircleContext as u };
