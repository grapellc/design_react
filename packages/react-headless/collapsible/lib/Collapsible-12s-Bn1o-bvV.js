'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { useId, useRef, useState, useEffect, useMemo, createContext, useContext, forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';

const getContentId = (id)=>`collapsible:${id}:content`;

function useCollapsibleState(props) {
    const [open, setOpen] = useControllableState({
        prop: props.open,
        defaultProp: props.defaultOpen ?? false,
        onChange: props.onOpenChange
    });
    return useMemo(()=>({
            open,
            setOpen
        }), [
        open,
        setOpen
    ]);
}
function useCollapsible(props) {
    const { open, setOpen } = useCollapsibleState(props);
    const { disabled } = props;
    const id = useId();
    const contentId = getContentId(id);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(undefined);
    const [visible, setVisible] = useState(open);
    const hidden = !open && !visible;
    useLayoutEffect(()=>{
        if (!contentRef.current) return;
        const updateHeight = ()=>{
            if (!contentRef.current) return;
            setHeight(contentRef.current.scrollHeight);
        };
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(contentRef.current);
        return ()=>observer.disconnect();
    }, [
        open
    ]);
    useEffect(()=>{
        if (!open) return;
        // When expanded, immediately show to allow transition
        setVisible(true);
    }, [
        open
    ]);
    const panelHeight = open ? `${height}px` : "0px";
    const stateProps = useMemo(()=>elementProps({
            "data-collapsible": "",
            "data-open": dataAttr(open),
            "data-disabled": dataAttr(disabled)
        }), [
        open,
        disabled
    ]);
    return useMemo(()=>({
            open,
            setOpen,
            disabled,
            stateProps,
            triggerAriaProps: elementProps({
                "aria-expanded": open,
                "aria-controls": contentId,
                "aria-disabled": disabled
            }),
            triggerHandlers: elementProps({
                onClick: (event)=>{
                    if (event.defaultPrevented) return;
                    if (disabled) return;
                    setOpen((prev)=>!prev);
                }
            }),
            contentProps: elementProps({
                ...stateProps,
                id: contentId,
                hidden,
                style: {
                    "--collapsible-content-height": height !== undefined ? panelHeight : undefined
                },
                onTransitionEnd: (event)=>{
                    if (event.propertyName !== "height") return;
                    if (open) return;
                    setVisible(false);
                }
            }),
            refs: {
                content: contentRef
            }
        }), [
        open,
        setOpen,
        disabled,
        stateProps,
        contentId,
        hidden,
        height,
        panelHeight
    ]);
}

const CollapsibleContext = /*#__PURE__*/ createContext(null);
const CollapsibleProvider = CollapsibleContext.Provider;
function useCollapsibleContext({ strict = true } = {}) {
    const context = useContext(CollapsibleContext);
    if (!context && strict) {
        throw new Error("useCollapsibleContext must be used within a CollapsibleRoot");
    }
    return context;
}

const CollapsibleRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { open, defaultOpen, onOpenChange, disabled, ...otherProps } = props;
    const api = useCollapsible({
        open,
        defaultOpen,
        onOpenChange,
        disabled
    });
    return /*#__PURE__*/ jsx(CollapsibleProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergeProps(api.stateProps, otherProps)
        })
    });
});
CollapsibleRoot.displayName = "CollapsibleRoot";
const CollapsibleTrigger = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useCollapsibleContext();
    return /*#__PURE__*/ jsx(Primitive.button, {
        ref: ref,
        ...mergeProps(api.stateProps, api.triggerAriaProps, api.triggerHandlers, props)
    });
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
const CollapsibleContent = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useCollapsibleContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(ref, api.refs.content),
        ...mergeProps(api.contentProps, props)
    });
});
CollapsibleContent.displayName = "CollapsibleContent";

export { CollapsibleContent as C, CollapsibleRoot as a, CollapsibleTrigger as b, CollapsibleProvider as c, useCollapsibleContext as d, useCollapsible as u };
