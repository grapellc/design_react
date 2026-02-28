'use client';
import { jsx } from 'react/jsx-runtime';
import { elementProps, dataAttr, inputProps, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import * as React from 'react';
import { useState, useEffect, useId, useMemo, useCallback, useRef, createContext, useContext } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useSize } from '@radix-ui/react-use-size';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { composeRefs } from '@radix-ui/react-compose-refs';

function useIsSSR() {
    const [isSSR, setIsSSR] = useState(true);
    useEffect(()=>{
        setIsSSR(false);
    }, []);
    return isSSR;
}

/**
 * Tracks the border-box sizes of multiple elements using ResizeObserver.
 *
 * Unlike `useSize` from Radix which tracks a single element, this hook
 * efficiently tracks multiple elements without requiring a fixed number
 * of hook calls.
 *
 * Based on @radix-ui/react-use-size but extended for multiple elements.
 *
 * @param elementsMap - A ref to a Map of elements to observe
 * @returns Map of element indices to their sizes
 *
 * @example
 * const sizes = useElementSizesMap(myRefsMap);
 * const width = sizes.get(0)?.width ?? 0;
 */ function useElementSizesMap(elementsMap) {
    const [sizes, setSizes] = useState(new Map());
    useLayoutEffect(()=>{
        const currentElements = elementsMap.current;
        // Provide sizes as early as possible using offsetWidth/Height
        const initialSizes = new Map();
        for (const [index, element] of currentElements.entries()){
            if (element) {
                initialSizes.set(index, {
                    width: element.offsetWidth,
                    height: element.offsetHeight
                });
            }
        }
        setSizes(initialSizes);
        const resizeObserver = new ResizeObserver((entries)=>{
            if (!Array.isArray(entries) || !entries.length) {
                return;
            }
            setSizes((prevSizes)=>{
                const nextSizes = new Map(prevSizes);
                for (const entry of entries){
                    // Find the index for this observed element
                    for (const [index, element] of currentElements.entries()){
                        if (element === entry.target) {
                            let width;
                            let height;
                            if ("borderBoxSize" in entry) {
                                const borderSizeEntry = entry.borderBoxSize;
                                // Iron out differences between browsers
                                const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
                                width = borderSize.inlineSize;
                                height = borderSize.blockSize;
                            } else {
                                // For browsers that don't support `borderBoxSize`
                                // we calculate it ourselves to get the correct border box
                                width = element.offsetWidth;
                                height = element.offsetHeight;
                            }
                            nextSizes.set(index, {
                                width,
                                height
                            });
                            break;
                        }
                    }
                }
                return nextSizes;
            });
        });
        // Observe all elements in the map
        for (const element of currentElements.values()){
            if (element) {
                resizeObserver.observe(element, {
                    box: "border-box"
                });
            }
        }
        return ()=>{
            // Unobserve each element individually for cleaner cleanup
            for (const element of currentElements.values()){
                if (element) {
                    resizeObserver.unobserve(element);
                }
            }
        };
    }, []); // Intentionally empty - observer tracks ref changes automatically
    return sizes;
}

// This code includes portions derived from radix-ui/primitives (https://github.com/radix-ui/primitives).
// Used under the MIT License: https://opensource.org/licenses/MIT
function clamp(value, [min, max]) {
    return Math.min(max, Math.max(min, value));
}
function getNextSortedValues(prevValues, nextValue, atIndex) {
    const nextValues = [
        ...prevValues
    ];
    nextValues[atIndex] = nextValue;
    return nextValues.sort((a, b)=>a - b);
}
function convertValueToPercentage(value, min, max) {
    const maxSteps = max - min;
    const percentPerStep = 100 / maxSteps;
    const percentage = percentPerStep * (value - min);
    return clamp(percentage, [
        0,
        100
    ]);
}
/**
 * Given a `values` array and a `nextValue`, determine which value in
 * the array is closest to `nextValue` and return its index.
 *
 * @example
 * // returns 1
 * getClosestValueIndex([10, 30], 25);
 */ function getClosestValueIndex(values, nextValue) {
    if (values.length === 1) return 0;
    const distances = values.map((value)=>Math.abs(value - nextValue));
    const closestDistance = Math.min(...distances);
    return distances.indexOf(closestDistance);
}
/**
 * Offsets the thumb centre point while sliding to ensure it remains
 * within the bounds of the slider when reaching the edges
 */ function getThumbInBoundsOffset(width, left, direction) {
    const halfWidth = width / 2;
    const halfPercent = 50;
    const offset = linearScale([
        0,
        halfPercent
    ], [
        0,
        halfWidth
    ]);
    return (halfWidth - offset(left) * direction) * direction;
}
/**
 * Calculates the offset needed to keep a label centered on the thumb position
 * but sticky to the track edges when it would overflow.
 *
 * @param labelWidth - The width of the label element
 * @param thumbPosition - The thumb position as a percentage (0-100)
 * @param thumbWidth - The width of the thumb element
 * @param trackWidth - The width of the track
 * @param direction - 1 for LTR, -1 for RTL
 * @returns The offset in pixels to apply to the label
 */ function getStickyLabelOffset(labelWidth, thumbPosition, thumbWidth, trackWidth, direction) {
    // If we don't have dimensions, no offset
    if (!labelWidth || !trackWidth) return 0;
    const halfLabelWidth = labelWidth / 2;
    // First calculate the thumb's offset to keep it in bounds
    const thumbOffset = getThumbInBoundsOffset(thumbWidth, thumbPosition, direction);
    // Calculate the actual thumb center position (percentage position + thumb offset)
    const naturalCenterPx = thumbPosition / 100 * trackWidth + thumbOffset;
    // Calculate the bounds where the label can be positioned (in pixels)
    const minCenterPx = halfLabelWidth;
    const maxCenterPx = trackWidth - halfLabelWidth;
    // Clamp the center position within bounds
    const clampedCenterPx = Math.max(minCenterPx, Math.min(maxCenterPx, naturalCenterPx));
    // Calculate the offset from the natural position (which already includes thumb offset)
    // So we return the total offset needed from the base percentage position
    const totalOffsetPx = clampedCenterPx - thumbPosition / 100 * trackWidth;
    return totalOffsetPx * direction;
}
/**
 * Gets an array of steps between each value.
 *
 * @example
 * // returns [1, 9]
 * getStepsBetweenValues([10, 11, 20]);
 */ function getStepsBetweenValues(values) {
    return values.slice(0, -1).map((value, index)=>values[index + 1] - value);
}
/**
 * Verifies the minimum steps between all values is greater than or equal
 * to the expected minimum steps.
 *
 * @example
 * // returns false
 * hasMinStepsBetweenValues([1,2,3], 2);
 *
 * @example
 * // returns true
 * hasMinStepsBetweenValues([1,2,3], 1);
 */ function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
    if (minStepsBetweenValues <= 0) return true;
    const stepsBetweenValues = getStepsBetweenValues(values);
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
}
// https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
function linearScale(input, output) {
    return (value)=>{
        if (input[0] === input[1] || output[0] === output[1]) return output[0];
        const ratio = (output[1] - output[0]) / (input[1] - input[0]);
        return output[0] + ratio * (value - input[0]);
    };
}
function getDecimalCount(value) {
    return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
    const rounder = 10 ** decimalCount;
    return Math.round(value * rounder) / rounder;
}
/**
 * Given a value and an array of allowed values, returns the closest allowed value.
 * If no allowed values are provided, returns the original value.
 *
 * @example
 * // returns 20
 * getClosestAllowedValue(23, [10, 20, 30, 40]);
 *
 * @example
 * // returns 30
 * getClosestAllowedValue(25, [10, 20, 30, 40]);
 */ function getClosestAllowedValue(value, allowedValues) {
    if (!allowedValues || allowedValues.length === 0) return value;
    // Find the closest allowed value
    let closestValue = allowedValues[0];
    let minDistance = Math.abs(value - closestValue);
    for (const allowedValue of allowedValues){
        const distance = Math.abs(value - allowedValue);
        if (distance < minDistance) {
            minDistance = distance;
            closestValue = allowedValue;
        }
    }
    return closestValue;
}
/**
 * Given a current value, direction, and an array of allowed values, returns the next allowed value in that direction.
 * If no allowed values are provided or no next value exists, returns null.
 *
 * @example
 * // returns 30
 * getNextAllowedValue(20, 1, [10, 20, 30, 40]);
 *
 * @example
 * // returns 10
 * getNextAllowedValue(20, -1, [10, 20, 30, 40]);
 */ function getNextAllowedValue(currentValue, direction, allowedValues) {
    if (!allowedValues || allowedValues.length === 0) {
        return null;
    }
    // Sort allowed values to ensure correct order
    const sortedValues = [
        ...allowedValues
    ].sort((a, b)=>a - b);
    // Find current value index
    const currentIndex = sortedValues.indexOf(currentValue);
    // Current value is not in allowed values, find the closest and then move from there
    if (currentIndex === -1) {
        const closest = getClosestAllowedValue(currentValue, sortedValues);
        const closestIndex = sortedValues.indexOf(closest);
        if (direction === 1 && closestIndex < sortedValues.length - 1) return sortedValues[closestIndex + 1];
        if (direction === -1 && closestIndex > 0) return sortedValues[closestIndex - 1];
        return closest;
    }
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < sortedValues.length) return sortedValues[nextIndex];
    return null;
}

// This code includes portions derived from radix-ui/primitives (https://github.com/radix-ui/primitives)
// Used under the MIT License: https://opensource.org/licenses/MIT
function useSliderState({ min, max, step = 1, allowedValues, minStepsBetweenThumbs = 0, values: propValues, defaultValues: propDefaultValues, onValuesCommit, onValuesChange, dir = "ltr" }) {
    const valueIndexToChangeRef = useRef(0);
    const [rootEl, rootRef] = useState(null);
    const rectRef = useRef(undefined);
    const dragTimerRef = useRef(null);
    const pointerDownPosition = useRef(0);
    const thumbRefsMap = useRef(new Map());
    const valueIndicatorRootRefsMap = useRef(new Map());
    const firstThumbSize = useSize(thumbRefsMap.current.get(0) ?? null);
    const rootSize = useSize(rootEl);
    const valueIndicatorRootSizes = useElementSizesMap(valueIndicatorRootRefsMap);
    const [values, setValues] = useControllableState({
        prop: propValues,
        defaultProp: propDefaultValues && propDefaultValues.length > 0 ? propDefaultValues : [
            (min + max) / 2
        ],
        onChange: onValuesChange
    });
    const valuesBeforeSlideStartRef = useRef(values);
    // Track uncommitted values to handle quick touch events on Android Chrome,
    // where onPointerMove fires (updating values) immediately before onPointerUp (ending slide)
    const uncommittedValuesRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false); // actual active state regardless of disabled/readOnly
    const [isDragging, setIsDragging] = useState(false);
    const [isPointerDown, setIsPointerDown] = useState(false);
    const [openThumbIndex, setOpenThumbIndex] = useState(null);
    const [activeThumbIndex, setActiveThumbIndex] = useState(null);
    const [shownIndicators, setShownIndicators] = useState(new Set());
    const updateValues = useCallback((value, atIndex, options)=>{
        const nextValue = (()=>{
            if (allowedValues && allowedValues.length > 0) return getClosestAllowedValue(value, allowedValues);
            const decimalCount = getDecimalCount(step);
            const snapToStep = roundValue(Math.round((value - min) / step) * step + min, decimalCount);
            return clamp(snapToStep, [
                min,
                max
            ]);
        })();
        setValues((prevValues)=>{
            const nextValues = getNextSortedValues(prevValues, nextValue, atIndex);
            if ((!allowedValues || allowedValues.length === 0) && hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step) === false) {
                return prevValues;
            }
            const hasChanged = nextValues.some((val, index)=>val !== prevValues[index]);
            if (!hasChanged) return prevValues;
            const newIndex = nextValues.indexOf(nextValue);
            valueIndexToChangeRef.current = newIndex;
            // Update activeThumbIndex when thumbs cross over during drag
            // This ensures only one value indicator is shown
            if (isDragging || isPointerDown) {
                setActiveThumbIndex(newIndex);
                // Also update openThumbIndex for hover mode to prevent both indicators from showing
                setOpenThumbIndex(newIndex);
            }
            if (options?.commit) {
                uncommittedValuesRef.current = null;
                onValuesCommit?.(nextValues);
            } else {
                uncommittedValuesRef.current = nextValues;
            }
            thumbRefsMap.current.get(valueIndexToChangeRef.current)?.focus();
            return nextValues;
        });
    }, [
        min,
        max,
        step,
        allowedValues,
        minStepsBetweenThumbs,
        setValues,
        onValuesCommit,
        isDragging,
        isPointerDown
    ]);
    const getValueFromPointer = useCallback((pointerPosition)=>{
        const rect = rectRef.current ?? rootEl?.getBoundingClientRect();
        if (!rect) return min;
        rectRef.current = rect;
        return linearScale([
            0,
            rect.width
        ], dir === "ltr" ? [
            min,
            max
        ] : [
            max,
            min
        ])(pointerPosition - rect.left);
    }, [
        min,
        max,
        dir,
        rootEl
    ]);
    /**
   * finds the closest thumb to 'value' and updates that thumb
   */ const handleSlideStart = useCallback((value)=>{
        updateValues(value, getClosestValueIndex(values, value));
    }, [
        values,
        updateValues
    ]);
    /**
   * updates the thumb that has been being moved
   */ const handleSlideMove = useCallback((value)=>{
        updateValues(value, valueIndexToChangeRef.current);
    }, [
        updateValues
    ]);
    /**
   * when sliding ends, call onValuesCommit if there are uncommitted changes
   */ const handleSlideEnd = useCallback(()=>{
        if (uncommittedValuesRef.current) {
            const valuesToCommit = uncommittedValuesRef.current;
            uncommittedValuesRef.current = null;
            onValuesCommit?.(valuesToCommit);
        }
        rectRef.current = undefined;
    }, [
        onValuesCommit
    ]);
    /**
   * Sets the first thumb to the start position (min or first allowedValue)
   */ const setToStart = useCallback(()=>{
        const targetValue = allowedValues?.[0] ?? min;
        updateValues(targetValue, 0, {
            commit: true
        });
    }, [
        allowedValues,
        min,
        updateValues
    ]);
    /**
   * Sets the last thumb to the end position (max or last allowedValue)
   */ const setToEnd = useCallback(()=>{
        const targetValue = allowedValues?.[allowedValues.length - 1] ?? max;
        updateValues(targetValue, values.length - 1, {
            commit: true
        });
    }, [
        allowedValues,
        max,
        values.length,
        updateValues
    ]);
    /**
   * Adjusts the value at the given index by step * multiplier * direction
   * @param atIndex - The index of the value to adjust
   * @param direction - The direction to move (1 for forward, -1 for backward)
   * @param multiplier - The multiplier for the step (default: 1)
   */ const adjustValueByStep = useCallback((atIndex, direction, multiplier = 1)=>{
        const currentValue = values[atIndex] ?? min;
        if (allowedValues && allowedValues.length > 0) {
            let nextValue = currentValue;
            for(let i = 0; i < Math.abs(multiplier); i++){
                const next = getNextAllowedValue(nextValue, direction, allowedValues);
                if (next === null) break;
                nextValue = next;
            }
            updateValues(nextValue, atIndex, {
                commit: true
            });
        } else {
            updateValues(currentValue + step * multiplier * direction, atIndex, {
                commit: true
            });
        }
    }, [
        values,
        allowedValues,
        min,
        step,
        updateValues
    ]);
    useEffect(()=>{
        return ()=>{
            if (dragTimerRef.current) clearTimeout(dragTimerRef.current);
        };
    }, []);
    return {
        refs: {
            root: rootRef
        },
        firstThumbSize,
        rootSize,
        valueIndicatorRootRefsMap,
        valueIndicatorRootSizes,
        min,
        max,
        step,
        allowedValues,
        values,
        setValues,
        updateValues,
        valueIndexToChangeRef,
        valuesBeforeSlideStartRef,
        dragTimerRef,
        pointerDownPosition,
        thumbRefsMap,
        dir,
        isHovered,
        setIsHovered,
        isActive,
        setIsActive,
        isDragging,
        setIsDragging,
        isPointerDown,
        setIsPointerDown,
        openThumbIndex,
        setOpenThumbIndex,
        activeThumbIndex,
        setActiveThumbIndex,
        shownIndicators,
        setShownIndicators,
        getValueFromPointer,
        handleSlideStart,
        handleSlideMove,
        handleSlideEnd,
        setToStart,
        setToEnd,
        adjustValueByStep
    };
}
function useSlider({ disabled, readOnly, invalid, name, jumpMultiplier = 10, getAriaValuetext, getAriaLabel, getAriaLabelledby, getValueIndicatorLabel = ({ value })=>value, valueIndicatorTrigger = "active", dragStartDelayInMilliseconds = 150, ...props }) {
    const api = useSliderState(props);
    const isSSR = useIsSSR();
    const id = useId();
    const isLtr = api.dir === "ltr";
    const stateProps = useMemo(()=>elementProps({
            "data-hover": dataAttr(api.isHovered),
            "data-active": dataAttr(api.isActive),
            "data-disabled": dataAttr(disabled),
            "data-readonly": dataAttr(readOnly),
            "data-invalid": dataAttr(invalid),
            "data-dragging": dataAttr(api.isDragging),
            "data-ssr": dataAttr(isSSR),
            "data-dir": api.dir
        }), [
        api.dir,
        api.isHovered,
        api.isActive,
        api.isDragging,
        disabled,
        readOnly,
        invalid,
        isSSR
    ]);
    const getHasEverBeenShown = useCallback((index)=>api.shownIndicators.has(index), [
        api.shownIndicators
    ]);
    const rootProps = useMemo(()=>elementProps({
            ...stateProps,
            dir: api.dir,
            onPointerLeave: ()=>{
                api.setIsHovered(false);
                api.setIsActive(false);
            },
            onPointerDown: (event)=>{
                api.setIsActive(true);
                if (disabled) return;
                if (event.target instanceof HTMLElement === false) return;
                api.setIsPointerDown(true);
                api.valuesBeforeSlideStartRef.current = api.values;
                event.target.setPointerCapture(event.pointerId);
                // Prevent browser focus behavior because we focus a thumb manually when values change.
                event.preventDefault();
                // Touch devices have a delay before focusing so won't focus if touch immediately moves
                // away from target (sliding). We want thumb to focus regardless.
                if (event.target.getAttribute("role") === "slider") {
                    // target is thumb
                    event.target.focus();
                    const thumbIndex = getClosestValueIndex(api.values, api.getValueFromPointer(event.clientX));
                    api.valueIndexToChangeRef.current = thumbIndex;
                    if (readOnly) return;
                    api.setIsDragging(true);
                    api.setActiveThumbIndex(thumbIndex);
                    return;
                }
                // target is track
                if (readOnly) {
                    // focus closest thumb
                    const closestIndex = getClosestValueIndex(api.values, api.getValueFromPointer(event.clientX));
                    api.thumbRefsMap.current.get(closestIndex)?.focus();
                    return;
                }
                // keep where the pointer was down
                api.pointerDownPosition.current = event.clientX;
                // Immediately determine which thumb will be affected
                const valueAtPointer = api.getValueFromPointer(event.clientX);
                const closestIndex = getClosestValueIndex(api.values, valueAtPointer);
                api.valueIndexToChangeRef.current = closestIndex;
                api.setActiveThumbIndex(closestIndex);
                // defer drag start to see if it's a slide or a click
                api.dragTimerRef.current = setTimeout(()=>{
                    api.setIsDragging(true);
                    api.handleSlideStart(valueAtPointer);
                }, dragStartDelayInMilliseconds);
            },
            onPointerMove: (event)=>{
                api.setIsHovered(true);
                if (disabled || readOnly) return;
                if (event.target instanceof HTMLElement === false) return;
                if (event.target.hasPointerCapture(event.pointerId) === false) return;
                api.setIsDragging(true);
                if (api.dragTimerRef.current) {
                    // if we had a drag timer running, clear it and start dragging immediately
                    clearTimeout(api.dragTimerRef.current);
                    api.dragTimerRef.current = null;
                    // The activeThumbIndex was already set in pointerDown
                    // Just verify valueIndexToChangeRef matches
                    if (api.activeThumbIndex !== null) {
                        api.valueIndexToChangeRef.current = api.activeThumbIndex;
                    }
                }
                // moves the thumb being dragged
                api.handleSlideMove(api.getValueFromPointer(event.clientX));
            },
            onPointerUp: (event)=>{
                api.setIsActive(false);
                api.setIsPointerDown(false);
                if (event.target instanceof HTMLElement === false) return;
                if (event.target.hasPointerCapture(event.pointerId) === false) return;
                event.target.releasePointerCapture(event.pointerId);
                // Check if pointer is over the thumb that was being dragged
                // This prevents flicker when transitioning from drag to hover
                if (api.isDragging && event.clientX !== undefined && api.activeThumbIndex !== null) {
                    const thumbElement = api.thumbRefsMap.current.get(api.activeThumbIndex);
                    if (thumbElement) {
                        const rect = thumbElement.getBoundingClientRect();
                        const isOverThumb = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
                        if (isOverThumb) {
                            // Keep open state when transitioning from drag to hover
                            api.setOpenThumbIndex(api.activeThumbIndex);
                        }
                    }
                }
                api.setIsDragging(false);
                api.setActiveThumbIndex(null);
                if (api.dragTimerRef.current) {
                    clearTimeout(api.dragTimerRef.current);
                    api.dragTimerRef.current = null;
                    // update immediately to where pointer was down since slide didn't start
                    const valueAtPointer = api.getValueFromPointer(api.pointerDownPosition.current);
                    const closestIndex = getClosestValueIndex(api.values, valueAtPointer);
                    api.updateValues(valueAtPointer, closestIndex, {
                        commit: true
                    });
                }
                api.handleSlideEnd();
            },
            onKeyDown: (event)=>{
                if (disabled || readOnly) return;
                const atIndex = api.valueIndexToChangeRef.current;
                switch(event.key){
                    case "Home":
                        {
                            api.setToStart();
                            event.preventDefault();
                            break;
                        }
                    case "End":
                        {
                            api.setToEnd();
                            event.preventDefault();
                            break;
                        }
                    case "PageUp":
                        {
                            api.adjustValueByStep(atIndex, 1, jumpMultiplier);
                            event.preventDefault();
                            break;
                        }
                    case "PageDown":
                        {
                            api.adjustValueByStep(atIndex, -1, jumpMultiplier);
                            event.preventDefault();
                            break;
                        }
                    case "ArrowUp":
                    case "ArrowRight":
                        {
                            const direction = isLtr ? 1 : -1;
                            const multiplier = event.shiftKey ? jumpMultiplier : 1;
                            api.adjustValueByStep(atIndex, direction, multiplier);
                            event.preventDefault();
                            break;
                        }
                    case "ArrowLeft":
                    case "ArrowDown":
                        {
                            const direction = isLtr ? -1 : 1;
                            const multiplier = event.shiftKey ? jumpMultiplier : 1;
                            api.adjustValueByStep(atIndex, direction, multiplier);
                            event.preventDefault();
                            break;
                        }
                }
            }
        }), [
        api.activeThumbIndex,
        api.adjustValueByStep,
        api.dir,
        api.getValueFromPointer,
        api.handleSlideEnd,
        api.handleSlideMove,
        api.handleSlideStart,
        api.isDragging,
        api.setActiveThumbIndex,
        api.setIsActive,
        api.setIsDragging,
        api.setIsHovered,
        api.setIsPointerDown,
        api.setOpenThumbIndex,
        api.setToEnd,
        api.setToStart,
        api.thumbRefsMap,
        api.updateValues,
        api.values,
        disabled,
        dragStartDelayInMilliseconds,
        isLtr,
        jumpMultiplier,
        readOnly,
        stateProps
    ]);
    const rangeProps = useMemo(()=>{
        const percentages = api.values.map((value)=>convertValueToPercentage(value, api.min, api.max));
        const offsetStart = api.values.length > 1 ? Math.min(...percentages) : 0;
        const offsetEnd = 100 - Math.max(...percentages);
        return elementProps({
            ...stateProps,
            style: {
                "--range-start": `${offsetStart}%`,
                "--range-end": `${offsetEnd}%`
            }
        });
    }, [
        api.values,
        api.min,
        api.max,
        stateProps
    ]);
    const getThumbProps = useCallback((index)=>{
        const value = api.values[index];
        if (value === undefined) return elementProps({});
        const percent = convertValueToPercentage(value, api.min, api.max);
        const thumbInBoundsOffset = getThumbInBoundsOffset(api.firstThumbSize?.width ?? 0, percent, isLtr ? 1 : -1);
        const hasEverBeenShown = getHasEverBeenShown(index);
        return elementProps({
            ...stateProps,
            role: "slider",
            "aria-valuemin": api.min,
            "aria-valuenow": value,
            "aria-valuemax": api.max,
            // "aria-orientation": "horizontal", // this is the default
            ...getAriaValuetext && {
                "aria-valuetext": getAriaValuetext(value)
            },
            ...getAriaLabel && {
                "aria-label": getAriaLabel(index)
            },
            ...getAriaLabelledby && {
                "aria-labelledby": getAriaLabelledby(index)
            },
            ...readOnly && {
                "aria-readonly": true
            },
            ...invalid && {
                "aria-invalid": true
            },
            ...disabled && {
                "aria-disabled": true
            },
            "data-thumb-index": `${index}`,
            "data-thumb-dragging": dataAttr(api.isDragging && api.valueIndexToChangeRef.current === index),
            "data-value-indicator-shown": dataAttr(hasEverBeenShown),
            tabIndex: disabled ? -1 : 0,
            style: {
                "--thumb-position": percent,
                "--thumb-offset": `${thumbInBoundsOffset}px`
            },
            onFocus: ()=>{
                api.valueIndexToChangeRef.current = index;
            },
            onMouseEnter: ()=>{
                if (disabled) return;
                api.setOpenThumbIndex(index);
            },
            onMouseLeave: ()=>{
                // Only close if this thumb is not actively being dragged
                if (!(api.isDragging && api.activeThumbIndex === index)) {
                    api.setOpenThumbIndex(null);
                }
            }
        });
    }, [
        api.activeThumbIndex,
        api.firstThumbSize,
        api.isDragging,
        api.max,
        api.min,
        api.setOpenThumbIndex,
        api.values,
        disabled,
        getAriaLabel,
        getAriaLabelledby,
        getAriaValuetext,
        invalid,
        isLtr,
        readOnly,
        stateProps,
        getHasEverBeenShown
    ]);
    const getHiddenInputProps = useCallback((index)=>{
        const value = api.values[index];
        if (value === undefined) return inputProps({});
        return inputProps({
            type: "hidden",
            value,
            name: name || id,
            disabled,
            readOnly: true
        });
    }, [
        api.values,
        name,
        disabled,
        id
    ]);
    const getThumbRef = useCallback((index)=>(element)=>{
            if (!element) {
                api.thumbRefsMap.current.delete(index);
                return;
            }
            api.thumbRefsMap.current.set(index, element);
        }, []);
    const getTickProps = useCallback((value)=>{
        const percent = convertValueToPercentage(value, api.min, api.max);
        const thumbInBoundsOffset = getThumbInBoundsOffset(api.firstThumbSize?.width ?? 0, percent, 1);
        return elementProps({
            ...stateProps,
            style: {
                "--tick-position": percent,
                "--tick-offset": `${thumbInBoundsOffset}px`
            }
        });
    }, [
        api.min,
        api.max,
        stateProps,
        api.firstThumbSize?.width
    ]);
    const getMarkerProps = useCallback((value)=>{
        const percent = convertValueToPercentage(value, api.min, api.max);
        const isEnd = value === api.min ? "start" : value === api.max ? "end" : false;
        const thumbInBoundsOffset = isEnd === "start" || isEnd === "end" ? 0 : getThumbInBoundsOffset(api.firstThumbSize?.width ?? 0, percent, 1);
        return elementProps({
            ...stateProps,
            "aria-hidden": true,
            style: {
                "--marker-position": percent,
                "--marker-offset": `${thumbInBoundsOffset}px`
            }
        });
    }, [
        api.min,
        api.max,
        stateProps,
        api.firstThumbSize?.width
    ]);
    const getValueIndicatorProps = useCallback((index)=>{
        const value = api.values[index];
        if (value === undefined) return {
            rootProps: elementProps({}),
            labelProps: elementProps({}),
            rootRef: ()=>{}
        };
        const percent = convertValueToPercentage(value, api.min, api.max);
        const indicatorWidth = api.valueIndicatorRootSizes.get(index)?.width ?? 0;
        const trackWidth = api.rootSize?.width ?? 0;
        const thumbWidth = api.firstThumbSize?.width ?? 0;
        // Calculate thumb offset for arrow (arrow should follow thumb position)
        const thumbInBoundsOffset = getThumbInBoundsOffset(thumbWidth, percent, 1);
        // Use sticky offset calculation for value indicator root (accounting for thumb offset)
        // Must use the same direction as thumbInBoundsOffset for correct arrow positioning
        const indicatorOffset = getStickyLabelOffset(indicatorWidth, percent, thumbWidth, trackWidth, 1);
        // Visibility logic by trigger mode:
        // - 'active' (default): ONLY show when dragging
        // - 'hover': Show when hovering OR dragging
        const isShown = (()=>{
            switch(valueIndicatorTrigger){
                case "hover":
                    return api.openThumbIndex === index || api.isDragging && api.valueIndexToChangeRef.current === index;
                case "active":
                    return api.isDragging && api.valueIndexToChangeRef.current === index;
            }
        })();
        const hasEverBeenShown = getHasEverBeenShown(index);
        if (isShown && !hasEverBeenShown) {
            setTimeout(()=>api.setShownIndicators((prev)=>new Set(prev).add(index)), 0);
        }
        return {
            rootProps: elementProps({
                ...stateProps,
                "aria-hidden": true,
                "data-thumb-dragging": dataAttr(api.isDragging && api.valueIndexToChangeRef.current === index),
                "data-value-indicator-shown": dataAttr(isShown),
                "data-indicator-ever-shown": dataAttr(hasEverBeenShown),
                style: {
                    "--indicator-label-position": percent,
                    "--indicator-label-offset": `${indicatorOffset}px`,
                    "--thumb-offset": `${thumbInBoundsOffset}px`
                }
            }),
            labelProps: elementProps({
                children: getValueIndicatorLabel({
                    value,
                    thumbIndex: index
                })
            }),
            rootRef: (node)=>{
                api.valueIndicatorRootRefsMap.current.set(index, node);
            }
        };
    }, [
        api.isDragging,
        api.max,
        api.min,
        api.openThumbIndex,
        api.setShownIndicators,
        api.values,
        api.valueIndicatorRootSizes,
        api.valueIndexToChangeRef,
        api.rootSize?.width,
        api.firstThumbSize?.width,
        getValueIndicatorLabel,
        stateProps,
        valueIndicatorTrigger,
        getHasEverBeenShown
    ]);
    return {
        min: api.min,
        max: api.max,
        step: api.step,
        allowedValues: api.allowedValues,
        values: api.values,
        disabled,
        invalid,
        readOnly,
        refs: api.refs,
        isDragging: api.isDragging,
        rootProps,
        rangeProps,
        getThumbProps,
        getThumbRef,
        getHiddenInputProps,
        getTickProps,
        getMarkerProps,
        getValueIndicatorProps,
        // this is used to style the track
        stateProps,
        updateValues: api.updateValues
    };
}

const SliderContext = /*#__PURE__*/ createContext(null);
const SliderProvider = SliderContext.Provider;
function useSliderContext({ strict = true } = {}) {
    const context = useContext(SliderContext);
    if (!context && strict) {
        throw new Error("useSliderContext must be used within a Slider");
    }
    return context;
}

const SliderRoot = /*#__PURE__*/ React.forwardRef(({ allowedValues, defaultValues, dir, disabled, dragStartDelayInMilliseconds, getAriaLabel, getAriaValuetext, getAriaLabelledby, getValueIndicatorLabel, valueIndicatorTrigger, invalid, max, min, minStepsBetweenThumbs, jumpMultiplier, name, onValuesChange, onValuesCommit, readOnly, step, values, ...props }, ref)=>{
    const api = useSlider({
        allowedValues,
        defaultValues,
        dir,
        disabled,
        dragStartDelayInMilliseconds,
        getAriaLabel,
        getAriaValuetext,
        getAriaLabelledby,
        getValueIndicatorLabel,
        valueIndicatorTrigger,
        invalid,
        max,
        min,
        minStepsBetweenThumbs,
        jumpMultiplier,
        name,
        onValuesChange,
        onValuesCommit,
        readOnly,
        step,
        values
    });
    return /*#__PURE__*/ jsx(SliderProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: composeRefs(ref, api.refs.root),
            ...mergeProps(api.rootProps, props)
        })
    });
});
SliderRoot.displayName = "SliderRoot";
const SliderRange = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { rangeProps } = useSliderContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(rangeProps, props)
    });
});
SliderRange.displayName = "SliderRange";
const SliderThumb = /*#__PURE__*/ React.forwardRef(({ thumbIndex, ...props }, ref)=>{
    const { getThumbProps, getThumbRef } = useSliderContext();
    const composedRef = composeRefs(ref, getThumbRef(thumbIndex));
    const thumbProps = getThumbProps(thumbIndex);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composedRef,
        ...mergeProps(thumbProps, props)
    });
});
SliderThumb.displayName = "SliderThumb";
const SliderHiddenInput = /*#__PURE__*/ React.forwardRef(({ thumbIndex, ...props }, ref)=>{
    const { getHiddenInputProps } = useSliderContext();
    const hiddenInputProps = getHiddenInputProps(thumbIndex);
    return /*#__PURE__*/ jsx(Primitive.input, {
        ref: ref,
        ...mergeProps(hiddenInputProps, props)
    });
});
SliderHiddenInput.displayName = "SliderHiddenInput";
const SliderTick = /*#__PURE__*/ React.forwardRef(({ value, ...props }, ref)=>{
    const { getTickProps } = useSliderContext();
    const tickProps = getTickProps(value);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(tickProps, props)
    });
});
SliderTick.displayName = "SliderTick";
const SliderMarker = /*#__PURE__*/ React.forwardRef(({ value, ...props }, ref)=>{
    const { getMarkerProps } = useSliderContext();
    const markerProps = getMarkerProps(value);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(markerProps, props)
    });
});
SliderMarker.displayName = "SliderMarker";
const SliderValueIndicatorRoot = /*#__PURE__*/ React.forwardRef(({ thumbIndex, ...props }, ref)=>{
    const { getValueIndicatorProps } = useSliderContext();
    const { rootProps, rootRef } = getValueIndicatorProps(thumbIndex);
    const composedRef = composeRefs(ref, rootRef);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composedRef,
        ...mergeProps(rootProps, props)
    });
});
SliderValueIndicatorRoot.displayName = "SliderValueIndicatorRoot";
const SliderValueIndicatorLabel = /*#__PURE__*/ React.forwardRef(({ thumbIndex, ...props }, ref)=>{
    const { getValueIndicatorProps } = useSliderContext();
    const { labelProps } = getValueIndicatorProps(thumbIndex);
    return /*#__PURE__*/ jsx(Primitive.span, {
        ref: ref,
        ...mergeProps(labelProps, props)
    });
});
SliderValueIndicatorLabel.displayName = "SliderValueIndicatorLabel";

export { SliderHiddenInput as S, SliderMarker as a, SliderRange as b, SliderRoot as c, SliderThumb as d, SliderTick as e, SliderValueIndicatorLabel as f, SliderValueIndicatorRoot as g, useSliderContext as u };
