'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grape-design/dom-utils');
var reactPrimitive = require('@grape-design/react-primitive');
var react = require('react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');
var reactFieldset = require('@grape-design/react-fieldset');
var reactSupports = require('@grape-design/react-supports');

function useRadioGroupState(props) {
    const [value, setValue] = reactUseControllableState.useControllableState({
        prop: props.value,
        defaultProp: props.defaultValue,
        onChange: props.onValueChange
    });
    const [hoveredValue, setHoveredValue] = react.useState(null);
    const [activeValue, setActiveValue] = react.useState(null);
    const [focusedValue, setFocusedValue] = react.useState(null);
    const [isFocusVisible, setIsFocusVisible] = react.useState(false);
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
    const fieldset = reactFieldset.useFieldset();
    const stateProps = domUtils.elementProps({
        "data-disabled": domUtils.dataAttr(disabled),
        "data-invalid": domUtils.dataAttr(invalid)
    });
    const { value, setValue, hoveredValue, setHoveredValue, activeValue, setActiveValue, focusedValue, setFocusedValue, isFocusVisible, setIsFocusVisible } = useRadioGroupState(props);
    const isControlled = props.value !== undefined;
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    return {
        value,
        setValue,
        refs: fieldset.refs,
        invalid,
        stateProps,
        rootProps: domUtils.elementProps({
            ...fieldset.rootProps,
            ...stateProps,
            // fieldset.rootProps gives role="group"
            // see: https://w3c.github.io/aria/#radiogroup
            role: "radiogroup",
            "aria-invalid": domUtils.ariaAttr(invalid),
            "aria-disabled": domUtils.ariaAttr(disabled)
        }),
        labelProps: domUtils.elementProps({
            ...fieldset.labelProps,
            ...stateProps
        }),
        descriptionProps: domUtils.elementProps({
            ...fieldset.descriptionProps,
            ...stateProps
        }),
        errorMessageProps: domUtils.elementProps({
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
            const itemStateProps = domUtils.elementProps({
                "data-focus": domUtils.dataAttr(itemState.focused),
                "data-focus-visible": domUtils.dataAttr(itemState.focused && isFocusVisible),
                "data-disabled": domUtils.dataAttr(itemState.disabled),
                "data-checked": domUtils.dataAttr(itemState.checked),
                "data-active": domUtils.dataAttr(itemState.active),
                "data-hover": domUtils.dataAttr(itemState.hovered)
            });
            return {
                ...itemState,
                setFocusedValue,
                setIsFocusVisible,
                stateProps: itemStateProps,
                rootProps: domUtils.elementProps({
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
                controlProps: domUtils.elementProps({
                    "aria-hidden": true,
                    ...itemStateProps
                }),
                hiddenInputProps: domUtils.inputProps({
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
                    style: domUtils.visuallyHidden
                })
            };
        }
    };
}

const RadioGroupContext = /*#__PURE__*/ react.createContext(null);
const RadioGroupProvider = RadioGroupContext.Provider;
function useRadioGroupContext({ strict = true } = {}) {
    const context = react.useContext(RadioGroupContext);
    if (!context && strict) {
        throw new Error("useRadioGroupContext must be used within a RadioGroup");
    }
    return context;
}

const RadioGroupItemContext = /*#__PURE__*/ react.createContext(null);
const RadioGroupItemProvider = RadioGroupItemContext.Provider;
function useRadioGroupItemContext({ strict = true } = {}) {
    const context = react.useContext(RadioGroupItemContext);
    if (!context && strict) {
        throw new Error("useRadioGroupItemContext must be used within a RadioGroupItem");
    }
    return context;
}

const RadioGroupRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
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
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(RadioGroupProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
RadioGroupRoot.displayName = "RadioGroupRoot";
const RadioGroupLabel = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, labelProps } = useRadioGroupContext();
    const mergedProps = domUtils.mergeProps(labelProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(refs.label, ref),
        ...mergedProps
    });
});
RadioGroupLabel.displayName = "RadioGroupLabel";
const RadioGroupItem = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { value, disabled, ...otherProps } = props;
    const { getItemProps } = useRadioGroupContext();
    const itemProps = getItemProps({
        value,
        disabled
    });
    const mergedProps = domUtils.mergeProps(itemProps.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(RadioGroupItemProvider, {
        value: itemProps,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
RadioGroupItem.displayName = "RadioGroupItem";
const RadioGroupItemControl = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { controlProps } = useRadioGroupItemContext();
    const mergedProps = domUtils.mergeProps(controlProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
RadioGroupItemControl.displayName = "RadioGroupItemControl";
const RadioGroupItemHiddenInput = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { hiddenInputProps } = useRadioGroupItemContext();
    const mergedProps = domUtils.mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
RadioGroupItemHiddenInput.displayName = "RadioGroupItemHiddenInput";
const RadioGroupDescription = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useRadioGroupContext();
    const mergedProps = domUtils.mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.span, {
        ref: reactComposeRefs.composeRefs(refs.description, ref),
        ...mergedProps
    });
});
RadioGroupDescription.displayName = "RadioGroupDescription";
const RadioGroupErrorMessage = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useRadioGroupContext();
    const mergedProps = domUtils.mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
RadioGroupErrorMessage.displayName = "RadioGroupErrorMessage";

exports.RadioGroupDescription = RadioGroupDescription;
exports.RadioGroupErrorMessage = RadioGroupErrorMessage;
exports.RadioGroupItem = RadioGroupItem;
exports.RadioGroupItemControl = RadioGroupItemControl;
exports.RadioGroupItemHiddenInput = RadioGroupItemHiddenInput;
exports.RadioGroupLabel = RadioGroupLabel;
exports.RadioGroupRoot = RadioGroupRoot;
exports.useRadioGroupContext = useRadioGroupContext;
exports.useRadioGroupItemContext = useRadioGroupItemContext;
