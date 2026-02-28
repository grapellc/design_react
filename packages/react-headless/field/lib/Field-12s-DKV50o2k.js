'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, inputProps, ariaAttr, labelProps, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { useId, useState, useCallback, createContext, useContext, forwardRef } from 'react';
import { useSupports } from '@grape-design/react-supports';

const getLabelId = (id)=>`field:${id}:label`;
const getInputId = (id)=>`field:${id}:input`;
const getDescriptionId = (id)=>`field:${id}:description`;
const getErrorMessageId = (id)=>`field:${id}:error-message`;

function useFieldState() {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isLabelRendered, setIsLabelRendered] = useState(false);
    const labelRef = useCallback((node)=>{
        setIsLabelRendered(!!node);
    }, []);
    const [isDescriptionRendered, setIsDescriptionRendered] = useState(false);
    const descriptionRef = useCallback((node)=>{
        setIsDescriptionRendered(!!node);
    }, []);
    const [isErrorMessageRendered, setIsErrorMessageRendered] = useState(false);
    const errorMessageRef = useCallback((node)=>{
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
    const id = useId();
    const { disabled = false, invalid = false, readOnly = false, required = false } = props;
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    const { refs, renderedElements, isHovered, isActive, isFocused, isFocusVisible, setIsHovered, setIsActive, setIsFocused, setIsFocusVisible } = useFieldState();
    const ariaDescribedBy = [
        renderedElements.description ? getDescriptionId(id) : false,
        renderedElements.errorMessage ? getErrorMessageId(id) : false
    ].filter(Boolean).join(" ") || undefined;
    const stateProps = elementProps({
        "data-hover": dataAttr(isHovered),
        "data-active": dataAttr(isActive),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-readonly": dataAttr(readOnly),
        "data-disabled": dataAttr(disabled),
        "data-invalid": dataAttr(invalid)
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
        labelProps: labelProps({
            ...stateProps,
            id: getLabelId(id),
            htmlFor: getInputId(id)
        }),
        inputProps: inputProps({
            disabled,
            readOnly,
            name: props.name || id,
            id: getInputId(id)
        }),
        inputAriaAttributes: elementProps({
            ...renderedElements.label && {
                "aria-labelledby": getLabelId(id)
            },
            "aria-describedby": ariaDescribedBy,
            "aria-required": ariaAttr(required),
            "aria-invalid": ariaAttr(invalid),
            "aria-readonly": ariaAttr(readOnly),
            "aria-disabled": ariaAttr(disabled)
        }),
        inputHandlers: inputProps({
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
        descriptionProps: elementProps({
            ...stateProps,
            id: getDescriptionId(id)
        }),
        errorMessageProps: elementProps({
            ...stateProps,
            id: getErrorMessageId(id),
            "aria-live": "polite"
        })
    };
}

const FieldContext = /*#__PURE__*/ createContext(null);
const FieldProvider = FieldContext.Provider;
function useFieldContext({ strict = true } = {}) {
    const context = useContext(FieldContext);
    if (!context && strict) {
        throw new Error("useFieldContext must be used within a Field");
    }
    return context;
}

const FieldRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { readOnly, disabled, invalid, required, name, ...otherProps } = props;
    const api = useField({
        disabled,
        invalid,
        required,
        readOnly,
        name
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(FieldProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
FieldRoot.displayName = "FieldRoot";
const FieldLabel = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, labelProps } = useFieldContext();
    const mergedProps = mergeProps(labelProps, props);
    return /*#__PURE__*/ jsx(Primitive.label, {
        ref: composeRefs(refs.label, ref),
        ...mergedProps
    });
});
FieldLabel.displayName = "FieldLabel";
const FieldDescription = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useFieldContext();
    const mergedProps = mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsx(Primitive.span, {
        ref: composeRefs(refs.description, ref),
        ...mergedProps
    });
});
FieldDescription.displayName = "FieldDescription";
const FieldErrorMessage = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useFieldContext();
    const mergedProps = mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
FieldErrorMessage.displayName = "FieldErrorMessage";

export { FieldDescription as F, FieldErrorMessage as a, FieldLabel as b, FieldRoot as c, useFieldContext as u };
