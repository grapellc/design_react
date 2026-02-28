'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grape-design/dom-utils');
var reactPrimitive = require('@grape-design/react-primitive');
var react = require('react');

const getLabelId = (id)=>`fieldset:${id}:label`;
const getDescriptionId = (id)=>`fieldset:${id}:description`;
const getErrorMessageId = (id)=>`fieldset:${id}:error-message`;

function useFieldset() {
    const id = react.useId();
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
        rootProps: domUtils.elementProps({
            // see: https://w3c.github.io/aria/#group
            role: "group",
            // note: aria-disabled is supported but useFieldset doesn't know about the disabled state of its children
            // note: aria-required and aria-invalid should not be set here
            ...isLabelRendered && {
                "aria-labelledby": getLabelId(id)
            },
            "aria-describedby": ariaDescribedBy
        }),
        labelProps: domUtils.elementProps({
            id: getLabelId(id)
        }),
        descriptionProps: domUtils.elementProps({
            id: getDescriptionId(id)
        }),
        errorMessageProps: domUtils.elementProps({
            id: getErrorMessageId(id),
            "aria-live": "polite"
        })
    };
}

const FieldsetContext = /*#__PURE__*/ react.createContext(null);
const FieldsetProvider = FieldsetContext.Provider;
function useFieldsetContext({ strict = true } = {}) {
    const context = react.useContext(FieldsetContext);
    if (!context && strict) {
        throw new Error("useFieldsetContext must be used within a Fieldset");
    }
    return context;
}

const FieldsetRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = useFieldset();
    const mergedProps = domUtils.mergeProps(api.rootProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(FieldsetProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...mergedProps
        })
    });
});
FieldsetRoot.displayName = "FieldsetRoot";
const FieldsetLabel = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, labelProps } = useFieldsetContext();
    const mergedProps = domUtils.mergeProps(labelProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(refs.label, ref),
        ...mergedProps
    });
});
FieldsetLabel.displayName = "FieldsetLabel";
const FieldsetDescription = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, descriptionProps } = useFieldsetContext();
    const mergedProps = domUtils.mergeProps(descriptionProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.span, {
        ref: reactComposeRefs.composeRefs(refs.description, ref),
        ...mergedProps
    });
});
FieldsetDescription.displayName = "FieldsetDescription";
const FieldsetErrorMessage = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { refs, errorMessageProps } = useFieldsetContext();
    const mergedProps = domUtils.mergeProps(errorMessageProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(refs.errorMessage, ref),
        ...mergedProps
    });
});
FieldsetErrorMessage.displayName = "FieldsetErrorMessage";

exports.FieldsetDescription = FieldsetDescription;
exports.FieldsetErrorMessage = FieldsetErrorMessage;
exports.FieldsetLabel = FieldsetLabel;
exports.FieldsetProvider = FieldsetProvider;
exports.FieldsetRoot = FieldsetRoot;
exports.useFieldset = useFieldset;
exports.useFieldsetContext = useFieldsetContext;
