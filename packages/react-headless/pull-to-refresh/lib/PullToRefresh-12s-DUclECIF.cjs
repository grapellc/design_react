'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grape-design/dom-utils');
var reactPrimitive = require('@grape-design/react-primitive');
var react = require('react');
var reactUseCallbackRef = require('@radix-ui/react-use-callback-ref');

const isTouchSupported = typeof window !== "undefined" && "ontouchstart" in window;
const touchMove = isTouchSupported ? "onTouchMove" : "onPointerMove";
const touchEnd = isTouchSupported ? "onTouchEnd" : "onPointerUp";
function isTouchEvent(e) {
    return e.type === "touchstart" || e.type === "touchmove" || e.type === "touchend";
}
function isLeftPress(e) {
    return isTouchEvent(e) ? e.touches.length === 1 : e.buttons === 1;
}
function getClientY(e) {
    return isTouchEvent(e) ? e.touches[0].clientY : e.clientY;
}

class Store {
    constructor(initialState){
        this.state = initialState;
        this.listeners = new Set();
    }
    // Get the current state
    getState() {
        return this.state;
    }
    // Update the state and notify subscribers
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        this.listeners.forEach((listener)=>listener());
    }
    // Subscribe to changes
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
}

const PREVENT_PULL_ATTRIBUTE = "data-seed-pull-to-refresh-prevent-pull";
const pullToRefreshPreventPull = {
    [PREVENT_PULL_ATTRIBUTE]: ""
};
const isPullPrevented = (el)=>{
    return el.closest(`[${PREVENT_PULL_ATTRIBUTE}]`) != null;
};

function usePullToRefreshState(props) {
    const threshold = props.threshold ?? 44;
    const displacementMultiplier = props.displacementMultiplier ?? 0.5;
    const disabled = props.disabled ?? false;
    // We use useSyncExternalStore to only re-render indicator area on drag
    const [contextStore] = react.useState(new Store({
        y0: 0,
        y: -1,
        displacement: 0,
        displacementRatio: 0
    }));
    const [state, setState] = react.useState("idle");
    const rootRef = react.useRef(null);
    const setContext = react.useCallback(({ y0, y, displacement })=>{
        contextStore.setState({
            y0,
            y,
            displacement,
            displacementRatio: Math.min(displacement / threshold, 1)
        });
        rootRef.current?.style.setProperty("--ptr-displacement", `${displacement}px`);
    }, [
        contextStore,
        threshold
    ]);
    const onPtrPullStart = reactUseCallbackRef.useCallbackRef(props.onPtrPullStart);
    const onPtrPullMove = reactUseCallbackRef.useCallbackRef(props.onPtrPullMove);
    const onPtrPullEnd = reactUseCallbackRef.useCallbackRef(props.onPtrPullEnd);
    const onPtrReady = reactUseCallbackRef.useCallbackRef(props.onPtrReady);
    const onPtrRefresh = reactUseCallbackRef.useCallbackRef(props.onPtrRefresh);
    const isPtrRefreshProvided = !!props.onPtrRefresh;
    const moveEvent = react.useCallback(({ y, scrollTop })=>{
        if (disabled) return;
        if (state === "idle") {
            const ctx = contextStore.getState();
            if (scrollTop <= 0 && ctx.y !== -1 && y > ctx.y) {
                setContext({
                    y0: y,
                    y,
                    displacement: 0
                });
                onPtrPullStart?.(contextStore.getState());
                setState("pulling");
            } else {
                contextStore.setState({
                    ...ctx,
                    y
                });
            }
        }
        if (state === "pulling" || state === "ready") {
            const { y0 } = contextStore.getState();
            const displacement = (y - y0) * displacementMultiplier;
            setContext({
                y0,
                y,
                displacement
            });
            onPtrPullMove?.(contextStore.getState());
            if (displacement > threshold) {
                setState("ready");
                onPtrReady?.();
            } else {
                setState("pulling");
            }
        }
    }, [
        state,
        contextStore,
        displacementMultiplier,
        threshold,
        disabled,
        setContext,
        onPtrPullStart,
        onPtrPullMove,
        onPtrReady
    ]);
    const endEvent = react.useCallback(()=>{
        if (disabled) return;
        if (state === "pulling" || state === "ready") {
            onPtrPullEnd?.(contextStore.getState());
        }
        if (state === "ready" && isPtrRefreshProvided) {
            setState("loading");
            setContext({
                y0: 0,
                y: -1,
                displacement: threshold
            });
            onPtrRefresh().then(()=>{
                setState("idle");
                setContext({
                    y0: 0,
                    y: -1,
                    displacement: 0
                });
            });
        } else if (state === "ready" || state === "pulling") {
            setState("idle");
            setContext({
                y0: 0,
                y: -1,
                displacement: 0
            });
        }
    }, [
        state,
        contextStore,
        threshold,
        disabled,
        isPtrRefreshProvided,
        setContext,
        onPtrPullEnd,
        onPtrRefresh
    ]);
    const disableEvent = react.useCallback(()=>{
        if (!disabled) return;
        // If loading, we let props.onPtrRefresh handle the state change.
        if (state === "pulling" || state === "ready") {
            setState("idle");
            setContext({
                y0: 0,
                y: -1,
                displacement: 0
            });
        }
    }, [
        disabled,
        state,
        setContext
    ]);
    const events = {
        move: moveEvent,
        end: endEvent,
        disable: disableEvent
    };
    react.useEffect(()=>{
        if (disabled) {
            events.disable();
        }
    }, [
        disabled,
        events.disable
    ]);
    return {
        state,
        threshold,
        refs: {
            root: rootRef
        },
        events,
        contextStore
    };
}
function usePullToRefresh(props) {
    const { state, threshold, refs, events, contextStore } = usePullToRefreshState(props);
    const isDragging = state === "pulling" || state === "ready";
    const stateProps = domUtils.elementProps({
        "data-ptr-state": state,
        "data-ptr-dragging": domUtils.dataAttr(isDragging)
    });
    return {
        state,
        refs,
        stateProps,
        rootProps: domUtils.elementProps({
            ...stateProps,
            [touchMove]: (e)=>{
                if (e.defaultPrevented) return;
                if (!isLeftPress(e)) return;
                if (e.target instanceof HTMLElement && isPullPrevented(e.target)) return;
                events.move({
                    y: getClientY(e),
                    scrollTop: e.currentTarget.scrollTop
                });
            },
            [touchEnd]: ()=>{
                events.end();
            },
            style: {
                overscrollBehaviorY: "none",
                overflowY: "auto"
            }
        }),
        indicatorProps: domUtils.elementProps({
            ...stateProps,
            style: {
                pointerEvents: "none",
                touchAction: "none",
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: `var(--ptr-size, ${threshold}px)`,
                marginBottom: `calc(var(--ptr-size, ${threshold}px) * -1)`
            }
        }),
        getIndicatorRenderProps: ()=>{
            const ctx = react.useSyncExternalStore((listener)=>contextStore.subscribe(listener), ()=>contextStore.getState(), ()=>contextStore.getState());
            return {
                minValue: 0,
                maxValue: 100,
                value: state === "loading" ? undefined : ctx.displacementRatio * 100,
                style: {
                    opacity: ctx.displacementRatio
                }
            };
        },
        contentProps: domUtils.elementProps({
            ...stateProps,
            style: {
                transform: state === "idle" ? undefined : "translateY(var(--ptr-displacement, 0))",
                transition: isDragging ? "none" : "transform var(--ptr-transition-duration, 0.3s)"
            }
        })
    };
}

const PullToRefreshContext = /*#__PURE__*/ react.createContext(null);
const PullToRefreshProvider = PullToRefreshContext.Provider;
function usePullToRefreshContext({ strict = true } = {}) {
    const context = react.useContext(PullToRefreshContext);
    if (!context && strict) {
        throw new Error("usePullToRefreshContext must be used within a PullToRefresh");
    }
    return context;
}

const PullToRefreshRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { displacementMultiplier, threshold, disabled, onPtrPullStart, onPtrPullMove, onPtrPullEnd, onPtrReady, onPtrRefresh, ...otherProps } = props;
    const api = usePullToRefresh({
        displacementMultiplier,
        threshold,
        disabled,
        onPtrPullStart,
        onPtrPullMove,
        onPtrPullEnd,
        onPtrReady,
        onPtrRefresh
    });
    return /*#__PURE__*/ jsxRuntime.jsx(PullToRefreshProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: reactComposeRefs.composeRefs(api.refs.root, ref),
            ...domUtils.mergeProps(api.rootProps, otherProps)
        })
    });
});
PullToRefreshRoot.displayName = "PullToRefreshRoot";
const PullToRefreshIndicator = (props)=>{
    const { children, ...otherProps } = props;
    const { indicatorProps, getIndicatorRenderProps } = usePullToRefreshContext();
    return /*#__PURE__*/ jsxRuntime.jsx("div", {
        ...domUtils.mergeProps(indicatorProps, otherProps),
        children: children(getIndicatorRenderProps())
    });
};
const PullToRefreshContent = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { contentProps } = usePullToRefreshContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...domUtils.mergeProps(contentProps, props)
    });
});
PullToRefreshContent.displayName = "PullToRefreshContent";

exports.PullToRefreshContent = PullToRefreshContent;
exports.PullToRefreshIndicator = PullToRefreshIndicator;
exports.PullToRefreshRoot = PullToRefreshRoot;
exports.pullToRefreshPreventPull = pullToRefreshPreventPull;
exports.usePullToRefreshContext = usePullToRefreshContext;
