'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactDismissableLayer = require('@radix-ui/react-dismissable-layer');
var reactFocusScope = require('@radix-ui/react-focus-scope');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var React = require('react');
var reactUseLayoutEffect = require('@radix-ui/react-use-layout-effect');
var reactUseControllableState = require('@grapu-design/react-use-controllable-state');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return n;
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

// This code includes portions derived from radix-ui/primitives (https://github.com/radix-ui/primitives)
// Used under the MIT License: https://opensource.org/licenses/MIT
function usePresence(present) {
    const [node, setNode] = React__namespace.useState();
    const stylesRef = React__namespace.useRef({});
    const prevPresentRef = React__namespace.useRef(present);
    const prevAnimationNameRef = React__namespace.useRef("none");
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
    React__namespace.useEffect(()=>{
        const currentAnimationName = getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [
        state
    ]);
    reactUseLayoutEffect.useLayoutEffect(()=>{
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
    reactUseLayoutEffect.useLayoutEffect(()=>{
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
        ref: React__namespace.useCallback((node)=>{
            if (node) stylesRef.current = getComputedStyle(node);
            setNode(node);
        }, [])
    };
}
/* -----------------------------------------------------------------------------------------------*/ function getAnimationName(styles) {
    return styles?.animationName || "none";
}
function useStateMachine(initialState, machine) {
    return React__namespace.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState ?? state;
    }, initialState);
}

const Presence = (props)=>{
    const { isPresent, ref } = usePresence(props.present);
    const wasEverPresent = React.useRef(false);
    if (isPresent) {
        wasEverPresent.current = true;
    }
    const unmounted = !isPresent && !wasEverPresent.current && props.lazyMount || props.unmountOnExit && !isPresent && wasEverPresent.current;
    if (unmounted) {
        return null;
    }
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        asChild: true,
        children: props.children
    });
};
Presence.displayName = "Presence";

function useDialogState(props) {
    const [open = false, onOpenChange] = reactUseControllableState.useControllableState({
        prop: props.open,
        defaultProp: props.defaultOpen ?? false,
        onChange: props.onOpenChange
    });
    return React.useMemo(()=>({
            open,
            onOpenChange
        }), [
        open,
        onOpenChange
    ]);
}
function useDialog(props = {}) {
    const { open, onOpenChange } = useDialogState(props);
    const id = React.useId();
    const titleId = `${id}-title`;
    const descriptionId = `${id}-description`;
    const stateProps = React.useMemo(()=>domUtils.elementProps({
            "data-open": domUtils.dataAttr(open),
            "data-hidden": domUtils.dataAttr(!open)
        }), [
        open
    ]);
    return React.useMemo(()=>({
            open,
            setOpen: onOpenChange,
            closeOnInteractOutside: props.closeOnInteractOutside ?? true,
            closeOnEscape: props.closeOnEscape ?? true,
            lazyMount: props.lazyMount ?? false,
            unmountOnExit: props.unmountOnExit ?? false,
            stateProps,
            triggerProps: domUtils.buttonProps({
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
            positionerProps: domUtils.elementProps({
                ...stateProps,
                style: {
                    pointerEvents: open ? undefined : "none"
                }
            }),
            backdropProps: domUtils.elementProps({
                ...stateProps
            }),
            contentProps: domUtils.elementProps({
                ...stateProps,
                role: props.role ?? "dialog",
                "aria-modal": true,
                "aria-labelledby": titleId,
                "aria-describedby": descriptionId
            }),
            titleProps: domUtils.elementProps({
                id: titleId,
                ...stateProps
            }),
            descriptionProps: domUtils.elementProps({
                id: descriptionId,
                ...stateProps
            }),
            closeButtonProps: domUtils.buttonProps({
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

const DialogContext = /*#__PURE__*/ React.createContext(null);
const DialogProvider = DialogContext.Provider;
function useDialogContext({ strict = true } = {}) {
    const context = React.useContext(DialogContext);
    if (!context && strict) {
        throw new Error("useDialogContext must be used within a Dialog");
    }
    return context;
}

const DialogRoot = (props)=>{
    const { children, ...otherProps } = props;
    const api = useDialog(otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(DialogProvider, {
        value: api,
        children: children
    });
};
const DialogTrigger = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: ref,
        ...domUtils.mergeProps(api.triggerProps, props)
    });
});
DialogTrigger.displayName = "DialogTrigger";
const DialogPositioner = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...domUtils.mergeProps(api.positionerProps, props)
    });
});
// We might need scroll lock here; not needed yet in stackflow based webview.
const DialogBackdrop = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsxRuntime.jsx(Presence, {
        present: api.open,
        unmountOnExit: api.unmountOnExit,
        lazyMount: api.lazyMount,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...domUtils.mergeProps(api.backdropProps, props)
        })
    });
});
DialogBackdrop.displayName = "DialogBackdrop";
// TODO: implement DismissableLayer in useDialog instead of radix-ui
const DialogContent = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsxRuntime.jsx(Presence, {
        present: api.open,
        unmountOnExit: api.unmountOnExit,
        lazyMount: api.lazyMount,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactFocusScope.FocusScope, {
            asChild: true,
            loop: true,
            trapped: api.open,
            children: /*#__PURE__*/ jsxRuntime.jsx(reactDismissableLayer.DismissableLayer, {
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
                ...domUtils.mergeProps(api.contentProps, props)
            })
        })
    });
});
DialogContent.displayName = "DialogContent";
const DialogTitle = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.h2, {
        ref: ref,
        ...domUtils.mergeProps(api.titleProps, props)
    });
});
const DialogDescription = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.p, {
        ref: ref,
        ...domUtils.mergeProps(api.descriptionProps, props)
    });
});
const DialogCloseButton = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDialogContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: ref,
        ...domUtils.mergeProps(api.closeButtonProps, props)
    });
});

exports.DialogBackdrop = DialogBackdrop;
exports.DialogCloseButton = DialogCloseButton;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogPositioner = DialogPositioner;
exports.DialogRoot = DialogRoot;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.useDialogContext = useDialogContext;
