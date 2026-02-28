'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var react = require('react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');
var reactUseLayoutEffect = require('@radix-ui/react-use-layout-effect');

const getContentId = (id)=>`collapsible:${id}:content`;

function useCollapsibleState(props) {
    const [open, setOpen] = reactUseControllableState.useControllableState({
        prop: props.open,
        defaultProp: props.defaultOpen ?? false,
        onChange: props.onOpenChange
    });
    return react.useMemo(()=>({
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
    const id = react.useId();
    const contentId = getContentId(id);
    const contentRef = react.useRef(null);
    const [height, setHeight] = react.useState(undefined);
    const [visible, setVisible] = react.useState(open);
    const hidden = !open && !visible;
    reactUseLayoutEffect.useLayoutEffect(()=>{
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
    react.useEffect(()=>{
        if (!open) return;
        // When expanded, immediately show to allow transition
        setVisible(true);
    }, [
        open
    ]);
    const panelHeight = open ? `${height}px` : "0px";
    const stateProps = react.useMemo(()=>domUtils.elementProps({
            "data-collapsible": "",
            "data-open": domUtils.dataAttr(open),
            "data-disabled": domUtils.dataAttr(disabled)
        }), [
        open,
        disabled
    ]);
    return react.useMemo(()=>({
            open,
            setOpen,
            disabled,
            stateProps,
            triggerAriaProps: domUtils.elementProps({
                "aria-expanded": open,
                "aria-controls": contentId,
                "aria-disabled": disabled
            }),
            triggerHandlers: domUtils.elementProps({
                onClick: (event)=>{
                    if (event.defaultPrevented) return;
                    if (disabled) return;
                    setOpen((prev)=>!prev);
                }
            }),
            contentProps: domUtils.elementProps({
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

const CollapsibleContext = /*#__PURE__*/ react.createContext(null);
const CollapsibleProvider = CollapsibleContext.Provider;
function useCollapsibleContext({ strict = true } = {}) {
    const context = react.useContext(CollapsibleContext);
    if (!context && strict) {
        throw new Error("useCollapsibleContext must be used within a CollapsibleRoot");
    }
    return context;
}

const CollapsibleRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { open, defaultOpen, onOpenChange, disabled, ...otherProps } = props;
    const api = useCollapsible({
        open,
        defaultOpen,
        onOpenChange,
        disabled
    });
    return /*#__PURE__*/ jsxRuntime.jsx(CollapsibleProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...domUtils.mergeProps(api.stateProps, otherProps)
        })
    });
});
CollapsibleRoot.displayName = "CollapsibleRoot";
const CollapsibleTrigger = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = useCollapsibleContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: ref,
        ...domUtils.mergeProps(api.stateProps, api.triggerAriaProps, api.triggerHandlers, props)
    });
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
const CollapsibleContent = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const api = useCollapsibleContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(ref, api.refs.content),
        ...domUtils.mergeProps(api.contentProps, props)
    });
});
CollapsibleContent.displayName = "CollapsibleContent";

exports.CollapsibleContent = CollapsibleContent;
exports.CollapsibleProvider = CollapsibleProvider;
exports.CollapsibleRoot = CollapsibleRoot;
exports.CollapsibleTrigger = CollapsibleTrigger;
exports.useCollapsible = useCollapsible;
exports.useCollapsibleContext = useCollapsibleContext;
