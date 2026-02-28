'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, inputProps, buttonProps, ariaAttr, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { useId, useCallback, useState, createContext, useContext, forwardRef } from 'react';
import { useSupports } from '@grape-design/react-supports';

const getDescriptionId = (id)=>`field-button:${id}:description`;
const getErrorMessageId = (id)=>`field-button:${id}:error-message`;

function useFieldButtonState({ values = [], onValuesChange = ()=>{} }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isDescriptionRendered, setIsDescriptionRendered] = useState(false);
    const descriptionRef = useCallback((node)=>{
        setIsDescriptionRendered(!!node);
    }, []);
    const [isErrorMessageRendered, setIsErrorMessageRendered] = useState(false);
    const errorMessageRef = useCallback((node)=>{
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
    const id = useId();
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    const { values: stateValues, isHovered, isActive, isFocused, isFocusVisible, refs, renderedElements, setValues, setIsHovered, setIsActive, setIsFocused, setIsFocusVisible } = useFieldButtonState({
        values: propValues,
        onValuesChange
    });
    const ariaDescribedBy = [
        renderedElements.description ? getDescriptionId(id) : false,
        renderedElements.errorMessage ? getErrorMessageId(id) : false
    ].filter(Boolean).join(" ") || undefined;
    const stateProps = elementProps({
        "data-hover": dataAttr(isHovered),
        "data-active": dataAttr(isActive),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(disabled),
        "data-invalid": dataAttr(invalid),
        "data-readonly": dataAttr(readOnly)
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
        rootProps: elementProps({
            ...stateProps,
            onPointerMove () {
                setIsHovered(true);
            },
            onPointerLeave () {
                setIsHovered(false);
                setIsActive(false);
            }
        }),
        buttonProps: buttonProps({
            ...stateProps,
            type: "button",
            disabled: disabled || readOnly,
            "aria-disabled": ariaAttr(disabled || readOnly),
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
        clearButtonProps: buttonProps({
            ...stateProps,
            type: "button",
            disabled: disabled || readOnly,
            onClick: useCallback(()=>setValues([]), [
                setValues
            ]),
            hidden: disabled || readOnly
        }),
        getHiddenInputProps: useCallback((index)=>{
            const value = stateValues[index];
            if (value === undefined) return null;
            return inputProps({
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

const FieldButtonContext = /*#__PURE__*/ createContext(null);
const FieldButtonProvider = FieldButtonContext.Provider;
function useFieldButtonContext({ strict = true } = {}) {
    const context = useContext(FieldButtonContext);
    if (!context && strict) {
        throw new Error("useFieldButtonContext must be used within a FieldButton");
    }
    return context;
}

const FieldButtonRoot = /*#__PURE__*/ forwardRef(({ disabled, readOnly, invalid, name, values, onValuesChange, ...otherProps }, ref)=>{
    const api = useFieldButton({
        disabled,
        readOnly,
        invalid,
        name,
        values,
        onValuesChange
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(FieldButtonProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
FieldButtonRoot.displayName = "FieldButtonRoot";
const FieldButtonButton = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { buttonProps } = useFieldButtonContext();
    const mergedProps = mergeProps(buttonProps, props);
    return /*#__PURE__*/ jsx(Primitive.button, {
        ref: ref,
        ...mergedProps
    });
});
FieldButtonButton.displayName = "FieldButtonButton";
const FieldButtonDescription = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useFieldButtonContext();
    const mergedProps = mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsx(Primitive.span, {
        ref: composeRefs(refs.description, ref),
        ...mergedProps
    });
});
FieldButtonDescription.displayName = "FieldButtonDescription";
const FieldButtonErrorMessage = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useFieldButtonContext();
    const mergedProps = mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
FieldButtonErrorMessage.displayName = "FieldButtonErrorMessage";
const FieldButtonHiddenInput = /*#__PURE__*/ forwardRef(({ valueIndex, ...props }, ref)=>{
    const { getHiddenInputProps } = useFieldButtonContext();
    const hiddenInputProps = getHiddenInputProps(valueIndex);
    if (!hiddenInputProps) return null;
    return /*#__PURE__*/ jsx(Primitive.input, {
        ref: ref,
        ...mergeProps(hiddenInputProps, props)
    });
});
FieldButtonHiddenInput.displayName = "FieldButtonHiddenInput";
const FieldButtonClearButton = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { clearButtonProps } = useFieldButtonContext();
    const mergedProps = mergeProps(clearButtonProps, props);
    return /*#__PURE__*/ jsx(Primitive.button, {
        ref: ref,
        ...mergedProps
    });
});
FieldButtonClearButton.displayName = "FieldButtonClearButton";

export { FieldButtonButton as F, FieldButtonClearButton as a, FieldButtonDescription as b, FieldButtonErrorMessage as c, FieldButtonHiddenInput as d, FieldButtonRoot as e, useFieldButtonContext as u };
