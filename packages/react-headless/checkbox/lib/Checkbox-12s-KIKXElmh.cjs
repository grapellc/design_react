'use client';
var jsxRuntime = require('react/jsx-runtime');
var domUtils = require('@grape-design/dom-utils');
var reactPrimitive = require('@grape-design/react-primitive');
var react = require('react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');
var reactSupports = require('@grape-design/react-supports');
var reactComposeRefs = require('@radix-ui/react-compose-refs');

function useCheckboxState(props) {
    const [isChecked = false, setIsChecked] = reactUseControllableState.useControllableState({
        prop: props.checked,
        defaultProp: props.defaultChecked,
        onChange: props.onCheckedChange
    });
    const [isHovered, setIsHovered] = react.useState(false);
    const [isActive, setIsActive] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const [isFocusVisible, setIsFocusVisible] = react.useState(false);
    const inputRef = react.useRef(null);
    const initialCheckedRef = react.useRef(isChecked);
    react.useEffect(()=>{
        const form = inputRef.current?.form;
        if (form) {
            const reset = ()=>setIsChecked(initialCheckedRef.current);
            form.addEventListener("reset", reset);
            return ()=>form.removeEventListener("reset", reset);
        }
    }, [
        setIsChecked
    ]);
    react.useEffect(()=>{
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
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    const stateProps = domUtils.elementProps({
        "data-checked": domUtils.dataAttr(isChecked),
        "data-indeterminate": domUtils.dataAttr(isIndeterminate),
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
        indeterminate: isIndeterminate,
        checked: isChecked,
        setChecked: setIsChecked,
        focused: isFocused,
        setFocused: setIsFocused,
        focusVisible: isFocusVisible,
        setFocusVisible: setIsFocusVisible,
        refs,
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
        hiddenInputProps: domUtils.inputProps({
            type: "checkbox",
            role: "checkbox",
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

const CheckboxContext = /*#__PURE__*/ react.createContext(null);
const CheckboxProvider = CheckboxContext.Provider;
function useCheckboxContext({ strict = true } = {}) {
    const context = react.useContext(CheckboxContext);
    if (!context && strict) {
        throw new Error("useCheckboxContext must be used within a Checkbox");
    }
    return context;
}

const CheckboxRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
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
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(CheckboxProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
CheckboxRoot.displayName = "CheckboxRoot";
const CheckboxControl = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { controlProps } = useCheckboxContext();
    const mergedProps = domUtils.mergeProps(controlProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...mergedProps
    });
});
CheckboxControl.displayName = "CheckboxControl";
const CheckboxHiddenInput = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, hiddenInputProps } = useCheckboxContext();
    const mergedProps = domUtils.mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.input, {
        ref: reactComposeRefs.composeRefs(refs.input, ref),
        ...mergedProps
    });
});
CheckboxHiddenInput.displayName = "CheckboxHiddenInput";

exports.CheckboxControl = CheckboxControl;
exports.CheckboxHiddenInput = CheckboxHiddenInput;
exports.CheckboxRoot = CheckboxRoot;
exports.useCheckboxContext = useCheckboxContext;
