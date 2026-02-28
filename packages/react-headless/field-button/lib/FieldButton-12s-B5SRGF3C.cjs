'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var react = require('react');
var reactSupports = require('@grapu-design/react-supports');

const getDescriptionId = (id)=>`field-button:${id}:description`;
const getErrorMessageId = (id)=>`field-button:${id}:error-message`;

function useFieldButtonState({ values = [], onValuesChange = ()=>{} }) {
    const [isHovered, setIsHovered] = react.useState(false);
    const [isActive, setIsActive] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const [isFocusVisible, setIsFocusVisible] = react.useState(false);
    const [isDescriptionRendered, setIsDescriptionRendered] = react.useState(false);
    const descriptionRef = react.useCallback((node)=>{
        setIsDescriptionRendered(!!node);
    }, []);
    const [isErrorMessageRendered, setIsErrorMessageRendered] = react.useState(false);
    const errorMessageRef = react.useCallback((node)=>{
        setIsErrorMessageRendered(!!node);
    }, []);
    return {
        values,
        isHovered,
        isActive,
        isFocused,
        isFocusVisible,
        refs: {
            description: descriptionRef,
            errorMessage: errorMessageRef
        },
        renderedElements: {
            description: isDescriptionRendered,
            errorMessage: isErrorMessageRendered
        },
        setValues: onValuesChange,
        setIsHovered,
        setIsActive,
        setIsFocused,
        setIsFocusVisible
    };
}
function useFieldButton({ values: propValues, onValuesChange, disabled = false, invalid = false, readOnly = false, name }) {
    const id = react.useId();
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    const { values: stateValues, isHovered, isActive, isFocused, isFocusVisible, refs, renderedElements, setValues, setIsHovered, setIsActive, setIsFocused, setIsFocusVisible } = useFieldButtonState({
        values: propValues,
        onValuesChange
    });
    const ariaDescribedBy = [
        renderedElements.description ? getDescriptionId(id) : false,
        renderedElements.errorMessage ? getErrorMessageId(id) : false
    ].filter(Boolean).join(" ") || undefined;
    const stateProps = domUtils.elementProps({
        "data-hover": domUtils.dataAttr(isHovered),
        "data-active": domUtils.dataAttr(isActive),
        "data-focus": domUtils.dataAttr(isFocused),
        "data-focus-visible": domUtils.dataAttr(isFocusVisible),
        "data-disabled": domUtils.dataAttr(disabled),
        "data-invalid": domUtils.dataAttr(invalid),
        "data-readonly": domUtils.dataAttr(readOnly)
    });
    return {
        values: stateValues,
        active: isActive,
        focused: isFocused,
        invalid,
        disabled,
        readOnly,
        setIsFocused,
        setIsFocusVisible,
        refs,
        stateProps,
        rootProps: domUtils.elementProps({
            ...stateProps,
            onPointerMove () {
                setIsHovered(true);
            },
            onPointerLeave () {
                setIsHovered(false);
                setIsActive(false);
            }
        }),
        buttonProps: domUtils.buttonProps({
            ...stateProps,
            type: "button",
            disabled: disabled || readOnly,
            "aria-disabled": domUtils.ariaAttr(disabled || readOnly),
            "aria-describedby": ariaDescribedBy,
            // note that pointerdown and pointerup are attached to the button, not the root
            // this is for preventing setting isActive to true when the clear button is pressed
            onPointerDown () {
                setIsActive(true);
            },
            onPointerUp () {
                setIsActive(false);
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
        }),
        clearButtonProps: domUtils.buttonProps({
            ...stateProps,
            type: "button",
            disabled: disabled || readOnly,
            onClick: react.useCallback(()=>setValues([]), [
                setValues
            ]),
            hidden: disabled || readOnly
        }),
        getHiddenInputProps: react.useCallback((index)=>{
            const value = stateValues[index];
            if (value === undefined) return null;
            return domUtils.inputProps({
                type: "hidden",
                value,
                disabled,
                name: name || id
            });
        }, [
            stateValues,
            name,
            id,
            disabled
        ]),
        descriptionProps: domUtils.elementProps({
            ...stateProps,
            id: getDescriptionId(id)
        }),
        errorMessageProps: domUtils.elementProps({
            ...stateProps,
            id: getErrorMessageId(id),
            "aria-live": "polite"
        })
    };
}

const FieldButtonContext = /*#__PURE__*/ react.createContext(null);
const FieldButtonProvider = FieldButtonContext.Provider;
function useFieldButtonContext({ strict = true } = {}) {
    const context = react.useContext(FieldButtonContext);
    if (!context && strict) {
        throw new Error("useFieldButtonContext must be used within a FieldButton");
    }
    return context;
}

const FieldButtonRoot = /*#__PURE__*/ react.forwardRef(({ disabled, readOnly, invalid, name, values, onValuesChange, ...otherProps }, ref)=>{
    const api = useFieldButton({
        disabled,
        readOnly,
        invalid,
        name,
        values,
        onValuesChange
    });
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(FieldButtonProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
FieldButtonRoot.displayName = "FieldButtonRoot";
const FieldButtonButton = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { buttonProps } = useFieldButtonContext();
    const mergedProps = domUtils.mergeProps(buttonProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: ref,
        ...mergedProps
    });
});
FieldButtonButton.displayName = "FieldButtonButton";
const FieldButtonDescription = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useFieldButtonContext();
    const mergedProps = domUtils.mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.span, {
        ref: reactComposeRefs.composeRefs(refs.description, ref),
        ...mergedProps
    });
});
FieldButtonDescription.displayName = "FieldButtonDescription";
const FieldButtonErrorMessage = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useFieldButtonContext();
    const mergedProps = domUtils.mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
FieldButtonErrorMessage.displayName = "FieldButtonErrorMessage";
const FieldButtonHiddenInput = /*#__PURE__*/ react.forwardRef(({ valueIndex, ...props }, ref)=>{
    const { getHiddenInputProps } = useFieldButtonContext();
    const hiddenInputProps = getHiddenInputProps(valueIndex);
    if (!hiddenInputProps) return null;
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.input, {
        ref: ref,
        ...domUtils.mergeProps(hiddenInputProps, props)
    });
});
FieldButtonHiddenInput.displayName = "FieldButtonHiddenInput";
const FieldButtonClearButton = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { clearButtonProps } = useFieldButtonContext();
    const mergedProps = domUtils.mergeProps(clearButtonProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: ref,
        ...mergedProps
    });
});
FieldButtonClearButton.displayName = "FieldButtonClearButton";

exports.FieldButtonButton = FieldButtonButton;
exports.FieldButtonClearButton = FieldButtonClearButton;
exports.FieldButtonDescription = FieldButtonDescription;
exports.FieldButtonErrorMessage = FieldButtonErrorMessage;
exports.FieldButtonHiddenInput = FieldButtonHiddenInput;
exports.FieldButtonRoot = FieldButtonRoot;
exports.useFieldButtonContext = useFieldButtonContext;
