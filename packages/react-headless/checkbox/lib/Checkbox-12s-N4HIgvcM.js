'use client';
import { jsx } from 'react/jsx-runtime';
import { elementProps, dataAttr, inputProps, visuallyHidden, labelProps, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { useState, useRef, useEffect, createContext, useContext, forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useSupports } from '@grape-design/react-supports';
import { composeRefs } from '@radix-ui/react-compose-refs';

function useCheckboxState(props) {
    const [isChecked = false, setIsChecked] = useControllableState({
        prop: props.checked,
        defaultProp: props.defaultChecked,
        onChange: props.onCheckedChange
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const inputRef = useRef(null);
    const initialCheckedRef = useRef(isChecked);
    useEffect(()=>{
        const form = inputRef.current?.form;
        if (form) {
            const reset = ()=>setIsChecked(initialCheckedRef.current);
            form.addEventListener("reset", reset);
            return ()=>form.removeEventListener("reset", reset);
        }
    }, [
        setIsChecked
    ]);
    useEffect(()=>{
        if (!inputRef.current) return;
        inputRef.current.indeterminate = props.indeterminate ?? false;
    }, [
        props.indeterminate
    ]);
    return {
        refs: {
            input: inputRef
        },
        isIndeterminate: props.indeterminate ?? false,
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
function useCheckbox(props) {
    const { refs, isIndeterminate, setIsChecked, isChecked, setIsHovered, isHovered, setIsActive, isActive, setIsFocused, isFocused, setIsFocusVisible, isFocusVisible } = useCheckboxState(props);
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    const stateProps = elementProps({
        "data-checked": dataAttr(isChecked),
        "data-indeterminate": dataAttr(isIndeterminate),
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
        indeterminate: isIndeterminate,
        checked: isChecked,
        setChecked: setIsChecked,
        focused: isFocused,
        setFocused: setIsFocused,
        focusVisible: isFocusVisible,
        setFocusVisible: setIsFocusVisible,
        refs,
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
        hiddenInputProps: inputProps({
            type: "checkbox",
            role: "checkbox",
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

const CheckboxContext = /*#__PURE__*/ createContext(null);
const CheckboxProvider = CheckboxContext.Provider;
function useCheckboxContext({ strict = true } = {}) {
    const context = useContext(CheckboxContext);
    if (!context && strict) {
        throw new Error("useCheckboxContext must be used within a Checkbox");
    }
    return context;
}

const CheckboxRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { checked, defaultChecked, onCheckedChange, indeterminate, disabled, invalid, required, ...otherProps } = props;
    const api = useCheckbox({
        checked,
        defaultChecked,
        onCheckedChange,
        indeterminate,
        disabled,
        invalid,
        required
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(CheckboxProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
CheckboxRoot.displayName = "CheckboxRoot";
const CheckboxControl = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { controlProps } = useCheckboxContext();
    const mergedProps = mergeProps(controlProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
CheckboxControl.displayName = "CheckboxControl";
const CheckboxHiddenInput = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, hiddenInputProps } = useCheckboxContext();
    const mergedProps = mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsx(Primitive.input, {
        ref: composeRefs(refs.input, ref),
        ...mergedProps
    });
});
CheckboxHiddenInput.displayName = "CheckboxHiddenInput";

export { CheckboxControl as C, CheckboxHiddenInput as a, CheckboxRoot as b, useCheckboxContext as u };
