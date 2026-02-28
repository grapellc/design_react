'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var react = require('react');
var reactSupports = require('@grapu-design/react-supports');

const getLabelId = (id)=>`field:${id}:label`;
const getInputId = (id)=>`field:${id}:input`;
const getDescriptionId = (id)=>`field:${id}:description`;
const getErrorMessageId = (id)=>`field:${id}:error-message`;

function useFieldState() {
    const [isHovered, setIsHovered] = react.useState(false);
    const [isActive, setIsActive] = react.useState(false);
    const [isFocused, setIsFocused] = react.useState(false);
    const [isFocusVisible, setIsFocusVisible] = react.useState(false);
    const [isLabelRendered, setIsLabelRendered] = react.useState(false);
    const labelRef = react.useCallback((node)=>{
        setIsLabelRendered(!!node);
    }, []);
    const [isDescriptionRendered, setIsDescriptionRendered] = react.useState(false);
    const descriptionRef = react.useCallback((node)=>{
        setIsDescriptionRendered(!!node);
    }, []);
    const [isErrorMessageRendered, setIsErrorMessageRendered] = react.useState(false);
    const errorMessageRef = react.useCallback((node)=>{
        setIsErrorMessageRendered(!!node);
    }, []);
    return {
        refs: {
            label: labelRef,
            description: descriptionRef,
            errorMessage: errorMessageRef
        },
        isHovered,
        isActive,
        isFocused,
        isFocusVisible,
        renderedElements: {
            label: isLabelRendered,
            description: isDescriptionRendered,
            errorMessage: isErrorMessageRendered
        },
        setIsHovered,
        setIsActive,
        setIsFocused,
        setIsFocusVisible
    };
}
function useField(props) {
    const id = react.useId();
    const { disabled = false, invalid = false, readOnly = false, required = false } = props;
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    const { refs, renderedElements, isHovered, isActive, isFocused, isFocusVisible, setIsHovered, setIsActive, setIsFocused, setIsFocusVisible } = useFieldState();
    const ariaDescribedBy = [
        renderedElements.description ? getDescriptionId(id) : false,
        renderedElements.errorMessage ? getErrorMessageId(id) : false
    ].filter(Boolean).join(" ") || undefined;
    const stateProps = domUtils.elementProps({
        "data-hover": domUtils.dataAttr(isHovered),
        "data-active": domUtils.dataAttr(isActive),
        "data-focus": domUtils.dataAttr(isFocused),
        "data-focus-visible": domUtils.dataAttr(isFocusVisible),
        "data-readonly": domUtils.dataAttr(readOnly),
        "data-disabled": domUtils.dataAttr(disabled),
        "data-invalid": domUtils.dataAttr(invalid)
    });
    return {
        refs,
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
        labelProps: domUtils.labelProps({
            ...stateProps,
            id: getLabelId(id),
            htmlFor: getInputId(id)
        }),
        inputProps: domUtils.inputProps({
            disabled,
            readOnly,
            name: props.name || id,
            id: getInputId(id)
        }),
        inputAriaAttributes: domUtils.elementProps({
            ...renderedElements.label && {
                "aria-labelledby": getLabelId(id)
            },
            "aria-describedby": ariaDescribedBy,
            "aria-required": domUtils.ariaAttr(required),
            "aria-invalid": domUtils.ariaAttr(invalid),
            "aria-readonly": domUtils.ariaAttr(readOnly),
            "aria-disabled": domUtils.ariaAttr(disabled)
        }),
        inputHandlers: domUtils.inputProps({
            onChange: (event)=>{
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
        }),
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

const FieldContext = /*#__PURE__*/ react.createContext(null);
const FieldProvider = FieldContext.Provider;
function useFieldContext({ strict = true } = {}) {
    const context = react.useContext(FieldContext);
    if (!context && strict) {
        throw new Error("useFieldContext must be used within a Field");
    }
    return context;
}

const FieldRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { readOnly, disabled, invalid, required, name, ...otherProps } = props;
    const api = useField({
        disabled,
        invalid,
        required,
        readOnly,
        name
    });
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(FieldProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
FieldRoot.displayName = "FieldRoot";
const FieldLabel = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, labelProps } = useFieldContext();
    const mergedProps = domUtils.mergeProps(labelProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.label, {
        ref: reactComposeRefs.composeRefs(refs.label, ref),
        ...mergedProps
    });
});
FieldLabel.displayName = "FieldLabel";
const FieldDescription = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useFieldContext();
    const mergedProps = domUtils.mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.span, {
        ref: reactComposeRefs.composeRefs(refs.description, ref),
        ...mergedProps
    });
});
FieldDescription.displayName = "FieldDescription";
const FieldErrorMessage = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useFieldContext();
    const mergedProps = domUtils.mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
FieldErrorMessage.displayName = "FieldErrorMessage";

exports.FieldDescription = FieldDescription;
exports.FieldErrorMessage = FieldErrorMessage;
exports.FieldLabel = FieldLabel;
exports.FieldRoot = FieldRoot;
exports.useFieldContext = useFieldContext;
