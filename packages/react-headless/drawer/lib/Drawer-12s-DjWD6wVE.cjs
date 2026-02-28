'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var DialogPrimitive = require('@radix-ui/react-dialog');
var reactUseCallbackRef = require('@radix-ui/react-use-callback-ref');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var React = require('react');
var reactUseControllableState = require('@grapu-design/react-use-controllable-state');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

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

var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);
var React__default = /*#__PURE__*/_interopDefault(React);

function isMobileFirefox() {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return /Firefox/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent) || /FxiOS/.test(navigator.userAgent);
}
function isMac() {
    return testPlatform(/^Mac/);
}
function isIPhone() {
    return testPlatform(/^iPhone/);
}
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function isIPad() {
    return testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
    return isIPhone() || isIPad();
}
function isAndroid() {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return /Android/.test(navigator.userAgent);
}
// TODO: use userAgent instead?
function testPlatform(re) {
    return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.platform) : undefined;
}

/**
 * TODO: move to recipe
 */ const TRANSITIONS = {
    ENTER_DURATION: 0.3,
    EXIT_DURATION: 0.2,
    OVERLAY_ENTER_TIMING_FUNCTION: "cubic-bezier(0, 0, 0.15, 1)",
    OVERLAY_EXIT_TIMING_FUNCTION: "cubic-bezier(0.35, 0, 1, 1)",
    CONTENT_ENTER_TIMING_FUNCTION: "cubic-bezier(0.03, 0.4, 0.1, 1)",
    CONTENT_EXIT_TIMING_FUNCTION: "cubic-bezier(0.35, 0, 1, 1)"
};
const VELOCITY_THRESHOLD = 0.4;
const CLOSE_THRESHOLD = 0.25;
const SCROLL_LOCK_TIMEOUT = 100;
const WINDOW_TOP_OFFSET = 26;
const DRAG_CLASS = "seed-dragging";

const cache = new WeakMap();
// HTML input types that do not cause the software keyboard to appear.
const nonTextInputTypes = new Set([
    "checkbox",
    "radio",
    "range",
    "color",
    "file",
    "image",
    "button",
    "submit",
    "reset"
]);
function isInput(target) {
    return target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
function set(el, styles, ignoreCache = false) {
    if (!el || !(el instanceof HTMLElement)) return;
    let originalStyles = {};
    Object.entries(styles).forEach(([key, value])=>{
        if (key.startsWith("--")) {
            el.style.setProperty(key, value);
            return;
        }
        originalStyles[key] = el.style[key];
        el.style[key] = value;
    });
    if (ignoreCache) return;
    cache.set(el, originalStyles);
}
function reset(el, prop) {
    if (!el || !(el instanceof HTMLElement)) return;
    let originalStyles = cache.get(el);
    if (!originalStyles) {
        return;
    }
    {
        el.style[prop] = originalStyles[prop];
    }
}
const isVertical = (direction)=>{
    switch(direction){
        case "top":
        case "bottom":
            return true;
        case "left":
        case "right":
            return false;
        default:
            return direction;
    }
};
function getTranslate(element, direction) {
    if (!element) {
        return null;
    }
    const style = window.getComputedStyle(element);
    const transform = // @ts-ignore
    style.transform || style.webkitTransform || style.mozTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
        return Number.parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
    }
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? Number.parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
function dampenValue(v) {
    return 8 * (Math.log(v + 1) - 2);
}

// This code comes from https://github.com/emilkowalski/vaul/blob/main/src/use-position-fixed.ts
let previousBodyPosition = null;
/**
 * This hook is necessary to prevent buggy behavior on iOS devices (need to test on Android).
 * I won't get into too much detail about what bugs it solves, but so far I've found that setting the body to `position: fixed` is the most reliable way to prevent those bugs.
 * Issues that this hook solves:
 * https://github.com/emilkowalski/vaul/issues/435
 * https://github.com/emilkowalski/vaul/issues/433
 * And more that I discovered, but were just not reported.
 */ function usePositionFixed({ isOpen, modal, nested, hasBeenOpened, preventScrollRestoration, noBodyStyles }) {
    const [activeUrl, setActiveUrl] = React__default.default.useState(()=>typeof window !== "undefined" ? window.location.href : "");
    const scrollPos = React__default.default.useRef(0);
    const setPositionFixed = React__default.default.useCallback(()=>{
        // All browsers on iOS will return true here.
        if (!isSafari()) return;
        // If previousBodyPosition is already set, don't set it again.
        if (previousBodyPosition === null && isOpen && !noBodyStyles) {
            previousBodyPosition = {
                position: document.body.style.position,
                top: document.body.style.top,
                left: document.body.style.left,
                height: document.body.style.height,
                right: "unset"
            };
            // Update the dom inside an animation frame
            const { scrollX, innerHeight } = window;
            document.body.style.setProperty("position", "fixed", "important");
            Object.assign(document.body.style, {
                top: `${-scrollPos.current}px`,
                left: `${-scrollX}px`,
                right: "0px",
                height: "auto"
            });
            window.setTimeout(()=>window.requestAnimationFrame(()=>{
                    // Attempt to check if the bottom bar appeared due to the position change
                    const bottomBarHeight = innerHeight - window.innerHeight;
                    if (bottomBarHeight && scrollPos.current >= innerHeight) {
                        // Move the content further up so that the bottom bar doesn't hide it
                        document.body.style.top = `${-(scrollPos.current + bottomBarHeight)}px`;
                    }
                }), 300);
        }
    }, [
        isOpen
    ]);
    const restorePositionSetting = React__default.default.useCallback(()=>{
        // All browsers on iOS will return true here.
        if (!isSafari()) return;
        if (previousBodyPosition !== null && !noBodyStyles) {
            // Convert the position from "px" to Int
            const y = -parseInt(document.body.style.top, 10);
            const x = -parseInt(document.body.style.left, 10);
            // Restore styles
            Object.assign(document.body.style, previousBodyPosition);
            window.requestAnimationFrame(()=>{
                if (preventScrollRestoration && activeUrl !== window.location.href) {
                    setActiveUrl(window.location.href);
                    return;
                }
                window.scrollTo(x, y);
            });
            previousBodyPosition = null;
        }
    }, [
        activeUrl
    ]);
    React__default.default.useEffect(()=>{
        function onScroll() {
            scrollPos.current = window.scrollY;
        }
        onScroll();
        window.addEventListener("scroll", onScroll);
        return ()=>{
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
    React__default.default.useEffect(()=>{
        if (!modal) return;
        return ()=>{
            if (typeof document === "undefined") return;
            // Another drawer is opened, safe to ignore the execution
            const hasDrawerOpened = !!document.querySelector("[data-drawer]");
            if (hasDrawerOpened) return;
            restorePositionSetting();
        };
    }, [
        modal,
        restorePositionSetting
    ]);
    React__default.default.useEffect(()=>{
        if (nested || !hasBeenOpened) return;
        // This is needed to force Safari toolbar to show **before** the drawer starts animating to prevent a gnarly shift from happening
        if (isOpen) {
            // avoid for standalone mode (PWA)
            const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
            !isStandalone && setPositionFixed();
            if (!modal) {
                window.setTimeout(()=>{
                    restorePositionSetting();
                }, 500);
            }
        } else {
            restorePositionSetting();
        }
    }, [
        isOpen,
        hasBeenOpened,
        activeUrl,
        modal,
        nested,
        setPositionFixed,
        restorePositionSetting
    ]);
    return {
        restorePositionSetting
    };
}

function useSnapPoints({ activeSnapPointProp, setActiveSnapPointProp, snapPoints, drawerRef, overlayRef, fadeFromIndex, onSnapPointChange, direction = "bottom", container, snapToSequentialPoint }) {
    const [activeSnapPoint, setActiveSnapPoint] = reactUseControllableState.useControllableState({
        prop: activeSnapPointProp,
        defaultProp: snapPoints?.[0] ?? null,
        onChange: setActiveSnapPointProp
    });
    const [windowDimensions, setWindowDimensions] = React__default.default.useState(typeof window !== "undefined" ? {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
    } : undefined);
    React__default.default.useEffect(()=>{
        function onResize() {
            setWindowDimensions({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
            });
        }
        window.addEventListener("resize", onResize);
        return ()=>window.removeEventListener("resize", onResize);
    }, []);
    const isLastSnapPoint = React__default.default.useMemo(()=>activeSnapPoint === snapPoints?.[snapPoints.length - 1] || null, [
        snapPoints,
        activeSnapPoint
    ]);
    const activeSnapPointIndex = React__default.default.useMemo(()=>snapPoints?.findIndex((snapPoint)=>snapPoint === activeSnapPoint) ?? null, [
        snapPoints,
        activeSnapPoint
    ]);
    const shouldFade = snapPoints && snapPoints.length > 0 && (fadeFromIndex || fadeFromIndex === 0) && !Number.isNaN(fadeFromIndex) && snapPoints[fadeFromIndex] === activeSnapPoint || !snapPoints;
    const snapPointsOffset = React__default.default.useMemo(()=>{
        const containerSize = container ? {
            width: container.getBoundingClientRect().width,
            height: container.getBoundingClientRect().height
        } : typeof window !== "undefined" ? {
            width: window.innerWidth,
            height: window.innerHeight
        } : {
            width: 0,
            height: 0
        };
        return snapPoints?.map((snapPoint)=>{
            // FIXME
            // 1 -> container 100% << expected
            // 0.5 -> container 50% << expected
            // 300px -> 300 -> 300px << expected
            // 15rem -> 15 -> 15px << this makes no sense, should fix or disallow
            const isPx = typeof snapPoint === "string";
            let snapPointAsNumber = 0;
            if (isPx) {
                snapPointAsNumber = Number.parseInt(snapPoint, 10);
            }
            if (isVertical(direction)) {
                const height = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.height : 0;
                if (windowDimensions) {
                    return direction === "bottom" ? containerSize.height - height : -containerSize.height + height;
                }
                return height;
            }
            const width = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.width : 0;
            if (windowDimensions) {
                return direction === "right" ? containerSize.width - width : -containerSize.width + width;
            }
            return width;
        }) ?? [];
    }, [
        snapPoints,
        windowDimensions,
        container,
        direction
    ]);
    const activeSnapPointOffset = React__default.default.useMemo(()=>activeSnapPointIndex !== null ? snapPointsOffset?.[activeSnapPointIndex] : null, [
        snapPointsOffset,
        activeSnapPointIndex
    ]);
    const snapToPoint = React__default.default.useCallback((dimension)=>{
        const newSnapPointIndex = snapPointsOffset?.findIndex((snapPointDim)=>snapPointDim === dimension) ?? null;
        onSnapPointChange(newSnapPointIndex);
        set(drawerRef.current, {
            transition: `transform ${TRANSITIONS.ENTER_DURATION}s ${TRANSITIONS.CONTENT_ENTER_TIMING_FUNCTION}`,
            transform: isVertical(direction) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
        });
        if (snapPointsOffset && newSnapPointIndex !== snapPointsOffset.length - 1 && fadeFromIndex !== undefined && newSnapPointIndex !== fadeFromIndex && newSnapPointIndex < fadeFromIndex) {
            if (fadeFromIndex !== 0) {
                set(overlayRef.current, {
                    transition: `opacity ${TRANSITIONS.EXIT_DURATION}s ${TRANSITIONS.OVERLAY_EXIT_TIMING_FUNCTION}`,
                    opacity: "0"
                });
            }
        } else {
            set(overlayRef.current, {
                transition: `opacity ${TRANSITIONS.ENTER_DURATION}s ${TRANSITIONS.OVERLAY_ENTER_TIMING_FUNCTION}`,
                opacity: "1"
            });
        }
        setActiveSnapPoint(snapPoints?.[Math.max(newSnapPointIndex, 0)]);
    }, [
        drawerRef,
        overlayRef,
        snapPoints,
        snapPointsOffset,
        fadeFromIndex,
        direction,
        onSnapPointChange,
        setActiveSnapPoint
    ]);
    React__default.default.useEffect(()=>{
        if (activeSnapPoint || activeSnapPointProp) {
            const newIndex = snapPoints?.findIndex((snapPoint)=>snapPoint === activeSnapPointProp || snapPoint === activeSnapPoint) ?? -1;
            if (snapPointsOffset && newIndex !== -1 && typeof snapPointsOffset[newIndex] === "number") {
                snapToPoint(snapPointsOffset[newIndex]);
            }
        }
    }, [
        activeSnapPoint,
        activeSnapPointProp,
        snapPoints,
        snapPointsOffset,
        snapToPoint
    ]);
    function onRelease({ draggedDistance, closeDrawer, velocity, dismissible, event }) {
        if (fadeFromIndex === undefined) return;
        const currentPosition = direction === "bottom" || direction === "right" ? (activeSnapPointOffset ?? 0) - draggedDistance : (activeSnapPointOffset ?? 0) + draggedDistance;
        const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
        const isFirst = activeSnapPointIndex === 0;
        const hasDraggedUp = draggedDistance > 0;
        if (isOverlaySnapPoint) {
            set(overlayRef.current, {
                transition: `opacity ${TRANSITIONS.EXIT_DURATION}s ${TRANSITIONS.OVERLAY_EXIT_TIMING_FUNCTION}`
            });
        }
        if (!snapToSequentialPoint && velocity > 2 && !hasDraggedUp) {
            if (dismissible) closeDrawer(false, {
                reason: "drag",
                event
            });
            else snapToPoint(snapPointsOffset[0]); // snap to initial point
            return;
        }
        if (!snapToSequentialPoint && velocity > 2 && hasDraggedUp && snapPointsOffset && snapPoints) {
            snapToPoint(snapPointsOffset[snapPoints.length - 1]);
            return;
        }
        // Find the closest snap point to the current position
        const closestSnapPoint = snapPointsOffset?.reduce((prev, curr)=>{
            if (typeof prev !== "number" || typeof curr !== "number") return prev;
            return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
        });
        const dim = isVertical(direction) ? window.innerHeight : window.innerWidth;
        if (velocity > VELOCITY_THRESHOLD && Math.abs(draggedDistance) < dim * 0.4) {
            const dragDirection = hasDraggedUp ? 1 : -1; // 1 = up, -1 = down
            // Don't do anything if we swipe upwards while being on the last snap point
            if (dragDirection > 0 && isLastSnapPoint && snapPoints) {
                snapToPoint(snapPointsOffset[snapPoints.length - 1]);
                return;
            }
            if (isFirst && dragDirection < 0 && dismissible) {
                closeDrawer(false, {
                    reason: "drag",
                    event
                });
            }
            if (activeSnapPointIndex === null) return;
            snapToPoint(snapPointsOffset[activeSnapPointIndex + dragDirection]);
            return;
        }
        snapToPoint(closestSnapPoint);
    }
    function onDrag({ draggedDistance }) {
        if (activeSnapPointOffset === null) return;
        const newValue = direction === "bottom" || direction === "right" ? activeSnapPointOffset - draggedDistance : activeSnapPointOffset + draggedDistance;
        // Don't do anything if we exceed the last(biggest) snap point
        if ((direction === "bottom" || direction === "right") && newValue < snapPointsOffset[snapPointsOffset.length - 1]) {
            return;
        }
        if ((direction === "top" || direction === "left") && newValue > snapPointsOffset[snapPointsOffset.length - 1]) {
            return;
        }
        set(drawerRef.current, {
            transform: isVertical(direction) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)`
        });
    }
    function getPercentageDragged(absDraggedDistance, isDraggingDown) {
        if (!snapPoints || typeof activeSnapPointIndex !== "number" || !snapPointsOffset || fadeFromIndex === undefined) return null;
        // If this is true we are dragging to a snap point that is supposed to have an overlay
        const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
        const isOverlaySnapPointOrHigher = activeSnapPointIndex >= fadeFromIndex;
        if (isOverlaySnapPointOrHigher && isDraggingDown) {
            return 0;
        }
        // Don't animate, but still use this one if we are dragging away from the overlaySnapPoint
        if (isOverlaySnapPoint && !isDraggingDown) return 1;
        if (!shouldFade && !isOverlaySnapPoint) return null;
        // Either fadeFrom index or the one before
        const targetSnapPointIndex = isOverlaySnapPoint ? activeSnapPointIndex + 1 : activeSnapPointIndex - 1;
        if (fadeFromIndex === 0 && activeSnapPointIndex === 0) {
            let firstSnapPoint = snapPoints[0];
            if (typeof firstSnapPoint === "string") {
                firstSnapPoint = Number.parseInt(firstSnapPoint, 10);
            }
            const snapPointDistance = firstSnapPoint;
            const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
            return percentageDragged;
        }
        // Get the distance from overlaySnapPoint to the one before or vice-versa to calculate the opacity percentage accordingly
        const snapPointDistance = isOverlaySnapPoint ? snapPointsOffset[targetSnapPointIndex] - snapPointsOffset[targetSnapPointIndex - 1] : snapPointsOffset[targetSnapPointIndex + 1] - snapPointsOffset[targetSnapPointIndex];
        const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
        if (isOverlaySnapPoint) {
            return 1 - percentageDragged;
        }
        return percentageDragged;
    }
    return {
        isLastSnapPoint,
        activeSnapPoint,
        shouldFade,
        getPercentageDragged,
        setActiveSnapPoint,
        activeSnapPointIndex,
        onRelease,
        onDrag,
        snapPointsOffset
    };
}

function useDrawer(props) {
    const { open: openProp, onOpenChange, onDrag: onDragProp, onRelease: onReleaseProp, snapPoints, closeThreshold = CLOSE_THRESHOLD, scrollLockTimeout = SCROLL_LOCK_TIMEOUT, dismissible = true, handleOnly = false, fadeFromIndex = snapPoints && snapPoints.length - 1, activeSnapPoint: activeSnapPointProp, setActiveSnapPoint: setActiveSnapPointProp, fixed, modal = true, onClose, nested, noBodyStyles = true, direction = "bottom", defaultOpen = false, snapToSequentialPoint = false, preventScrollRestoration = false, repositionInputs = true, onAnimationEnd, container, autoFocus = false, closeOnInteractOutside = true, closeOnEscape = true } = props;
    const [isOpen = false, setIsOpen] = reactUseControllableState.useControllableState({
        defaultProp: defaultOpen,
        prop: openProp,
        onChange: (o, details)=>{
            onOpenChange?.(o, details);
            if (!o && !nested) {
                restorePositionSetting();
            }
            setTimeout(()=>{
                onAnimationEnd?.(o);
            }, TRANSITIONS.EXIT_DURATION * 1000);
            if (o && !modal) {
                if (typeof window !== "undefined") {
                    window.requestAnimationFrame(()=>{
                        document.body.style.pointerEvents = "auto";
                    });
                }
            }
            if (!o) {
                document.body.style.pointerEvents = "auto";
            }
        }
    });
    const [hasBeenOpened, setHasBeenOpened] = React.useState(false);
    const [hasAnimationDone, setHasAnimationDone] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [shouldOverlayAnimate, setShouldOverlayAnimate] = React.useState(false);
    const [isCloseButtonRendered, setIsCloseButtonRendered] = React.useState(false);
    const closeButtonRef = React.useCallback((node)=>{
        setIsCloseButtonRendered(!!node);
    }, []);
    const overlayRef = React.useRef(null);
    const openTime = React.useRef(null);
    const dragStartTime = React.useRef(null);
    const dragEndTime = React.useRef(null);
    const lastTimeDragPrevented = React.useRef(null);
    const isAllowedToDrag = React.useRef(false);
    const pointerStart = React.useRef(0);
    const keyboardIsOpen = React.useRef(false);
    const previousDiffFromInitial = React.useRef(0);
    const drawerRef = React.useRef(null);
    const drawerHeightRef = React.useRef(drawerRef.current?.getBoundingClientRect().height || 0);
    const drawerWidthRef = React.useRef(drawerRef.current?.getBoundingClientRect().width || 0);
    const initialDrawerHeight = React.useRef(0);
    const onSnapPointChange = React.useCallback((activeSnapPointIndex)=>{
        if (snapPoints && activeSnapPointIndex === snapPointsOffset.length - 1) {
            openTime.current = new Date();
        }
    }, [
        snapPoints
    ]);
    const { activeSnapPoint, activeSnapPointIndex, setActiveSnapPoint, onRelease: onReleaseSnapPoints, snapPointsOffset, onDrag: onDragSnapPoints, shouldFade, getPercentageDragged: getSnapPointsPercentageDragged } = useSnapPoints({
        snapPoints,
        activeSnapPointProp,
        setActiveSnapPointProp,
        drawerRef,
        fadeFromIndex,
        overlayRef,
        onSnapPointChange,
        direction,
        snapToSequentialPoint
    });
    const { restorePositionSetting } = usePositionFixed({
        isOpen,
        modal,
        nested: nested ?? false,
        hasBeenOpened,
        preventScrollRestoration,
        noBodyStyles
    });
    function onPress(event) {
        if (!dismissible && !snapPoints) return;
        if (drawerRef.current && !drawerRef.current.contains(event.target)) return;
        drawerHeightRef.current = drawerRef.current?.getBoundingClientRect().height || 0;
        drawerWidthRef.current = drawerRef.current?.getBoundingClientRect().width || 0;
        setIsDragging(true);
        dragStartTime.current = new Date();
        if (isIOS()) {
            window.addEventListener("touchend", ()=>{
                isAllowedToDrag.current = false;
            }, {
                once: true
            });
        }
        event.target.setPointerCapture(event.pointerId);
        pointerStart.current = isVertical(direction) ? event.pageY : event.pageX;
    }
    function shouldDrag(el, isDraggingInDirection) {
        let element = el;
        const highlightedText = window.getSelection()?.toString();
        const swipeAmount = drawerRef.current ? getTranslate(drawerRef.current, direction) : null;
        const date = new Date();
        if (element.tagName === "SELECT") {
            return false;
        }
        if (element.hasAttribute("data-no-drag") || element.closest("[data-no-drag]")) {
            return false;
        }
        if (direction === "right" || direction === "left") {
            return true;
        }
        if (openTime.current && date.getTime() - openTime.current.getTime() < 500) {
            return false;
        }
        if (swipeAmount !== null) {
            if (direction === "bottom" ? swipeAmount > 0 : swipeAmount < 0) {
                return true;
            }
        }
        if (highlightedText && highlightedText.length > 0) {
            return false;
        }
        if (lastTimeDragPrevented.current && date.getTime() - lastTimeDragPrevented.current.getTime() < scrollLockTimeout && swipeAmount === 0) {
            lastTimeDragPrevented.current = date;
            return false;
        }
        if (isDraggingInDirection) {
            lastTimeDragPrevented.current = date;
            return false;
        }
        while(element){
            if (element.scrollHeight > element.clientHeight) {
                if (element.scrollTop !== 0) {
                    lastTimeDragPrevented.current = new Date();
                    return false;
                }
                if (element.getAttribute("role") === "dialog") {
                    return true;
                }
            }
            element = element.parentNode;
        }
        return true;
    }
    function onDrag(event) {
        if (!drawerRef.current) return;
        if (isDragging) {
            const directionMultiplier = direction === "bottom" || direction === "right" ? 1 : -1;
            const draggedDistance = (pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX)) * directionMultiplier;
            const isDraggingInDirection = draggedDistance > 0;
            const noCloseSnapPointsPreCondition = snapPoints && !dismissible && !isDraggingInDirection;
            if (noCloseSnapPointsPreCondition && activeSnapPointIndex === 0) return;
            const absDraggedDistance = Math.abs(draggedDistance);
            const drawerDimension = direction === "bottom" || direction === "top" ? drawerHeightRef.current : drawerWidthRef.current;
            let percentageDragged = absDraggedDistance / drawerDimension;
            const snapPointPercentageDragged = getSnapPointsPercentageDragged(absDraggedDistance, isDraggingInDirection);
            if (snapPointPercentageDragged !== null) {
                percentageDragged = snapPointPercentageDragged;
            }
            if (noCloseSnapPointsPreCondition && percentageDragged >= 1) {
                return;
            }
            if (!isAllowedToDrag.current && !shouldDrag(event.target, isDraggingInDirection)) return;
            drawerRef.current.classList.add(DRAG_CLASS);
            isAllowedToDrag.current = true;
            set(drawerRef.current, {
                transition: "none"
            });
            set(overlayRef.current, {
                transition: "none"
            });
            if (snapPoints) {
                onDragSnapPoints({
                    draggedDistance
                });
            }
            if (isDraggingInDirection && !snapPoints) {
                const dampenedDraggedDistance = dampenValue(draggedDistance);
                const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
                set(drawerRef.current, {
                    transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
                });
                return;
            }
            const opacityValue = 1 - percentageDragged;
            if (shouldFade || fadeFromIndex && activeSnapPointIndex === fadeFromIndex - 1) {
                onDragProp?.(event, percentageDragged);
                set(overlayRef.current, {
                    opacity: `${opacityValue}`,
                    transition: "none"
                }, true);
            }
            if (!snapPoints) {
                const translateValue = absDraggedDistance * directionMultiplier;
                set(drawerRef.current, {
                    transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
                });
            }
        }
    }
    const cancelDrag = React.useCallback(()=>{
        if (!isDragging || !drawerRef.current) return;
        drawerRef.current.classList.remove(DRAG_CLASS);
        isAllowedToDrag.current = false;
        setIsDragging(false);
        dragEndTime.current = new Date();
    }, [
        isDragging
    ]);
    const closeDrawer = React.useCallback((fromWithin, details)=>{
        cancelDrag();
        onClose?.();
        if (!fromWithin) {
            setIsOpen(false, details);
        }
        if (fadeFromIndex !== undefined && fadeFromIndex > 0 && activeSnapPointIndex === 0) {
            set(overlayRef.current, {
                opacity: "0"
            });
        }
        setTimeout(()=>{
            if (snapPoints) {
                setActiveSnapPoint(snapPoints[0]);
            }
        }, TRANSITIONS.EXIT_DURATION * 1000);
    }, [
        cancelDrag,
        onClose,
        snapPoints,
        setActiveSnapPoint,
        setIsOpen,
        fadeFromIndex,
        activeSnapPointIndex
    ]);
    function resetDrawer() {
        if (!drawerRef.current) return;
        set(drawerRef.current, {
            transform: "translate3d(0, 0, 0)",
            transition: `transform ${TRANSITIONS.EXIT_DURATION}s ${TRANSITIONS.CONTENT_EXIT_TIMING_FUNCTION}`
        });
        set(overlayRef.current, {
            transition: `opacity ${TRANSITIONS.EXIT_DURATION}s ${TRANSITIONS.OVERLAY_EXIT_TIMING_FUNCTION}`,
            opacity: "1"
        });
    }
    function onRelease(event) {
        if (!isDragging || !drawerRef.current) return;
        drawerRef.current.classList.remove(DRAG_CLASS);
        isAllowedToDrag.current = false;
        setIsDragging(false);
        dragEndTime.current = new Date();
        const swipeAmount = getTranslate(drawerRef.current, direction);
        if (!event || !shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) return;
        if (dragStartTime.current === null) return;
        const timeTaken = dragEndTime.current.getTime() - dragStartTime.current.getTime();
        const distMoved = pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX);
        const velocity = Math.abs(distMoved) / timeTaken;
        if (snapPoints) {
            const directionMultiplier = direction === "bottom" || direction === "right" ? 1 : -1;
            onReleaseSnapPoints({
                draggedDistance: distMoved * directionMultiplier,
                closeDrawer,
                velocity,
                dismissible,
                event: event.nativeEvent
            });
            onReleaseProp?.(event, true);
            return;
        }
        if (direction === "bottom" || direction === "right" ? distMoved > 0 : distMoved < 0) {
            resetDrawer();
            onReleaseProp?.(event, true);
            return;
        }
        if (velocity > VELOCITY_THRESHOLD) {
            closeDrawer(false, {
                reason: "drag",
                event: event.nativeEvent
            });
            onReleaseProp?.(event, false);
            return;
        }
        const visibleDrawerHeight = Math.min(drawerRef.current.getBoundingClientRect().height ?? 0, window.innerHeight);
        const visibleDrawerWidth = Math.min(drawerRef.current.getBoundingClientRect().width ?? 0, window.innerWidth);
        const isHorizontalSwipe = direction === "left" || direction === "right";
        if (Math.abs(swipeAmount) >= (isHorizontalSwipe ? visibleDrawerWidth : visibleDrawerHeight) * closeThreshold) {
            closeDrawer(false, {
                reason: "drag",
                event: event.nativeEvent
            });
            onReleaseProp?.(event, false);
            return;
        }
        onReleaseProp?.(event, true);
        resetDrawer();
    }
    React.useEffect(()=>{
        if (isOpen) {
            set(document.documentElement, {
                scrollBehavior: "auto"
            });
            openTime.current = new Date();
        }
        return ()=>{
            reset(document.documentElement, "scrollBehavior");
        };
    }, [
        isOpen
    ]);
    React.useEffect(()=>{
        function onVisualViewportChange() {
            if (!drawerRef.current || !repositionInputs) return;
            const focusedElement = document.activeElement;
            if (isInput(focusedElement) || keyboardIsOpen.current) {
                const visualViewportHeight = window.visualViewport?.height || 0;
                const totalHeight = window.innerHeight;
                let diffFromInitial = totalHeight - visualViewportHeight;
                const drawerHeight = drawerRef.current.getBoundingClientRect().height || 0;
                const isTallEnough = drawerHeight > totalHeight * 0.8;
                if (!initialDrawerHeight.current) {
                    initialDrawerHeight.current = drawerHeight;
                }
                const offsetFromTop = drawerRef.current.getBoundingClientRect().top;
                if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) {
                    keyboardIsOpen.current = !keyboardIsOpen.current;
                }
                if (snapPoints && snapPoints.length > 0 && snapPointsOffset && activeSnapPointIndex) {
                    const activeSnapPointHeight = snapPointsOffset[activeSnapPointIndex] || 0;
                    diffFromInitial += activeSnapPointHeight;
                }
                previousDiffFromInitial.current = diffFromInitial;
                if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
                    const height = drawerRef.current.getBoundingClientRect().height;
                    let newDrawerHeight = height;
                    if (height > visualViewportHeight) {
                        newDrawerHeight = visualViewportHeight - (isTallEnough ? offsetFromTop : WINDOW_TOP_OFFSET);
                    }
                    if (fixed) {
                        drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
                    } else {
                        drawerRef.current.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`;
                    }
                } else if (!isMobileFirefox() && !isAndroid()) {
                    drawerRef.current.style.height = `${initialDrawerHeight.current}px`;
                }
                if (snapPoints && snapPoints.length > 0 && !keyboardIsOpen.current) {
                    drawerRef.current.style.bottom = "0px";
                } else {
                    drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`;
                }
            }
        }
        window.visualViewport?.addEventListener("resize", onVisualViewportChange);
        return ()=>window.visualViewport?.removeEventListener("resize", onVisualViewportChange);
    }, [
        activeSnapPointIndex,
        snapPoints,
        snapPointsOffset,
        repositionInputs,
        fixed
    ]);
    React.useEffect(()=>{
        if (!modal) {
            window.requestAnimationFrame(()=>{
                document.body.style.pointerEvents = "auto";
            });
        }
    }, [
        modal
    ]);
    // Effect 1: Track drawer open state
    React.useEffect(()=>{
        if (isOpen) {
            setHasBeenOpened(true);
        }
    }, [
        isOpen
    ]);
    // Effect 2: Handle animation state and timer
    React.useEffect(()=>{
        if (isOpen) {
            // Only reset animation state if this is the first open
            if (!hasBeenOpened) {
                setHasAnimationDone(false);
            }
            const timeoutId = setTimeout(()=>{
                setHasAnimationDone(true);
            }, TRANSITIONS.ENTER_DURATION * 1000);
            return ()=>clearTimeout(timeoutId);
        }
        // Reset animation state when drawer closes
        setHasAnimationDone(false);
    }, [
        isOpen,
        hasBeenOpened
    ]);
    React.useEffect(()=>{
        if (isOpen && snapPoints && fadeFromIndex === 0) {
            setShouldOverlayAnimate(true);
            const timeoutId = setTimeout(()=>{
                setShouldOverlayAnimate(false);
            }, TRANSITIONS.ENTER_DURATION * 1000);
            return ()=>clearTimeout(timeoutId);
        }
        setShouldOverlayAnimate(false);
    }, [
        isOpen,
        snapPoints,
        fadeFromIndex
    ]);
    return React.useMemo(()=>({
            activeSnapPoint,
            snapPoints,
            setActiveSnapPoint,
            drawerRef,
            overlayRef,
            shouldOverlayAnimate,
            onOpenChange,
            onPress,
            onRelease,
            onDrag,
            dismissible,
            handleOnly,
            isOpen,
            isDragging,
            shouldFade,
            closeDrawer,
            keyboardIsOpen,
            modal,
            snapPointsOffset,
            activeSnapPointIndex,
            direction,
            noBodyStyles,
            container,
            autoFocus,
            setHasBeenOpened,
            setIsOpen,
            closeOnInteractOutside,
            closeOnEscape,
            hasAnimationDone,
            closeButtonRef,
            isCloseButtonRendered
        }), [
        activeSnapPoint,
        snapPoints,
        setActiveSnapPoint,
        onOpenChange,
        dismissible,
        handleOnly,
        isOpen,
        isDragging,
        shouldFade,
        shouldOverlayAnimate,
        closeDrawer,
        modal,
        snapPointsOffset,
        activeSnapPointIndex,
        direction,
        noBodyStyles,
        container,
        autoFocus,
        setIsOpen,
        closeOnInteractOutside,
        closeOnEscape,
        onRelease,
        onDrag,
        onPress,
        hasAnimationDone,
        closeButtonRef,
        isCloseButtonRendered
    ]);
}

const DrawerContext = /*#__PURE__*/ React.createContext(null);
const DrawerProvider = DrawerContext.Provider;
function useDrawerContext() {
    const context = React.useContext(DrawerContext);
    if (context === null) {
        throw new Error("useDrawerContext must be used within DrawerProvider");
    }
    return context;
}

const DrawerRoot = (props)=>{
    const { children, defaultOpen, dismissible, modal } = props;
    const api = useDrawer(props);
    return /*#__PURE__*/ jsxRuntime.jsx(DialogPrimitive__namespace.Root, {
        defaultOpen: defaultOpen,
        open: api.isOpen,
        onOpenChange: (open)=>{
            if (!dismissible && !open) return;
            if (open) {
                api.setHasBeenOpened(true);
            } else {
                api.closeDrawer(true);
            }
            api.setIsOpen(open);
        },
        modal: modal,
        children: /*#__PURE__*/ jsxRuntime.jsx(DrawerProvider, {
            value: api,
            children: children
        })
    });
};
const DrawerTrigger = DialogPrimitive__namespace.Trigger;
const DrawerPositioner = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const api = useDrawerContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...props,
        style: {
            pointerEvents: api.isOpen ? undefined : "none",
            ...props.style
        }
    });
});
DrawerPositioner.displayName = "DrawerPositioner";
const DrawerBackdrop = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { overlayRef, onRelease, modal, snapPoints, isOpen, shouldFade, shouldOverlayAnimate, hasAnimationDone } = useDrawerContext();
    const composedRef = reactComposeRefs.useComposedRefs(ref, overlayRef);
    const hasSnapPoints = snapPoints && snapPoints.length > 0;
    const onMouseUp = reactUseCallbackRef.useCallbackRef((event)=>onRelease(event));
    if (!modal) {
        return null;
    }
    return /*#__PURE__*/ jsxRuntime.jsx(DialogPrimitive__namespace.Overlay, {
        ref: composedRef,
        onMouseUp: onMouseUp,
        "data-snap-points": isOpen && hasSnapPoints ? "true" : "false",
        "data-snap-points-overlay": isOpen && shouldFade ? "true" : "false",
        "data-should-overlay-animate": shouldOverlayAnimate ? "true" : "false",
        "data-open": domUtils.dataAttr(isOpen),
        "data-animation-done": hasAnimationDone ? "true" : "false",
        ...props
    });
});
DrawerBackdrop.displayName = "DrawerBackdrop";
const DrawerContent = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { onPointerDownOutside, style, onOpenAutoFocus, ...restProps } = props;
    const { drawerRef, onPress, onRelease, onDrag, keyboardIsOpen, snapPointsOffset, activeSnapPointIndex, modal, isOpen, direction, snapPoints, container, handleOnly, autoFocus, closeDrawer, closeOnInteractOutside, closeOnEscape, dismissible, hasAnimationDone } = useDrawerContext();
    // Needed to use transition instead of animations
    const [delayedSnapPoints, setDelayedSnapPoints] = React.useState(false);
    const composedRef = reactComposeRefs.useComposedRefs(ref, drawerRef);
    const pointerStartRef = React.useRef(null);
    const lastKnownPointerEventRef = React.useRef(null);
    const wasBeyondThePointRef = React.useRef(false);
    const hasSnapPoints = snapPoints && snapPoints.length > 0;
    const isDeltaInDirection = (delta, direction, threshold = 0)=>{
        if (wasBeyondThePointRef.current) return true;
        const deltaY = Math.abs(delta.y);
        const deltaX = Math.abs(delta.x);
        const isDeltaX = deltaX > deltaY;
        const dFactor = [
            "bottom",
            "right"
        ].includes(direction) ? 1 : -1;
        if (direction === "left" || direction === "right") {
            const isReverseDirection = delta.x * dFactor < 0;
            if (!isReverseDirection && deltaX >= 0 && deltaX <= threshold) {
                return isDeltaX;
            }
        } else {
            const isReverseDirection = delta.y * dFactor < 0;
            if (!isReverseDirection && deltaY >= 0 && deltaY <= threshold) {
                return !isDeltaX;
            }
        }
        wasBeyondThePointRef.current = true;
        return true;
    };
    React.useEffect(()=>{
        if (hasSnapPoints) {
            window.requestAnimationFrame(()=>{
                setDelayedSnapPoints(true);
            });
        }
    }, []);
    function handleOnPointerUp(event) {
        pointerStartRef.current = null;
        wasBeyondThePointRef.current = false;
        onRelease(event);
    }
    return /*#__PURE__*/ jsxRuntime.jsx(DialogPrimitive__namespace.Content, {
        "data-delayed-snap-points": delayedSnapPoints ? "true" : "false",
        "data-drawer-direction": direction,
        "data-open": domUtils.dataAttr(isOpen),
        "data-animation-done": hasAnimationDone ? "true" : "false",
        "data-drawer": "",
        "data-snap-points": isOpen && hasSnapPoints ? "true" : "false",
        "data-custom-container": container ? "true" : "false",
        ...restProps,
        ref: composedRef,
        style: snapPointsOffset && snapPointsOffset.length > 0 ? {
            "--snap-point-height": `${snapPointsOffset[activeSnapPointIndex ?? 0]}px`,
            ...style
        } : style ?? {},
        onPointerDown: (event)=>{
            if (handleOnly) return;
            restProps.onPointerDown?.(event);
            pointerStartRef.current = {
                x: event.pageX,
                y: event.pageY
            };
            onPress(event);
        },
        onOpenAutoFocus: (e)=>{
            onOpenAutoFocus?.(e);
            if (!autoFocus) {
                e.preventDefault();
            }
        },
        onPointerDownOutside: (e)=>{
            onPointerDownOutside?.(e);
            if (!modal || e.defaultPrevented) {
                e.preventDefault();
                return;
            }
            if (keyboardIsOpen.current) {
                keyboardIsOpen.current = false;
            }
        },
        onFocusOutside: (e)=>{
            props.onFocusOutside?.(e);
            // Always prevent focusOutside to avoid conflicts when focus moves between modals
            // (e.g., when Dialog closes and restores focus while BottomSheet is opening)
            e.preventDefault();
        },
        onPointerMove: (event)=>{
            lastKnownPointerEventRef.current = event;
            if (handleOnly) return;
            restProps.onPointerMove?.(event);
            if (!pointerStartRef.current) return;
            const yPosition = event.pageY - pointerStartRef.current.y;
            const xPosition = event.pageX - pointerStartRef.current.x;
            const swipeStartThreshold = event.pointerType === "touch" ? 10 : 2;
            const delta = {
                x: xPosition,
                y: yPosition
            };
            const isAllowedToSwipe = isDeltaInDirection(delta, direction, swipeStartThreshold);
            if (isAllowedToSwipe) onDrag(event);
            else if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) {
                pointerStartRef.current = null;
            }
        },
        onPointerUp: (event)=>{
            restProps.onPointerUp?.(event);
            pointerStartRef.current = null;
            wasBeyondThePointRef.current = false;
            onRelease(event);
        },
        onPointerOut: (event)=>{
            restProps.onPointerOut?.(event);
            handleOnPointerUp(lastKnownPointerEventRef.current);
        },
        onContextMenu: (event)=>{
            restProps.onContextMenu?.(event);
            if (lastKnownPointerEventRef.current) {
                handleOnPointerUp(lastKnownPointerEventRef.current);
            }
        },
        onInteractOutside: (e)=>{
            // Only close if event is not prevented (e.g., by onFocusOutside or onPointerDownOutside)
            if (dismissible && closeOnInteractOutside && !e.defaultPrevented) {
                closeDrawer(false, {
                    reason: "interactOutside",
                    event: e.detail.originalEvent
                });
            }
            props.onInteractOutside?.(e);
        },
        onEscapeKeyDown: (e)=>{
            if (dismissible && closeOnEscape) {
                closeDrawer(false, {
                    reason: "escapeKeyDown",
                    event: e
                });
            }
            props.onEscapeKeyDown?.(e);
        }
    });
});
DrawerContent.displayName = "DrawerContent";
const DrawerTitle = DialogPrimitive__namespace.Title;
const DrawerDescription = DialogPrimitive__namespace.Description;
const DrawerHeader = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { isCloseButtonRendered } = useDrawerContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        "data-show-close-button": domUtils.dataAttr(isCloseButtonRendered),
        ...props
    });
});
DrawerHeader.displayName = "DrawerHeader";
const DrawerCloseButton = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { closeButtonRef, setIsOpen } = useDrawerContext();
    const composedRef = reactComposeRefs.useComposedRefs(ref, closeButtonRef);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
        ref: composedRef,
        ...props,
        onClick: (e)=>{
            props.onClick?.(e);
            if (e.defaultPrevented) return;
            setIsOpen(false, {
                reason: "closeButton",
                event: e.nativeEvent
            });
        }
    });
});
const LONG_HANDLE_PRESS_TIMEOUT = 250;
const DOUBLE_TAP_TIMEOUT = 120;
const DrawerHandle = /*#__PURE__*/ React.forwardRef((props, ref)=>{
    const { preventCycle = false, children, ...rest } = props;
    const { closeDrawer, isDragging, snapPoints, activeSnapPoint, setActiveSnapPoint, dismissible, handleOnly, isOpen, onPress, onDrag, onRelease } = useDrawerContext();
    const closeTimeoutIdRef = React.useRef(null);
    const shouldCancelInteractionRef = React.useRef(false);
    function handleStartCycle(event) {
        // Stop if this is the second click of a double click
        if (shouldCancelInteractionRef.current) {
            handleCancelInteraction();
            return;
        }
        window.setTimeout(()=>{
            handleCycleSnapPoints(event);
        }, DOUBLE_TAP_TIMEOUT);
    }
    function handleCycleSnapPoints(event) {
        // Prevent accidental taps while resizing drawer
        if (isDragging || preventCycle || shouldCancelInteractionRef.current) {
            handleCancelInteraction();
            return;
        }
        // Make sure to clear the timeout id if the user releases the handle before the cancel timeout
        handleCancelInteraction();
        if (!snapPoints || snapPoints.length === 0) {
            if (!dismissible) {
                closeDrawer(false, {
                    reason: "handleClickOnLastSnapPoint",
                    event: event.nativeEvent
                });
            }
            return;
        }
        const isLastSnapPoint = activeSnapPoint === snapPoints[snapPoints.length - 1];
        if (isLastSnapPoint && dismissible) {
            closeDrawer(false, {
                reason: "handleClickOnLastSnapPoint",
                event: event.nativeEvent
            });
            return;
        }
        const currentSnapIndex = snapPoints.findIndex((point)=>point === activeSnapPoint);
        if (currentSnapIndex === -1) return; // activeSnapPoint not found in snapPoints
        const nextSnapPoint = snapPoints[currentSnapIndex + 1];
        setActiveSnapPoint(nextSnapPoint);
    }
    function handleStartInteraction() {
        closeTimeoutIdRef.current = window.setTimeout(()=>{
            // Cancel click interaction on a long press
            shouldCancelInteractionRef.current = true;
        }, LONG_HANDLE_PRESS_TIMEOUT);
    }
    function handleCancelInteraction() {
        if (closeTimeoutIdRef.current) {
            window.clearTimeout(closeTimeoutIdRef.current);
        }
        shouldCancelInteractionRef.current = false;
    }
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        onClick: handleStartCycle,
        onPointerCancel: handleCancelInteraction,
        onPointerDown: (e)=>{
            if (handleOnly) onPress(e);
            handleStartInteraction();
        },
        onPointerMove: (e)=>{
            if (handleOnly) onDrag(e);
        },
        onPointerUp: (e)=>{
            if (handleOnly) onRelease(e);
            handleCancelInteraction();
        },
        "data-drawer-visible": isOpen ? "true" : "false",
        "data-handle": "",
        "aria-hidden": "true",
        ...rest,
        children: children
    });
});
DrawerHandle.displayName = "DrawerHandle";

exports.DrawerBackdrop = DrawerBackdrop;
exports.DrawerCloseButton = DrawerCloseButton;
exports.DrawerContent = DrawerContent;
exports.DrawerDescription = DrawerDescription;
exports.DrawerHandle = DrawerHandle;
exports.DrawerHeader = DrawerHeader;
exports.DrawerPositioner = DrawerPositioner;
exports.DrawerRoot = DrawerRoot;
exports.DrawerTitle = DrawerTitle;
exports.DrawerTrigger = DrawerTrigger;
exports.useDrawer = useDrawer;
exports.useDrawerContext = useDrawerContext;
