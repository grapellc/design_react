'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, buttonProps, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import { useState, useEffect, useMemo, createContext, useContext, forwardRef } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, limitShift, arrow, useRole, useClick, useDismiss, useTransitionStatus, useInteractions, FloatingPortal } from '@floating-ui/react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

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
    return arrow({
        element: arrowElement,
        padding: opts.arrowPadding
    });
}
function getOffsetMiddleware(arrowOffset, opts) {
    const offsetMainAxis = (opts.gutter ?? 0) + arrowOffset;
    return offset(offsetMainAxis);
}
function getFlipMiddleware(opts) {
    if (!opts.flip) return;
    return flip({
        padding: opts.overflowPadding,
        fallbackPlacements: opts.flip === true ? undefined : opts.flip
    });
}
function getShiftMiddleware(opts) {
    if (!opts.slide) return;
    return shift({
        mainAxis: opts.slide,
        padding: opts.overflowPadding,
        limiter: limitShift()
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
    const [open, onOpenChange] = useControllableState({
        prop: props.open,
        defaultProp: props.defaultOpen ?? false,
        onChange: props.onOpenChange
    });
    const [arrowEl, setArrowEl] = useState(null);
    const [arrowTipEl, setArrowTipEl] = useState(null);
    const arrowTipWidth = arrowTipEl?.clientWidth ?? 0;
    const arrowTipHeight = arrowTipEl?.clientHeight ?? 0;
    const arrowTipOffset = arrowTipHeight;
    const { refs, context, floatingStyles, middlewareData, isPositioned } = useFloating({
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
    useEffect(()=>{
        if (!open) return;
        if (!refs.reference.current || !refs.floating.current) return;
        return autoUpdate(refs.reference.current, refs.floating.current, context.update);
    }, [
        open,
        refs.reference,
        refs.floating,
        context
    ]);
    const [side, alignment] = context.placement.split("-");
    const arrowStyles = useMemo(()=>({
            position: "absolute",
            left: middlewareData.arrow?.x,
            top: middlewareData.arrow?.y,
            [side]: "100%",
            transform: ARROW_FLOATING_STYLE[side]
        }), [
        middlewareData.arrow,
        side
    ]);
    return useMemo(()=>({
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
    const role = useRole(context);
    const click = useClick(context);
    const dismiss = useDismiss(context, {
        outsidePress: closeOnInteractOutside ?? true
    });
    const { status } = useTransitionStatus(context);
    const triggerInteractions = useInteractions([
        role,
        click,
        dismiss
    ]);
    const anchorInteractions = useInteractions([
        role,
        dismiss
    ]);
    const stateProps = useMemo(()=>elementProps({
            "data-side": side,
            "data-alignment": alignment,
            "data-hidden": dataAttr(status === "unmounted"),
            "data-positioned": dataAttr(isPositioned),
            "data-open": dataAttr(status === "open" || status === "initial")
        }), [
        side,
        alignment,
        isPositioned,
        status
    ]);
    return useMemo(()=>({
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
            anchorProps: elementProps({
                ...anchorInteractions.getReferenceProps(),
                ...stateProps
            }),
            triggerProps: elementProps({
                "aria-haspopup": "dialog",
                "aria-expanded": open,
                ...triggerInteractions.getReferenceProps(),
                ...stateProps
            }),
            positionerProps: elementProps({
                ...triggerInteractions.getFloatingProps(),
                ...stateProps,
                style: floatingStyles
            }),
            arrowProps: elementProps({
                ...stateProps,
                style: arrowStyles
            }),
            closeButtonProps: buttonProps({
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

const PopoverContext = /*#__PURE__*/ createContext(null);
const PopoverProvider = PopoverContext.Provider;
function usePopoverContext({ strict = true } = {}) {
    const context = useContext(PopoverContext);
    if (!context && strict) {
        throw new Error("usePopoverContext must be used within a Popover");
    }
    return context;
}

const PopoverRoot = (props)=>{
    const { children, ...otherProps } = props;
    const api = usePopover(otherProps);
    return /*#__PURE__*/ jsx(PopoverProvider, {
        value: api,
        children: children
    });
};
const PopoverAnchor = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(api.refs.anchor, ref),
        ...mergeProps(api.anchorProps, props)
    });
});
PopoverAnchor.displayName = "PopoverAnchor";
const PopoverTrigger = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsx(Primitive.button, {
        ref: composeRefs(api.refs.trigger, ref),
        ...mergeProps(api.triggerProps, props)
    });
});
PopoverTrigger.displayName = "PopoverTrigger";
const PopoverPositioner = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(api.refs.positioner, ref),
        ...mergeProps(api.positionerProps, props)
    });
});
PopoverPositioner.displayName = "PopoverPositioner";
const PopoverPositionerPortal = /*#__PURE__*/ forwardRef(({ id, root, preserveTabOrder, ...otherProps }, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsx(FloatingPortal, {
        id: id,
        root: root,
        preserveTabOrder: preserveTabOrder,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: composeRefs(api.refs.positioner, ref),
            ...mergeProps(api.positionerProps, otherProps)
        })
    });
});
PopoverPositionerPortal.displayName = "PopoverPositionerPortal";
const PopoverArrow = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(api.refs.arrow, ref),
        ...mergeProps(api.arrowProps, props)
    });
});
PopoverArrow.displayName = "PopoverArrow";
const PopoverCloseButton = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = usePopoverContext();
    return /*#__PURE__*/ jsx(Primitive.button, {
        ref: ref,
        ...mergeProps(api.closeButtonProps, props)
    });
});

export { PopoverAnchor as P, PopoverArrow as a, PopoverCloseButton as b, PopoverPositioner as c, PopoverPositionerPortal as d, PopoverRoot as e, PopoverTrigger as f, usePopoverContext as u };
