'use client';
import { jsx } from 'react/jsx-runtime';
import { elementProps, dataAttr, inputProps, visuallyHidden, labelProps, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import { useState, createContext, useContext, forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useSupports } from '@grapu-design/react-supports';

function useSwitchState(props) {
    const [isChecked, setIsChecked] = useControllableState({
        prop: props.checked,
        defaultProp: props.defaultChecked,
        onChange: props.onCheckedChange
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    return {
        isChecked,
        setIsChecked,
        isHovered,
        setIsHovered,
        isActive,
        setIsActive,
        isFocused,
        setIsFocused,
        isFocusVisible,
        setIsFocusVisible
    };
}
function useSwitch(props) {
    const { setIsChecked, isChecked, setIsHovered, isHovered, setIsActive, isActive, setIsFocused, isFocused, setIsFocusVisible, isFocusVisible } = useSwitchState(props);
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    const stateProps = elementProps({
        "data-checked": dataAttr(isChecked),
        "data-hover": dataAttr(isHovered),
        "data-active": dataAttr(isActive),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(props.disabled),
        "data-invalid": dataAttr(props.invalid),
        "data-required": dataAttr(props.required)
    });
    const isControlled = props.checked != null;
    return {
        checked: isChecked,
        setChecked: setIsChecked,
        focused: isFocused,
        setFocused: setIsFocused,
        focusVisible: isFocusVisible,
        setFocusVisible: setIsFocusVisible,
        stateProps,
        rootProps: labelProps({
            ...stateProps,
            onPointerMove () {
                setIsHovered(true);
            },
            onPointerDown () {
                setIsActive(true);
            },
            onPointerUp () {
                setIsActive(false);
            },
            onPointerLeave () {
                setIsHovered(false);
                setIsActive(false);
            }
        }),
        controlProps: elementProps({
            ...stateProps,
            "aria-hidden": true
        }),
        thumbProps: elementProps({
            ...stateProps,
            "aria-hidden": true
        }),
        hiddenInputProps: inputProps({
            type: "checkbox",
            role: "switch",
            checked: isControlled ? isChecked : undefined,
            defaultChecked: !isControlled ? isChecked : undefined,
            disabled: props.disabled,
            required: props.required,
            "aria-invalid": props.invalid,
            style: visuallyHidden,
            ...stateProps,
            onChange (event) {
                setIsChecked(event.currentTarget.checked);
                if (isFocusVisibleSupported) {
                    setIsFocusVisible(event.target.matches(":focus-visible"));
                }
            },
            onFocus (event) {
                setIsFocused(true);
                if (isFocusVisibleSupported) {
                    setIsFocusVisible(event.target.matches(":focus-visible"));
                }
            },
            onBlur () {
                setIsFocused(false);
                if (isFocusVisibleSupported) {
                    setIsFocusVisible(false);
                }
            },
            onKeyDown (event) {
                if (event.key === " ") {
                    setIsActive(true);
                }
            },
            onKeyUp (event) {
                if (event.key === " ") {
                    setIsActive(false);
                }
            }
        })
    };
}

const SwitchContext = /*#__PURE__*/ createContext(null);
const SwitchProvider = SwitchContext.Provider;
function useSwitchContext({ strict = true } = {}) {
    const context = useContext(SwitchContext);
    if (!context && strict) {
        throw new Error("useSwitchContext must be used within a Switch");
    }
    return context;
}

const SwitchRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { checked, defaultChecked, disabled, invalid, onCheckedChange, required, ...otherProps } = props;
    const api = useSwitch({
        checked,
        defaultChecked,
        disabled,
        invalid,
        onCheckedChange,
        required
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(SwitchProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
SwitchRoot.displayName = "SwitchRoot";
const SwitchControl = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { controlProps } = useSwitchContext();
    const mergedProps = mergeProps(controlProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
SwitchControl.displayName = "SwitchControl";
const SwitchThumb = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { thumbProps } = useSwitchContext();
    const mergedProps = mergeProps(thumbProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
SwitchThumb.displayName = "SwitchThumb";
const SwitchHiddenInput = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { hiddenInputProps } = useSwitchContext();
    const mergedProps = mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsx(Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
SwitchHiddenInput.displayName = "SwitchHiddenInput";

export { SwitchControl as S, SwitchHiddenInput as a, SwitchRoot as b, SwitchThumb as c, useSwitchContext as u };
