'use client';
var jsxRuntime = require('react/jsx-runtime');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var react = require('react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');
var reactSupports = require('@grapu-design/react-supports');

function useTextFieldState({ value: __value, defaultValue, onValueChange }) {
    const [value, setValue] = reactUseControllableState.useControllableState({
        prop: __value,
        defaultProp: defaultValue ?? "",
        onChange: onValueChange
    });
    const [isHovered, setIsHovered] = react.useState(false);
    const [isActive, setIsActive] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const [isFocusVisible, setIsFocusVisible] = react.useState(false);
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
    const id = react.useId();
    const { value: propValue, defaultValue, onValueChange, disabled = false, invalid = false, readOnly = false, required = false } = props;
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    const { value: stateValue, isHovered, isActive, isFocused, isFocusVisible, setValue, setIsHovered, setIsActive, setIsFocused, setIsFocusVisible } = useTextFieldState({
        value: propValue,
        defaultValue,
        onValueChange
    });
    const isUncontrolled = propValue === undefined;
    const stateProps = domUtils.elementProps({
        "data-hover": domUtils.dataAttr(isHovered),
        "data-active": domUtils.dataAttr(isActive),
        "data-focus": domUtils.dataAttr(isFocused),
        "data-focus-visible": domUtils.dataAttr(isFocusVisible),
        "data-readonly": domUtils.dataAttr(readOnly),
        "data-disabled": domUtils.dataAttr(disabled),
        "data-invalid": domUtils.dataAttr(invalid),
        "data-empty": domUtils.dataAttr(stateValue === "")
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
        rootProps: domUtils.elementProps({
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
        inputProps: domUtils.inputProps({
            ...stateProps,
            ...isUncontrolled && defaultValue && {
                defaultValue
            },
            ...!isUncontrolled && {
                value: stateValue
            },
            "aria-required": domUtils.ariaAttr(required),
            "aria-invalid": domUtils.ariaAttr(invalid),
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

const TextFieldContext = /*#__PURE__*/ react.createContext(null);
const TextFieldProvider = TextFieldContext.Provider;
function useTextFieldContext({ strict = true } = {}) {
    const context = react.useContext(TextFieldContext);
    if (!context && strict) {
        throw new Error("useTextFieldContext must be used within a TextField");
    }
    return context;
}

const TextFieldRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
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
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(TextFieldProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
TextFieldRoot.displayName = "TextFieldRoot";
const TextFieldInput = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { inputProps } = useTextFieldContext();
    const mergedProps = domUtils.mergeProps(inputProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
TextFieldInput.displayName = "TextFieldInput";
const TextFieldTextarea = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { inputProps } = useTextFieldContext();
    const mergedProps = domUtils.mergeProps(inputProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.textarea, {
        ref: ref,
        ...mergedProps
    });
});
TextFieldTextarea.displayName = "TextFieldTextarea";

exports.TextFieldInput = TextFieldInput;
exports.TextFieldRoot = TextFieldRoot;
exports.TextFieldTextarea = TextFieldTextarea;
exports.useTextFieldContext = useTextFieldContext;
