'use client';
var jsxRuntime = require('react/jsx-runtime');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var react = require('react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');
var reactSupports = require('@grapu-design/react-supports');

function useSwitchState(props) {
    const [isChecked, setIsChecked] = reactUseControllableState.useControllableState({
        prop: props.checked,
        defaultProp: props.defaultChecked,
        onChange: props.onCheckedChange
    });
    const [isHovered, setIsHovered] = react.useState(false);
    const [isActive, setIsActive] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const [isFocusVisible, setIsFocusVisible] = react.useState(false);
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
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    const stateProps = domUtils.elementProps({
        "data-checked": domUtils.dataAttr(isChecked),
        "data-hover": domUtils.dataAttr(isHovered),
        "data-active": domUtils.dataAttr(isActive),
        "data-focus": domUtils.dataAttr(isFocused),
        "data-focus-visible": domUtils.dataAttr(isFocusVisible),
        "data-disabled": domUtils.dataAttr(props.disabled),
        "data-invalid": domUtils.dataAttr(props.invalid),
        "data-required": domUtils.dataAttr(props.required)
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
        rootProps: domUtils.labelProps({
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
        controlProps: domUtils.elementProps({
            ...stateProps,
            "aria-hidden": true
        }),
        thumbProps: domUtils.elementProps({
            ...stateProps,
            "aria-hidden": true
        }),
        hiddenInputProps: domUtils.inputProps({
            type: "checkbox",
            role: "switch",
            checked: isControlled ? isChecked : undefined,
            defaultChecked: !isControlled ? isChecked : undefined,
            disabled: props.disabled,
            required: props.required,
            "aria-invalid": props.invalid,
            style: domUtils.visuallyHidden,
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

const SwitchContext = /*#__PURE__*/ react.createContext(null);
const SwitchProvider = SwitchContext.Provider;
function useSwitchContext({ strict = true } = {}) {
    const context = react.useContext(SwitchContext);
    if (!context && strict) {
        throw new Error("useSwitchContext must be used within a Switch");
    }
    return context;
}

const SwitchRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { checked, defaultChecked, disabled, invalid, onCheckedChange, required, ...otherProps } = props;
    const api = useSwitch({
        checked,
        defaultChecked,
        disabled,
        invalid,
        onCheckedChange,
        required
    });
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(SwitchProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
SwitchRoot.displayName = "SwitchRoot";
const SwitchControl = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { controlProps } = useSwitchContext();
    const mergedProps = domUtils.mergeProps(controlProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
SwitchControl.displayName = "SwitchControl";
const SwitchThumb = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { thumbProps } = useSwitchContext();
    const mergedProps = domUtils.mergeProps(thumbProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
SwitchThumb.displayName = "SwitchThumb";
const SwitchHiddenInput = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { hiddenInputProps } = useSwitchContext();
    const mergedProps = domUtils.mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
SwitchHiddenInput.displayName = "SwitchHiddenInput";

exports.SwitchControl = SwitchControl;
exports.SwitchHiddenInput = SwitchHiddenInput;
exports.SwitchRoot = SwitchRoot;
exports.SwitchThumb = SwitchThumb;
exports.useSwitchContext = useSwitchContext;
