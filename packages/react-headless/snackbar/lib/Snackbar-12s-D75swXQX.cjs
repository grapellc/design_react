'use client';
var jsxRuntime = require('react/jsx-runtime');
var domUtils = require('@grape-design/dom-utils');
var reactPrimitive = require('@grape-design/react-primitive');
var React = require('react');
var reactSupports = require('@grape-design/react-supports');
var reactComposeRefs = require('@radix-ui/react-compose-refs');

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

const SAFE_AREA_VARIABLE = "--seed-safe-area-bottom";
function getSafeOffset(rects, elementHeight, safeAreaBottom) {
    // If server-side rendering, return 0.
    if (typeof window === "undefined") {
        return 0;
    }
    const viewportHeight = window.innerHeight - safeAreaBottom;
    const sorted = rects.filter((rect)=>rect.top < viewportHeight).sort((a, b)=>b.bottom - a.bottom);
    // If there is no element, Snackbar should be shown at the bottom of the viewport.
    if (sorted.length === 0) {
        return 0;
    }
    const bottomGap = viewportHeight - sorted[0].bottom;
    // If the bottom gap is bigger than the element height,
    // it means that Snackbar can be shown at the bottom of the viewport.
    if (bottomGap > elementHeight) {
        return 0;
    }
    // Otherwise, we should check the gap between elements.
    // If the gap is bigger than the element height, Snackbar can be shown there.
    for(let i = 0; i < sorted.length - 1; i++){
        const current = sorted[i];
        const next = sorted[i + 1];
        const gap = current.top - next.bottom;
        if (gap > elementHeight) {
            return viewportHeight - current.top;
        }
    }
    // If there is not enough space between elements,
    // we should check the gap between the top of the viewport and the top of the element.
    if (sorted[sorted.length - 1].top > elementHeight) {
        return viewportHeight - sorted[sorted.length - 1].top;
    }
    // If none of the above conditions are met,
    // fallback to 0.
    return 0;
}
function useSafeOffset() {
    const [trackedEls, setTrackedEls] = React.useState({});
    const [regionHeight, setElementHeight] = React.useState(0);
    const regionRef = React.useRef(null);
    React.useEffect(()=>{
        const observer = new ResizeObserver((entries)=>{
            setElementHeight(entries[0].target.offsetHeight);
        });
        if (regionRef.current) {
            setElementHeight(regionRef.current.offsetHeight);
            observer.observe(regionRef.current);
        }
        return ()=>{
            observer.disconnect();
        };
    }, []);
    const safeOffset = React.useMemo(()=>{
        const els = Object.values(trackedEls);
        const rects = els.map((el)=>el.getBoundingClientRect());
        const safeAreaBottom = regionRef.current ? Number.parseInt(getComputedStyle(regionRef.current).getPropertyValue(SAFE_AREA_VARIABLE), 10) : 0;
        return getSafeOffset(rects, regionHeight, safeAreaBottom);
    }, [
        trackedEls,
        regionHeight
    ]);
    const overlapTracker = React.useMemo(()=>({
            upsert: (id, el)=>{
                setTrackedEls((prev)=>({
                        ...prev,
                        [id]: el
                    }));
            },
            remove: (id)=>{
                setTrackedEls((prev)=>{
                    const { [id]: removed, ...rest } = prev;
                    return rest;
                });
            },
            forceUpdate: ()=>{
                setTrackedEls((prev)=>({
                        ...prev
                    }));
            }
        }), []);
    return {
        safeOffset,
        overlapTracker,
        regionRef,
        regionStyle: React.useMemo(()=>({
                [SAFE_AREA_VARIABLE]: "env(safe-area-inset-bottom)"
            }), [])
    };
}

function useSnackbarState({ pauseOnInteraction = true }) {
    const [state, setState] = React.useState("inactive");
    const [queue, setQueue] = React.useState([]);
    const [currentSnackbar, setCurrentSnackbar] = React.useState(null);
    const visibleDuration = currentSnackbar?.timeout ?? 5000;
    const removeDelay = currentSnackbar?.removeDelay ?? 200;
    const visible = state === "active" || state === "persist";
    // actions
    const push = React.useCallback((option)=>{
        setQueue((prev)=>[
                ...prev,
                option
            ]);
    }, []);
    const pop = React.useCallback(()=>{
        setQueue(([snackbar, ...rest])=>{
            setCurrentSnackbar(snackbar ?? null);
            return rest;
        });
    }, []);
    const removeCurrentSnackbar = React.useCallback(()=>{
        setCurrentSnackbar(null);
    }, []);
    const invokeOnClose = React.useCallback(()=>{
        if (currentSnackbar?.onClose) {
            currentSnackbar.onClose();
        }
    }, [
        currentSnackbar
    ]);
    // entry events
    React.useEffect(()=>{
        if (state === "inactive") {
            if (queue.length >= 1) {
                pop();
                setState("active");
            }
        }
        if (state === "active") {
            const timeout = setTimeout(()=>{
                setState("dismissing");
            }, visibleDuration);
            return ()=>clearTimeout(timeout);
        }
        if (state === "dismissing") {
            const timeout = setTimeout(()=>{
                setState("inactive");
                invokeOnClose();
                removeCurrentSnackbar();
            }, removeDelay);
            return ()=>clearTimeout(timeout);
        }
    }, [
        state,
        queue,
        visibleDuration,
        removeDelay,
        pop,
        invokeOnClose,
        removeCurrentSnackbar
    ]);
    // events
    const events = React.useMemo(()=>({
            push: (option)=>{
                push(option);
                if (state === "inactive") {
                    pop();
                    setState("active");
                }
            },
            pause: ()=>{
                if (state === "active") {
                    if (pauseOnInteraction) {
                        setState("persist");
                    }
                }
            },
            resume: ()=>{
                if (state === "persist") {
                    setState("active");
                }
            },
            dismiss: ()=>{
                if (state === "active" || state === "persist") {
                    setState("dismissing");
                    invokeOnClose();
                }
            }
        }), [
        state,
        push,
        pop,
        invokeOnClose,
        pauseOnInteraction
    ]);
    return React.useMemo(()=>({
            state,
            currentSnackbar,
            visible,
            visibleDuration,
            queue,
            events
        }), [
        state,
        currentSnackbar,
        visible,
        visibleDuration,
        queue,
        events
    ]);
}
function useSnackbar(props) {
    const { state, currentSnackbar, visible, queue, visibleDuration, events } = useSnackbarState(props);
    const { overlapTracker, regionRef, regionStyle, safeOffset } = useSafeOffset();
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    return React.useMemo(()=>({
            refs: {
                regionRef
            },
            visible,
            queue,
            currentSnackbar,
            overlapTracker,
            safeOffset,
            create (options) {
                events.push(options);
            },
            dismiss () {
                events.dismiss();
            },
            regionProps: domUtils.elementProps({
                tabIndex: -1,
                "aria-live": "polite",
                role: "region",
                style: {
                    ...regionStyle,
                    "--snackbar-region-offset": `${safeOffset}px`,
                    pointerEvents: currentSnackbar ? undefined : "none",
                    position: "fixed"
                }
            }),
            rootProps: domUtils.elementProps({
                "data-open": domUtils.dataAttr(visible),
                role: "status",
                "aria-atomic": "true",
                // Hide toasts that are animating out so VoiceOver doesn't announce them.
                "aria-hidden": domUtils.ariaAttr(state === "dismissing"),
                tabIndex: 0,
                style: {
                    position: "relative",
                    pointerEvents: "auto",
                    "--snackbar-remove-delay": `${currentSnackbar?.removeDelay ?? 0}ms`,
                    "--snackbar-duration": `${visibleDuration}ms`
                },
                onFocus (event) {
                    // if :focus-visible not supported, do not pause on focus
                    if (!isFocusVisibleSupported) return;
                    // only pause if focus is visible (focused using keyboard) || action label has focus
                    if (event.target.matches(":focus-visible")) {
                        events.pause();
                    }
                },
                onBlur () {
                    events.resume();
                },
                onPointerEnter () {
                    events.pause();
                },
                onPointerLeave () {
                    events.resume();
                }
            }),
            closeButtonProps: domUtils.buttonProps({
                type: "button",
                onClick () {
                    events.dismiss();
                }
            })
        }), [
        visible,
        queue,
        currentSnackbar,
        events,
        visibleDuration,
        state,
        safeOffset,
        regionStyle,
        overlapTracker,
        regionRef,
        isFocusVisibleSupported
    ]);
}

const SnackbarContext = /*#__PURE__*/ React.createContext(null);
const SnackbarProvider = SnackbarContext.Provider;
function useSnackbarContext({ strict = true } = {}) {
    const context = React.useContext(SnackbarContext);
    if (!context && strict) {
        throw new Error("useSnackbarContext must be used within a SnackbarProvider");
    }
    return context;
}

const SnackbarRootProvider = ({ children, pauseOnInteraction })=>{
    const api = useSnackbar({
        pauseOnInteraction
    });
    return /*#__PURE__*/ jsxRuntime.jsx(SnackbarProvider, {
        value: api,
        children: children
    });
};
const SnackbarRegion = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useSnackbarContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: reactComposeRefs.composeRefs(api.refs.regionRef, ref),
        ...domUtils.mergeProps(api.regionProps, props)
    });
});
SnackbarRegion.displayName = "SnackbarRegion";
const SnackbarRenderer = (_props)=>{
    const api = useSnackbarContext();
    return api.currentSnackbar?.render();
};
const SnackbarRoot = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useSnackbarContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...domUtils.mergeProps(api.rootProps, props)
    });
});
const SnackbarCloseButton = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { closeButtonProps } = useSnackbarContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: ref,
        ...domUtils.mergeProps(closeButtonProps, props)
    });
});
const SnackbarAvoidOverlap = (props)=>{
    const { children } = props;
    const { overlapTracker } = useSnackbarContext();
    const id = React.useId();
    const childRef = React.useRef(null);
    React.useEffect(()=>{
        const observer = new ResizeObserver((entries)=>{
            overlapTracker.upsert(id, entries[0].target);
        });
        if (childRef.current) {
            overlapTracker.upsert(id, childRef.current);
            observer.observe(childRef.current, {
                box: "border-box"
            });
        }
        return ()=>{
            overlapTracker.remove(id);
            observer.disconnect();
        };
    }, [
        overlapTracker,
        id
    ]);
    return /*#__PURE__*/ React__namespace.cloneElement(children, {
        ref: childRef
    });
};

exports.SnackbarAvoidOverlap = SnackbarAvoidOverlap;
exports.SnackbarCloseButton = SnackbarCloseButton;
exports.SnackbarRegion = SnackbarRegion;
exports.SnackbarRenderer = SnackbarRenderer;
exports.SnackbarRoot = SnackbarRoot;
exports.SnackbarRootProvider = SnackbarRootProvider;
exports.useSnackbarContext = useSnackbarContext;
