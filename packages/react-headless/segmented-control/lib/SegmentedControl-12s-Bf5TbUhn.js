'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, inputProps, visuallyHidden, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import * as React from 'react';
import { useId, useState, useMemo, createContext, useContext } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useSupports } from '@grape-design/react-supports';

/* Utils -----------------------------------------------------------------------
-------------------------------------------------------------------------------- */ const getAllValues = (el)=>{
    return Array.from(el.children).map((child)=>child.getAttribute("data-value")).filter(Boolean);
};
const getSegmentIndex = (value, el)=>{
    const values = getAllValues(el);
    return values.indexOf(value);
};

function useSegmentedControlState(props) {
    const [value, setValue] = useControllableState({
        prop: props.value,
        defaultProp: props.defaultValue,
        onChange: props.onValueChange
    });
    const [hoveredValue, setHoveredValue] = useState(null);
    const [activeValue, setActiveValue] = useState(null);
    const [focusedValue, setFocusedValue] = useState(null);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [rootEl, setRootEl] = useState(null);
    const segmentCount = useMemo(()=>{
        return rootEl ? getAllValues(rootEl).length : 0;
    }, [
        rootEl
    ]);
    const segmentIndex = useMemo(()=>{
        return value && rootEl ? getSegmentIndex(value, rootEl) : -1;
    }, [
        value,
        rootEl
    ]);
    return {
        refs: {
            root: setRootEl
        },
        value,
        setValue,
        hoveredValue,
        setHoveredValue,
        activeValue,
        setActiveValue,
        focusedValue,
        setFocusedValue,
        isFocusVisible,
        setIsFocusVisible,
        segmentCount,
        segmentIndex
    };
}
function useSegmentedControl(props) {
    const id = useId();
    const { refs, value, setValue, hoveredValue, setHoveredValue, activeValue, setActiveValue, focusedValue, setFocusedValue, isFocusVisible, setIsFocusVisible, segmentCount, segmentIndex } = useSegmentedControlState(props);
    const { disabled, form, name } = props;
    const isControlled = props.value !== undefined;
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    const stateProps = elementProps({
        "data-disabled": dataAttr(disabled)
    });
    return {
        value,
        setValue,
        refs,
        stateProps,
        rootProps: elementProps({
            role: "radiogroup",
            ...stateProps,
            style: {
                "--segment-index": segmentIndex.toString(),
                "--segment-count": segmentCount.toString()
            }
        }),
        getItemProps (itemProps) {
            const { value: itemValue, disabled: itemDisabled, invalid: itemInvalid } = itemProps;
            const itemState = {
                invalid: !!itemInvalid,
                disabled: !!itemDisabled || disabled,
                checked: value === itemValue,
                focused: focusedValue === itemValue,
                hovered: hoveredValue === itemValue,
                active: activeValue === itemValue
            };
            const itemStateProps = elementProps({
                "data-focus": dataAttr(itemState.focused),
                "data-focus-visible": dataAttr(itemState.focused && isFocusVisible),
                "data-disabled": dataAttr(itemState.disabled),
                "data-checked": dataAttr(itemState.checked),
                "data-active": dataAttr(itemState.active),
                "data-hover": dataAttr(itemState.hovered),
                "data-invalid": dataAttr(itemState.invalid),
                "data-value": itemValue
            });
            return {
                ...itemState,
                setFocusedValue,
                setIsFocusVisible,
                stateProps: itemStateProps,
                rootProps: elementProps({
                    ...itemStateProps,
                    onPointerMove () {
                        if (itemState.disabled) return;
                        setHoveredValue(itemProps.value);
                    },
                    onPointerLeave () {
                        if (itemState.disabled) return;
                        setHoveredValue(null);
                        setActiveValue(null);
                    },
                    onPointerDown (event) {
                        if (itemState.disabled) return;
                        // On pointerdown, the input blurs and returns focus to the `body`,
                        // we need to prevent this.
                        if (itemState.focused && event.pointerType === "mouse") {
                            event.preventDefault();
                        }
                        setActiveValue(itemProps.value);
                    },
                    onPointerUp () {
                        if (itemState.disabled) return;
                        setActiveValue(null);
                    }
                }),
                hiddenInputProps: inputProps({
                    type: "radio",
                    name: name || id,
                    form,
                    value: itemProps.value,
                    onChange (event) {
                        if (itemState.disabled) return;
                        if (event.target.checked) {
                            setValue(itemProps.value);
                        }
                        if (isFocusVisibleSupported) {
                            setIsFocusVisible(event.target.matches(":focus-visible"));
                        }
                    },
                    onBlur () {
                        setFocusedValue(null);
                        if (isFocusVisibleSupported) {
                            setIsFocusVisible(false);
                        }
                    },
                    onFocus (event) {
                        setFocusedValue(itemProps.value);
                        if (isFocusVisibleSupported) {
                            setIsFocusVisible(event.target.matches(":focus-visible"));
                        }
                    },
                    onKeyDown (event) {
                        if (event.key === " ") {
                            setActiveValue(itemProps.value);
                        }
                    },
                    onKeyUp (event) {
                        if (event.key === " ") {
                            setActiveValue(null);
                        }
                    },
                    disabled: itemState.disabled,
                    ...isControlled && {
                        checked: itemState.checked
                    },
                    ...!isControlled && {
                        defaultChecked: itemState.checked
                    },
                    style: visuallyHidden
                })
            };
        }
    };
}

const SegmentedControlContext = /*#__PURE__*/ createContext(null);
const SegmentedControlProvider = SegmentedControlContext.Provider;
function useSegmentedControlContext({ strict = true } = {}) {
    const context = useContext(SegmentedControlContext);
    if (!context && strict) {
        throw new Error("useSegmentedControlContext must be used within a SegmentedControl");
    }
    return context;
}

const SegmentedControlItemContext = /*#__PURE__*/ createContext(null);
const SegmentedControlItemProvider = SegmentedControlItemContext.Provider;
function useSegmentedControlItemContext({ strict = true } = {}) {
    const context = useContext(SegmentedControlItemContext);
    if (!context && strict) {
        throw new Error("useSegmentedControlItemContext must be used within a SegmentedControlItem");
    }
    return context;
}

const SegmentedControlRoot = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { value, defaultValue, onValueChange, form, name, disabled, ...otherProps } = props;
    const api = useSegmentedControl({
        value,
        defaultValue,
        onValueChange,
        disabled,
        form,
        name
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(SegmentedControlProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: composeRefs(ref, api.refs.root),
            ...mergedProps
        })
    });
});
SegmentedControlRoot.displayName = "SegmentedControl";
const SegmentedControlItem = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { value, invalid, disabled, ...otherProps } = props;
    const { getItemProps } = useSegmentedControlContext();
    const itemProps = getItemProps({
        value,
        disabled,
        invalid
    });
    const mergedProps = mergeProps(itemProps.rootProps, otherProps);
    return /*#__PURE__*/ jsx(SegmentedControlItemProvider, {
        value: itemProps,
        children: /*#__PURE__*/ jsx(Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
SegmentedControlItem.displayName = "SegmentedControlItem";
const SegmentedControlItemHiddenInput = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { hiddenInputProps } = useSegmentedControlItemContext();
    const mergedProps = mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsx(Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
SegmentedControlItemHiddenInput.displayName = "SegmentedControlItemHiddenInput";

export { SegmentedControlItem as S, SegmentedControlItemHiddenInput as a, SegmentedControlRoot as b, useSegmentedControlItemContext as c, useSegmentedControlContext as u };
