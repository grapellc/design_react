'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, inputProps, visuallyHidden, ariaAttr, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import { useState, createContext, useContext, forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useFieldset } from '@grapu-design/react-fieldset';
import { useSupports } from '@grapu-design/react-supports';

function useRadioGroupState(props) {
    const [value, setValue] = useControllableState({
        prop: props.value,
        defaultProp: props.defaultValue,
        onChange: props.onValueChange
    });
    const [hoveredValue, setHoveredValue] = useState(null);
    const [activeValue, setActiveValue] = useState(null);
    const [focusedValue, setFocusedValue] = useState(null);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    return {
        value,
        setValue,
        hoveredValue,
        setHoveredValue,
        activeValue,
        setActiveValue,
        focusedValue,
        setFocusedValue,
        isFocusVisible,
        setIsFocusVisible
    };
}
function useRadioGroup(props) {
    const { disabled = false, invalid = false, form, name } = props;
    const fieldset = useFieldset();
    const stateProps = elementProps({
        "data-disabled": dataAttr(disabled),
        "data-invalid": dataAttr(invalid)
    });
    const { value, setValue, hoveredValue, setHoveredValue, activeValue, setActiveValue, focusedValue, setFocusedValue, isFocusVisible, setIsFocusVisible } = useRadioGroupState(props);
    const isControlled = props.value !== undefined;
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    return {
        value,
        setValue,
        refs: fieldset.refs,
        invalid,
        stateProps,
        rootProps: elementProps({
            ...fieldset.rootProps,
            ...stateProps,
            // fieldset.rootProps gives role="group"
            // see: https://w3c.github.io/aria/#radiogroup
            role: "radiogroup",
            "aria-invalid": ariaAttr(invalid),
            "aria-disabled": ariaAttr(disabled)
        }),
        labelProps: elementProps({
            ...fieldset.labelProps,
            ...stateProps
        }),
        descriptionProps: elementProps({
            ...fieldset.descriptionProps,
            ...stateProps
        }),
        errorMessageProps: elementProps({
            ...fieldset.errorMessageProps,
            ...stateProps
        }),
        getItemProps (itemProps) {
            const { value: itemValue, disabled: itemDisabled } = itemProps;
            const itemState = {
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
                "data-hover": dataAttr(itemState.hovered)
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
                controlProps: elementProps({
                    "aria-hidden": true,
                    ...itemStateProps
                }),
                hiddenInputProps: inputProps({
                    type: "radio",
                    name: name || fieldset.id,
                    form: form,
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
                    defaultChecked: isControlled ? undefined : itemState.checked,
                    checked: isControlled ? itemState.checked : undefined,
                    style: visuallyHidden
                })
            };
        }
    };
}

const RadioGroupContext = /*#__PURE__*/ createContext(null);
const RadioGroupProvider = RadioGroupContext.Provider;
function useRadioGroupContext({ strict = true } = {}) {
    const context = useContext(RadioGroupContext);
    if (!context && strict) {
        throw new Error("useRadioGroupContext must be used within a RadioGroup");
    }
    return context;
}

const RadioGroupItemContext = /*#__PURE__*/ createContext(null);
const RadioGroupItemProvider = RadioGroupItemContext.Provider;
function useRadioGroupItemContext({ strict = true } = {}) {
    const context = useContext(RadioGroupItemContext);
    if (!context && strict) {
        throw new Error("useRadioGroupItemContext must be used within a RadioGroupItem");
    }
    return context;
}

const RadioGroupRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { value, defaultValue, onValueChange, form, name, disabled, invalid, ...otherProps } = props;
    const api = useRadioGroup({
        value,
        defaultValue,
        onValueChange,
        form,
        name,
        disabled,
        invalid
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(RadioGroupProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
RadioGroupRoot.displayName = "RadioGroupRoot";
const RadioGroupLabel = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, labelProps } = useRadioGroupContext();
    const mergedProps = mergeProps(labelProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(refs.label, ref),
        ...mergedProps
    });
});
RadioGroupLabel.displayName = "RadioGroupLabel";
const RadioGroupItem = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { value, disabled, ...otherProps } = props;
    const { getItemProps } = useRadioGroupContext();
    const itemProps = getItemProps({
        value,
        disabled
    });
    const mergedProps = mergeProps(itemProps.rootProps, otherProps);
    return /*#__PURE__*/ jsx(RadioGroupItemProvider, {
        value: itemProps,
        children: /*#__PURE__*/ jsx(Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
RadioGroupItem.displayName = "RadioGroupItem";
const RadioGroupItemControl = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { controlProps } = useRadioGroupItemContext();
    const mergedProps = mergeProps(controlProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
RadioGroupItemControl.displayName = "RadioGroupItemControl";
const RadioGroupItemHiddenInput = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { hiddenInputProps } = useRadioGroupItemContext();
    const mergedProps = mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsx(Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
RadioGroupItemHiddenInput.displayName = "RadioGroupItemHiddenInput";
const RadioGroupDescription = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useRadioGroupContext();
    const mergedProps = mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsx(Primitive.span, {
        ref: composeRefs(refs.description, ref),
        ...mergedProps
    });
});
RadioGroupDescription.displayName = "RadioGroupDescription";
const RadioGroupErrorMessage = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useRadioGroupContext();
    const mergedProps = mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
RadioGroupErrorMessage.displayName = "RadioGroupErrorMessage";

export { RadioGroupDescription as R, RadioGroupErrorMessage as a, RadioGroupItem as b, RadioGroupItemControl as c, RadioGroupItemHiddenInput as d, RadioGroupLabel as e, RadioGroupRoot as f, useRadioGroupItemContext as g, useRadioGroupContext as u };
