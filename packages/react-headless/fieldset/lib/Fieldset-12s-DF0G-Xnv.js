'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { useId, useState, useCallback, createContext, useContext, forwardRef } from 'react';

const getLabelId = (id)=>`fieldset:${id}:label`;
const getDescriptionId = (id)=>`fieldset:${id}:description`;
const getErrorMessageId = (id)=>`fieldset:${id}:error-message`;

function useFieldset() {
    const id = useId();
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
    const ariaDescribedBy = [
        isDescriptionRendered ? getDescriptionId(id) : false,
        isErrorMessageRendered ? getErrorMessageId(id) : false
    ].filter(Boolean).join(" ") || undefined;
    return {
        id,
        refs: {
            label: labelRef,
            description: descriptionRef,
            errorMessage: errorMessageRef
        },
        renderedElements: {
            label: isLabelRendered,
            description: isDescriptionRendered,
            errorMessage: isErrorMessageRendered
        },
        rootProps: elementProps({
            // see: https://w3c.github.io/aria/#group
            role: "group",
            // note: aria-disabled is supported but useFieldset doesn't know about the disabled state of its children
            // note: aria-required and aria-invalid should not be set here
            ...isLabelRendered && {
                "aria-labelledby": getLabelId(id)
            },
            "aria-describedby": ariaDescribedBy
        }),
        labelProps: elementProps({
            id: getLabelId(id)
        }),
        descriptionProps: elementProps({
            id: getDescriptionId(id)
        }),
        errorMessageProps: elementProps({
            id: getErrorMessageId(id),
            "aria-live": "polite"
        })
    };
}

const FieldsetContext = /*#__PURE__*/ createContext(null);
const FieldsetProvider = FieldsetContext.Provider;
function useFieldsetContext({ strict = true } = {}) {
    const context = useContext(FieldsetContext);
    if (!context && strict) {
        throw new Error("useFieldsetContext must be used within a Fieldset");
    }
    return context;
}

const FieldsetRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useFieldset();
    const mergedProps = mergeProps(api.rootProps, props);
    return /*#__PURE__*/ jsx(FieldsetProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
FieldsetRoot.displayName = "FieldsetRoot";
const FieldsetLabel = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, labelProps } = useFieldsetContext();
    const mergedProps = mergeProps(labelProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(refs.label, ref),
        ...mergedProps
    });
});
FieldsetLabel.displayName = "FieldsetLabel";
const FieldsetDescription = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useFieldsetContext();
    const mergedProps = mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsx(Primitive.span, {
        ref: composeRefs(refs.description, ref),
        ...mergedProps
    });
});
FieldsetDescription.displayName = "FieldsetDescription";
const FieldsetErrorMessage = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useFieldsetContext();
    const mergedProps = mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
FieldsetErrorMessage.displayName = "FieldsetErrorMessage";

export { FieldsetDescription as F, FieldsetErrorMessage as a, FieldsetLabel as b, FieldsetRoot as c, FieldsetProvider as d, useFieldsetContext as e, useFieldset as u };
