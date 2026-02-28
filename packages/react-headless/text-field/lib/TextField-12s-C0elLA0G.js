'use client';
import { jsx } from 'react/jsx-runtime';
import { elementProps, dataAttr, inputProps, ariaAttr, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { useId, useState, createContext, useContext, forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useSupports } from '@grape-design/react-supports';

function useTextFieldState({ value: __value, defaultValue, onValueChange }) {
    const [value, setValue] = useControllableState({
        prop: __value,
        defaultProp: defaultValue ?? "",
        onChange: onValueChange
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    return {
        value,
        isHovered,
        isActive,
        isFocused,
        isFocusVisible,
        setValue,
        setIsHovered,
        setIsActive,
        setIsFocused,
        setIsFocusVisible
    };
}
function useTextField(props) {
    const id = useId();
    const { value: propValue, defaultValue, onValueChange, disabled = false, invalid = false, readOnly = false, required = false } = props;
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    const { value: stateValue, isHovered, isActive, isFocused, isFocusVisible, setValue, setIsHovered, setIsActive, setIsFocused, setIsFocusVisible } = useTextFieldState({
        value: propValue,
        defaultValue,
        onValueChange
    });
    const isUncontrolled = propValue === undefined;
    const stateProps = elementProps({
        "data-hover": dataAttr(isHovered),
        "data-active": dataAttr(isActive),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-readonly": dataAttr(readOnly),
        "data-disabled": dataAttr(disabled),
        "data-invalid": dataAttr(invalid),
        "data-empty": dataAttr(stateValue === "")
    });
    return {
        value: stateValue,
        active: isActive,
        focused: isFocused,
        invalid,
        required,
        setIsFocused,
        setIsFocusVisible,
        stateProps,
        rootProps: elementProps({
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
        inputProps: inputProps({
            ...stateProps,
            ...isUncontrolled && defaultValue && {
                defaultValue
            },
            ...!isUncontrolled && {
                value: stateValue
            },
            "aria-required": ariaAttr(required),
            "aria-invalid": ariaAttr(invalid),
            disabled,
            readOnly,
            name: props.name || id,
            onChange: (event)=>{
                setValue(event.target.value);
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
            onFocus (event) {
                setIsFocused(true);
                if (isFocusVisibleSupported) {
                    setIsFocusVisible(event.target.matches(":focus-visible"));
                }
            }
        })
    };
}

const TextFieldContext = /*#__PURE__*/ createContext(null);
const TextFieldProvider = TextFieldContext.Provider;
function useTextFieldContext({ strict = true } = {}) {
    const context = useContext(TextFieldContext);
    if (!context && strict) {
        throw new Error("useTextFieldContext must be used within a TextField");
    }
    return context;
}

const TextFieldRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { value, defaultValue, onValueChange, readOnly, disabled, invalid, required, name, ...otherProps } = props;
    const api = useTextField({
        value,
        defaultValue,
        onValueChange,
        disabled,
        invalid,
        required,
        readOnly,
        name
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(TextFieldProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
TextFieldRoot.displayName = "TextFieldRoot";
const TextFieldInput = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { inputProps } = useTextFieldContext();
    const mergedProps = mergeProps(inputProps, props);
    return /*#__PURE__*/ jsx(Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
TextFieldInput.displayName = "TextFieldInput";
const TextFieldTextarea = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { inputProps } = useTextFieldContext();
    const mergedProps = mergeProps(inputProps, props);
    return /*#__PURE__*/ jsx(Primitive.textarea, {
        ref: ref,
        ...mergedProps
    });
});
TextFieldTextarea.displayName = "TextFieldTextarea";

export { TextFieldInput as T, TextFieldRoot as a, TextFieldTextarea as b, useTextFieldContext as u };
