'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var react = require('react');
var react$1 = require('@floating-ui/react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');

const defaultPositioningOptions = {
    strategy: "absolute",
    placement: "bottom",
    flip: true,
    slide: true,
    overflowPadding: 8,
    arrowPadding: 4
};
function getArrowMiddleware(arrowElement, opts) {
    if (!arrowElement) return;
    return react$1.arrow({
        element: arrowElement,
        padding: opts.arrowPadding
    });
}
function getOffsetMiddleware(arrowOffset, opts) {
    const offsetMainAxis = (opts.gutter ?? 0) + arrowOffset;
    return react$1.offset(offsetMainAxis);
}
function getFlipMiddleware(opts) {
    if (!opts.flip) return;
    return react$1.flip({
        padding: opts.overflowPadding,
        fallbackPlacements: opts.flip === true ? undefined : opts.flip
    });
}
function getShiftMiddleware(opts) {
    if (!opts.slide) return;
    return react$1.shift({
        mainAxis: opts.slide,
        padding: opts.overflowPadding,
        limiter: react$1.limitShift()
    });
}
const rectMiddleware = {
    name: "rects",
    fn ({ rects }) {
        return {
            data: rects
        };
    }
};
const ARROW_FLOATING_STYLE = {
    top: "",
    right: "rotate(90deg)",
    bottom: "rotate(180deg)",
    left: "rotate(270deg)"
};
function usePositionedFloating(props) {
    const options = {
        ...defaultPositioningOptions,
        ...props
    };
    const [open, onOpenChange] = reactUseControllableState.useControllableState({
        prop: props.open,
        defaultProp: props.defaultOpen ?? false,
        onChange: props.onOpenChange
    });
    const [arrowEl, setArrowEl] = react.useState(null);
    const [arrowTipEl, setArrowTipEl] = react.useState(null);
    const arrowTipWidth = arrowTipEl?.clientWidth ?? 0;
    const arrowTipHeight = arrowTipEl?.clientHeight ?? 0;
    const arrowTipOffset = arrowTipHeight;
    const { refs, context, floatingStyles, middlewareData, isPositioned } = react$1.useFloating({
        strategy: options.strategy,
        open,
        placement: options.placement,
        onOpenChange: onOpenChange,
        middleware: [
            getOffsetMiddleware(arrowTipOffset, options),
            getFlipMiddleware(options),
            getShiftMiddleware(options),
            getArrowMiddleware(arrowEl, options),
            rectMiddleware
        ]
    });
    // https://floating-ui.com/docs/react#anchoring
    react.useEffect(()=>{
        if (!open) return;
        if (!refs.reference.current || !refs.floating.current) return;
        return react$1.autoUpdate(refs.reference.current, refs.floating.current, context.update);
    }, [
        open,
        refs.reference,
        refs.floating,
        context
    ]);
    const [side, alignment] = context.placement.split("-");
    const arrowStyles = react.useMemo(()=>({
            position: "absolute",
            left: middlewareData.arrow?.x,
            top: middlewareData.arrow?.y,
            [side]: "100%",
            transform: ARROW_FLOATING_STYLE[side]
        }), [
        middlewareData.arrow,
        side
    ]);
    return react.useMemo(()=>({
            open,
            onOpenChange,
            refs: {
                ...refs,
                arrow: arrowEl,
                setArrow: setArrowEl,
                arrowTip: arrowTipEl,
                setArrowTip: setArrowTipEl
            },
            rects: {
                ...middlewareData["rects"],
                arrowTip: {
                    width: arrowTipWidth,
                    height: arrowTipHeight
                }
            },
            isPositioned,
            side,
            alignment,
            context,
            floatingStyles,
            arrowStyles
        }), [
        open,
        onOpenChange,
        refs,
        arrowEl,
        arrowTipEl,
        middlewareData["rects"],
        context,
        side,
        alignment,
        floatingStyles,
        arrowStyles,
        isPositioned,
        arrowTipWidth,
        arrowTipHeight
    ]);
}

function usePopover({ closeOnInteractOutside, ...props } = {}) {
    const { open, onOpenChange, refs, isPositioned, side, alignment, context, floatingStyles, arrowStyles, rects } = usePositionedFloating(props);
    const role = react$1.useRole(context);
    const click = react$1.useClick(context);
    const dismiss = react$1.useDismiss(context, {
        outsidePress: closeOnInteractOutside ?? true
    });
    const { status } = react$1.useTransitionStatus(context);
    const triggerInteractions = react$1.useInteractions([
        role,
        click,
        dismiss
    ]);
    const anchorInteractions = react$1.useInteractions([
        role,
        dismiss
    ]);
    const stateProps = react.useMemo(()=>domUtils.elementProps({
            "data-side": side,
            "data-alignment": alignment,
            "data-hidden": domUtils.dataAttr(status === "unmounted"),
            "data-positioned": domUtils.dataAttr(isPositioned),
            "data-open": domUtils.dataAttr(status === "open" || status === "initial")
        }), [
        side,
        alignment,
        isPositioned,
        status
    ]);
    return react.useMemo(()=>({
            open,
            refs: {
                anchor: refs.setReference,
                trigger: refs.setReference,
                positioner: refs.setFloating,
                arrow: refs.setArrow,
                arrowTip: refs.setArrowTip
            },
            rects,
            stateProps,
            anchorProps: domUtils.elementProps({
                ...anchorInteractions.getReferenceProps(),
                ...stateProps
            }),
            triggerProps: domUtils.elementProps({
                "aria-haspopup": "dialog",
                "aria-expanded": open,
                ...triggerInteractions.getReferenceProps(),
                ...stateProps
            }),
            positionerProps: domUtils.elementProps({
                ...triggerInteractions.getFloatingProps(),
                ...stateProps,
                style: floatingStyles
            }),
            arrowProps: domUtils.elementProps({
                ...stateProps,
                style: arrowStyles
            }),
            closeButtonProps: domUtils.buttonProps({
                ...stateProps,
                onClick: (e)=>{
                    if (e.defaultPrevented) return;
                    onOpenChange?.(false);
                }
            })
        }), [
        open,
        onOpenChange,
        refs,
        stateProps,
        triggerInteractions,
        anchorInteractions,
        floatingStyles,
        arrowStyles,
        rects
    ]);
}

const PopoverContext = /*#__PURE__*/ react.createContext(null);
const PopoverProvider = PopoverContext.Provider;
function usePopoverContext({ strict = true } = {}) {
    const context = react.useContext(PopoverContext);
    if (!context && strict) {
        throw new Error("usePopoverContext must be used within a Popover");
    }
    return context;
}

const PopoverRoot = (props)=>{
    const { children, ...otherProps } = props;
    const api = usePopover(otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(PopoverProvider, {
        value: api,
        children: children
    });
};
const PopoverAnchor = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(api.refs.anchor, ref),
        ...domUtils.mergeProps(api.anchorProps, props)
    });
});
PopoverAnchor.displayName = "PopoverAnchor";
const PopoverTrigger = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: reactComposeRefs.composeRefs(api.refs.trigger, ref),
        ...domUtils.mergeProps(api.triggerProps, props)
    });
});
PopoverTrigger.displayName = "PopoverTrigger";
const PopoverPositioner = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(api.refs.positioner, ref),
        ...domUtils.mergeProps(api.positionerProps, props)
    });
});
PopoverPositioner.displayName = "PopoverPositioner";
const PopoverPositionerPortal = /*#__PURE__*/ react.forwardRef(({ id, root, preserveTabOrder, ...otherProps }, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsxRuntime.jsx(react$1.FloatingPortal, {
        id: id,
        root: root,
        preserveTabOrder: preserveTabOrder,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: reactComposeRefs.composeRefs(api.refs.positioner, ref),
            ...domUtils.mergeProps(api.positionerProps, otherProps)
        })
    });
});
PopoverPositionerPortal.displayName = "PopoverPositionerPortal";
const PopoverArrow = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(api.refs.arrow, ref),
        ...domUtils.mergeProps(api.arrowProps, props)
    });
});
PopoverArrow.displayName = "PopoverArrow";
const PopoverCloseButton = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: ref,
        ...domUtils.mergeProps(api.closeButtonProps, props)
    });
});

exports.PopoverAnchor = PopoverAnchor;
exports.PopoverArrow = PopoverArrow;
exports.PopoverCloseButton = PopoverCloseButton;
exports.PopoverPositioner = PopoverPositioner;
exports.PopoverPositionerPortal = PopoverPositionerPortal;
exports.PopoverRoot = PopoverRoot;
exports.PopoverTrigger = PopoverTrigger;
exports.usePopoverContext = usePopoverContext;
