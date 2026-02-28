'use client';
import { jsx } from 'react/jsx-runtime';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { elementProps, dataAttr, buttonProps, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import * as React from 'react';
import { useRef, useId, useMemo, createContext, useContext, forwardRef } from 'react';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { useControllableState } from '@grapu-design/react-use-controllable-state';

// This code includes portions derived from radix-ui/primitives (https://github.com/radix-ui/primitives)
// Used under the MIT License: https://opensource.org/licenses/MIT
function usePresence(present) {
    const [node, setNode] = React.useState();
    const stylesRef = React.useRef({});
    const prevPresentRef = React.useRef(present);
    const prevAnimationNameRef = React.useRef("none");
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
        mounted: {
            UNMOUNT: "unmounted",
            ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
            MOUNT: "mounted",
            ANIMATION_END: "unmounted"
        },
        unmounted: {
            MOUNT: "mounted"
        }
    });
    React.useEffect(()=>{
        const currentAnimationName = getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [
        state
    ]);
    useLayoutEffect(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = getAnimationName(styles);
            if (present) {
                send("MOUNT");
            } else if (currentAnimationName === "none" || styles?.display === "none") {
                // If there is no exit animation or the element is hidden, animations won't run
                // so we unmount instantly
                send("UNMOUNT");
            } else {
                /**
         * When `present` changes to `false`, we check changes to animation-name to
         * determine whether an animation has started. We chose this approach (reading
         * computed styles) because there is no `animationrun` event and `animationstart`
         * fires after `animation-delay` has expired which would be too late.
         */ const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) {
                    send("ANIMATION_OUT");
                } else {
                    send("UNMOUNT");
                }
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    useLayoutEffect(()=>{
        if (node) {
            let timeoutId;
            const ownerWindow = node.ownerDocument.defaultView ?? window;
            /**
       * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
       * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
       * make sure we only trigger ANIMATION_END for the currently active animation.
       */ const handleAnimationEnd = (event)=>{
                const currentAnimationName = getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                if (event.target === node && isCurrentAnimation) {
                    // With React 18 concurrency this update is applied a frame after the
                    // animation ends, creating a flash of visible content. By setting the
                    // animation fill mode to "forwards", we force the node to keep the
                    // styles of the last keyframe, removing the flash.
                    //
                    // Previously we flushed the update via ReactDom.flushSync, but with
                    // exit animations this resulted in the node being removed from the
                    // DOM before the synthetic animationEnd event was dispatched, meaning
                    // user-provided event handlers would not be called.
                    // https://github.com/radix-ui/primitives/pull/1849
                    send("ANIMATION_END");
                    if (!prevPresentRef.current) {
                        const currentFillMode = node.style.animationFillMode;
                        node.style.animationFillMode = "forwards";
                        // Reset the style after the node had time to unmount (for cases
                        // where the component chooses not to unmount). Doing this any
                        // sooner than `setTimeout` (e.g. with `requestAnimationFrame`)
                        // still causes a flash.
                        timeoutId = ownerWindow.setTimeout(()=>{
                            if (node.style.animationFillMode === "forwards") {
                                node.style.animationFillMode = currentFillMode;
                            }
                        });
                    }
                }
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node) {
                    // if animation occurred, store its name as the previous animation.
                    prevAnimationNameRef.current = getAnimationName(stylesRef.current);
                }
            };
            node.addEventListener("animationstart", handleAnimationStart);
            node.addEventListener("animationcancel", handleAnimationEnd);
            node.addEventListener("animationend", handleAnimationEnd);
            return ()=>{
                ownerWindow.clearTimeout(timeoutId);
                node.removeEventListener("animationstart", handleAnimationStart);
                node.removeEventListener("animationcancel", handleAnimationEnd);
                node.removeEventListener("animationend", handleAnimationEnd);
            };
        } else {
            // Transition to the unmounted state if the node is removed prematurely.
            // We avoid doing so during cleanup as the node may change but still exist.
            send("ANIMATION_END");
        }
    }, [
        node,
        send
    ]);
    return {
        isPresent: [
            "mounted",
            "unmountSuspended"
        ].includes(state),
        ref: React.useCallback((node)=>{
            if (node) stylesRef.current = getComputedStyle(node);
            setNode(node);
        }, [])
    };
}
/* -----------------------------------------------------------------------------------------------*/ function getAnimationName(styles) {
    return styles?.animationName || "none";
}
function useStateMachine(initialState, machine) {
    return React.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState ?? state;
    }, initialState);
}

const Presence = (props)=>{
    const { isPresent, ref } = usePresence(props.present);
    const wasEverPresent = useRef(false);
    if (isPresent) {
        wasEverPresent.current = true;
    }
    const unmounted = !isPresent && !wasEverPresent.current && props.lazyMount || props.unmountOnExit && !isPresent && wasEverPresent.current;
    if (unmounted) {
        return null;
    }
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        asChild: true,
        children: props.children
    });
};
Presence.displayName = "Presence";

function useDialogState(props) {
    const [open = false, onOpenChange] = useControllableState({
        prop: props.open,
        defaultProp: props.defaultOpen ?? false,
        onChange: props.onOpenChange
    });
    return useMemo(()=>({
            open,
            onOpenChange
        }), [
        open,
        onOpenChange
    ]);
}
function useDialog(props = {}) {
    const { open, onOpenChange } = useDialogState(props);
    const id = useId();
    const titleId = `${id}-title`;
    const descriptionId = `${id}-description`;
    const stateProps = useMemo(()=>elementProps({
            "data-open": dataAttr(open),
            "data-hidden": dataAttr(!open)
        }), [
        open
    ]);
    return useMemo(()=>({
            open,
            setOpen: onOpenChange,
            closeOnInteractOutside: props.closeOnInteractOutside ?? true,
            closeOnEscape: props.closeOnEscape ?? true,
            lazyMount: props.lazyMount ?? false,
            unmountOnExit: props.unmountOnExit ?? false,
            stateProps,
            triggerProps: buttonProps({
                "aria-haspopup": "dialog",
                "aria-expanded": open,
                ...stateProps,
                onClick: (e)=>{
                    if (e.defaultPrevented) return;
                    onOpenChange(true, {
                        reason: "trigger",
                        event: e.nativeEvent
                    });
                }
            }),
            positionerProps: elementProps({
                ...stateProps,
                style: {
                    pointerEvents: open ? undefined : "none"
                }
            }),
            backdropProps: elementProps({
                ...stateProps
            }),
            contentProps: elementProps({
                ...stateProps,
                role: props.role ?? "dialog",
                "aria-modal": true,
                "aria-labelledby": titleId,
                "aria-describedby": descriptionId
            }),
            titleProps: elementProps({
                id: titleId,
                ...stateProps
            }),
            descriptionProps: elementProps({
                id: descriptionId,
                ...stateProps
            }),
            closeButtonProps: buttonProps({
                ...stateProps,
                onClick: (e)=>{
                    if (e.defaultPrevented) return;
                    onOpenChange(false, {
                        reason: "closeButton",
                        event: e.nativeEvent
                    });
                }
            })
        }), [
        open,
        onOpenChange,
        stateProps,
        titleId,
        descriptionId,
        props.role,
        props.closeOnInteractOutside,
        props.closeOnEscape,
        props.lazyMount,
        props.unmountOnExit
    ]);
}

const DialogContext = /*#__PURE__*/ createContext(null);
const DialogProvider = DialogContext.Provider;
function useDialogContext({ strict = true } = {}) {
    const context = useContext(DialogContext);
    if (!context && strict) {
        throw new Error("useDialogContext must be used within a Dialog");
    }
    return context;
}

const DialogRoot = (props)=>{
    const { children, ...otherProps } = props;
    const api = useDialog(otherProps);
    return /*#__PURE__*/ jsx(DialogProvider, {
        value: api,
        children: children
    });
};
const DialogTrigger = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsx(Primitive.button, {
        ref: ref,
        ...mergeProps(api.triggerProps, props)
    });
});
DialogTrigger.displayName = "DialogTrigger";
const DialogPositioner = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(api.positionerProps, props)
    });
});
// We might need scroll lock here; not needed yet in stackflow based webview.
const DialogBackdrop = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsx(Presence, {
        present: api.open,
        unmountOnExit: api.unmountOnExit,
        lazyMount: api.lazyMount,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergeProps(api.backdropProps, props)
        })
    });
});
DialogBackdrop.displayName = "DialogBackdrop";
// TODO: implement DismissableLayer in useDialog instead of radix-ui
const DialogContent = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsx(Presence, {
        present: api.open,
        unmountOnExit: api.unmountOnExit,
        lazyMount: api.lazyMount,
        children: /*#__PURE__*/ jsx(FocusScope, {
            asChild: true,
            loop: true,
            trapped: api.open,
            children: /*#__PURE__*/ jsx(DismissableLayer, {
                ref: ref,
                onEscapeKeyDown: (e)=>{
                    if (!api.closeOnEscape) {
                        e.preventDefault();
                        return;
                    }
                    api.setOpen(false, {
                        reason: "escapeKeyDown",
                        event: e
                    });
                },
                // onInteractOutside = onFocusOutside + onPointerDownOutside
                onInteractOutside: (e)=>{
                    if (!api.closeOnInteractOutside) {
                        e.preventDefault();
                        return;
                    }
                    api.setOpen(false, {
                        reason: "interactOutside",
                        event: e.detail.originalEvent
                    });
                },
                ...mergeProps(api.contentProps, props)
            })
        })
    });
});
DialogContent.displayName = "DialogContent";
const DialogTitle = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsx(Primitive.h2, {
        ref: ref,
        ...mergeProps(api.titleProps, props)
    });
});
const DialogDescription = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsx(Primitive.p, {
        ref: ref,
        ...mergeProps(api.descriptionProps, props)
    });
});
const DialogCloseButton = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsx(Primitive.button, {
        ref: ref,
        ...mergeProps(api.closeButtonProps, props)
    });
});

export { DialogBackdrop as D, DialogCloseButton as a, DialogContent as b, DialogDescription as c, DialogPositioner as d, DialogRoot as e, DialogTitle as f, DialogTrigger as g, useDialogContext as u };
