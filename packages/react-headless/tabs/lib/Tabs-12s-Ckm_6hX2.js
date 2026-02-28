'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, ariaAttr, buttonProps, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import { useRef, createContext, useContext, useState, useEffect, useId, useMemo, useCallback, forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useSize } from '@radix-ui/react-use-size';
import { useSupports } from '@grapu-design/react-supports';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import AutoHeight from 'embla-carousel-auto-height';
import useEmblaCarousel from 'embla-carousel-react';

function useRenderStrategy(props) {
    const wasEverPresent = useRef(false);
    if (props.present) {
        wasEverPresent.current = true;
    }
    return {
        unmounted: !props.present && !wasEverPresent.current && props.lazyMount || props.unmountOnExit && !props.present && wasEverPresent.current
    };
}

const RenderStrategyPropsContext = /*#__PURE__*/ createContext(null);
const RenderStrategyPropsProvider = RenderStrategyPropsContext.Provider;
function useRenderStrategyPropsContext({ strict = true } = {}) {
    const context = useContext(RenderStrategyPropsContext);
    if (!context && strict) {
        throw new Error("useRenderStrategyPropsContext must be used within a RenderStrategyPropsProvider");
    }
    return context;
}

/* ID -----------------------------------------------------------------------
-------------------------------------------------------------------------------- */ const getTriggerId = (value, id)=>`tabs:${value}:${id}:trigger-root`;
const getListId = (id)=>`tabs:${id}:list`;
const getContentId = (value, id)=>`tabs:${value}:${id}:content`;
/* Query -----------------------------------------------------------------------
-------------------------------------------------------------------------------- */ const getEnabledValues = (el)=>{
    if (!el) return [];
    return Array.from(el.children).filter((child)=>!child.hasAttribute("aria-disabled")).map((child)=>child.getAttribute("data-value")).filter(Boolean);
};
/* Prevent Drag -----------------------------------------------------------------------
-------------------------------------------------------------------------------- */ const PREVENT_DRAG_ATTRIBUTE = "data-embla-prevent-drag";
const tabsCarouselPreventDrag = {
    [PREVENT_DRAG_ATTRIBUTE]: ""
};
const isDragPrevented = (el)=>{
    return el.closest(`[${PREVENT_DRAG_ATTRIBUTE}]`) != null;
};

function getPrevIndex(index, length) {
    if (length <= 0) {
        throw new Error("Length must be a positive number.");
    }
    return (index - 1 + length) % length;
}
function getNextIndex(index, length) {
    if (length <= 0) {
        throw new Error("Length must be a positive number.");
    }
    return (index + 1) % length;
}
// Helper function to scroll tab into view
function scrollTabIntoView(tabElement, listElement, options) {
    const isHorizontal = listElement.getAttribute("aria-orientation") !== "vertical";
    // Default padding is 16px if not specified
    const scrollPadding = options?.scrollPadding;
    if (isHorizontal) {
        const tabLeft = tabElement.offsetLeft;
        const tabRight = tabLeft + tabElement.offsetWidth;
        const listScrollLeft = listElement.scrollLeft;
        const listWidth = listElement.clientWidth;
        const listRight = listScrollLeft + listWidth;
        if (tabLeft < listScrollLeft) {
            // Tab is to the left of the visible area - scroll a bit more to the left
            listElement.scrollTo({
                left: Math.max(0, tabLeft - scrollPadding),
                behavior: "smooth"
            });
        } else if (tabRight > listRight) {
            // Tab is to the right of the visible area - scroll a bit more to the right
            listElement.scrollTo({
                left: tabRight - listWidth + scrollPadding,
                behavior: "smooth"
            });
        }
    } else {
        const tabTop = tabElement.offsetTop;
        const tabBottom = tabTop + tabElement.offsetHeight;
        const listScrollTop = listElement.scrollTop;
        const listHeight = listElement.clientHeight;
        const listBottom = listScrollTop + listHeight;
        if (tabTop < listScrollTop) {
            // Tab is above the visible area - scroll a bit more up
            listElement.scrollTo({
                top: Math.max(0, tabTop - scrollPadding),
                behavior: "smooth"
            });
        } else if (tabBottom > listBottom) {
            // Tab is below the visible area - scroll a bit more down
            listElement.scrollTo({
                top: tabBottom - listHeight + scrollPadding,
                behavior: "smooth"
            });
        }
    }
}

function useIsSSR() {
    const [isSSR, setIsSSR] = useState(true);
    useEffect(()=>{
        setIsSSR(false);
    }, []);
    return isSSR;
}

function useTabsState(props) {
    const [interactionState, setInteractionState] = useState("idle");
    const [value, setValue] = useControllableState({
        prop: props.value,
        defaultProp: props.defaultValue ?? undefined,
        onChange: props.onValueChange
    });
    const [focusedValue, setFocusedValue] = useState(null);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const isFocusVisibleSupported = useSupports("selector(:focus-visible)");
    const [listEl, listRef] = useState(null);
    const [selectedTriggerEl, setSelectedTriggerEl] = useState(null);
    const selectedTriggerSize = useSize(selectedTriggerEl);
    const enabledValues = useMemo(()=>listEl ? getEnabledValues(listEl) : [], [
        listEl
    ]);
    const contentIndex = value ? enabledValues.indexOf(value) : -1;
    const prevIndex = contentIndex >= 0 ? getPrevIndex(contentIndex, enabledValues.length) : -1;
    const nextIndex = contentIndex >= 0 ? getNextIndex(contentIndex, enabledValues.length) : -1;
    // Scroll selected tab into view when it changes
    // TODO: this implementation is temporary, we should create some sort of hook or plugin system
    //       to allow users to customize the scroll behavior.
    useEffect(()=>{
        if (selectedTriggerEl && listEl) {
            scrollTabIntoView(selectedTriggerEl, listEl, {
                scrollPadding: 16
            });
        }
    }, [
        selectedTriggerEl,
        listEl
    ]);
    const selectPrevAction = useCallback(()=>{
        const prevValue = enabledValues[prevIndex];
        if (!prevValue) return;
        setValue(prevValue);
    }, [
        enabledValues,
        prevIndex,
        setValue
    ]);
    const selectNextAction = useCallback(()=>{
        const nextValue = enabledValues[nextIndex];
        if (!nextValue) return;
        setValue(nextValue);
    }, [
        enabledValues,
        nextIndex,
        setValue
    ]);
    const selectFirstAction = useCallback(()=>{
        const firstValue = enabledValues[0];
        if (!firstValue) return;
        setValue(firstValue);
    }, [
        enabledValues,
        setValue
    ]);
    const selectLastAction = useCallback(()=>{
        const lastValue = enabledValues[enabledValues.length - 1];
        if (!lastValue) return;
        setValue(lastValue);
    }, [
        enabledValues,
        setValue
    ]);
    const setFocusedValueAction = useCallback((value)=>{
        setFocusedValue(value);
    }, []);
    const clearFocusedValueAction = useCallback(()=>{
        setFocusedValue(null);
    }, []);
    const setValueAction = useCallback((value)=>{
        setValue(value);
    }, [
        setValue
    ]);
    const actions = {
        selectPrev: selectPrevAction,
        selectNext: selectNextAction,
        selectFirst: selectFirstAction,
        selectLast: selectLastAction,
        setFocusedValue: setFocusedValueAction,
        clearFocusedValue: clearFocusedValueAction,
        setValue: setValueAction
    };
    const arrowPrevEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectPrev();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectPrev,
        isFocusVisibleSupported
    ]);
    const arrowNextEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectNext();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectNext,
        isFocusVisibleSupported
    ]);
    const arrowUpEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectPrev();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectPrev,
        isFocusVisibleSupported
    ]);
    const arrowDownEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectNext();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectNext,
        isFocusVisibleSupported
    ]);
    const homeEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectFirst();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectFirst,
        isFocusVisibleSupported
    ]);
    const endEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectLast();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectLast,
        isFocusVisibleSupported
    ]);
    const tabFocusEvent = useCallback((value)=>{
        actions.setFocusedValue(value);
        if (interactionState === "idle") {
            setInteractionState("focused");
        }
    }, [
        interactionState,
        actions.setFocusedValue
    ]);
    const tabBlurEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.clearFocusedValue();
            setInteractionState("idle");
        }
    }, [
        interactionState,
        actions.clearFocusedValue
    ]);
    const tabClickEvent = useCallback((value)=>{
        actions.setValue(value);
        if (interactionState === "idle") {
            setInteractionState("focused");
        }
    }, [
        interactionState,
        actions.setValue
    ]);
    const setValueEvent = useCallback((value)=>{
        actions.setValue(value);
    }, [
        actions.setValue
    ]);
    const selectNextEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectNext();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectNext,
        isFocusVisibleSupported
    ]);
    const selectPrevEvent = useCallback(()=>{
        if (interactionState === "focused") {
            actions.selectPrev();
            if (isFocusVisibleSupported) {
                setIsFocusVisible(true);
            }
        }
    }, [
        interactionState,
        actions.selectPrev,
        isFocusVisibleSupported
    ]);
    const setContentIndexEvent = useCallback((index)=>{
        const valueFromIndex = enabledValues[index];
        if (!valueFromIndex) return;
        actions.setValue(valueFromIndex);
    }, [
        actions.setValue,
        enabledValues
    ]);
    const setIsFocusVisibleEvent = useCallback((isFocusVisible)=>{
        setIsFocusVisible(isFocusVisible);
    }, []);
    const setSelectedTriggerElEvent = useCallback((element)=>{
        setSelectedTriggerEl(element);
    }, []);
    const events = {
        arrowPrev: arrowPrevEvent,
        arrowNext: arrowNextEvent,
        arrowUp: arrowUpEvent,
        arrowDown: arrowDownEvent,
        home: homeEvent,
        end: endEvent,
        tabFocus: tabFocusEvent,
        tabBlur: tabBlurEvent,
        tabClick: tabClickEvent,
        setValue: setValueEvent,
        selectNext: selectNextEvent,
        selectPrev: selectPrevEvent,
        setContentIndex: setContentIndexEvent,
        setIsFocusVisible: setIsFocusVisibleEvent,
        setSelectedTriggerEl: setSelectedTriggerElEvent
    };
    const refs = useMemo(()=>({
            list: listRef
        }), []);
    const triggerRect = useMemo(()=>({
            width: selectedTriggerSize?.width ?? selectedTriggerEl?.offsetWidth ?? 0,
            left: selectedTriggerEl?.offsetLeft ?? 0
        }), [
        selectedTriggerSize,
        selectedTriggerEl
    ]);
    const isSSR = useIsSSR();
    return {
        refs,
        interactionState,
        value,
        isSSR,
        triggerRect,
        focusedValue,
        isFocusVisible,
        contentIndex,
        events,
        isFocusVisibleSupported
    };
}
function useTabs(props) {
    const autoId = useId();
    const { refs, interactionState, value, isSSR, events, triggerRect, focusedValue, isFocusVisible, contentIndex, isFocusVisibleSupported } = useTabsState(props);
    const { orientation = "horizontal" } = props;
    const focused = interactionState === "focused";
    const stateProps = useMemo(()=>elementProps({
            "data-orientation": orientation,
            "data-focus": dataAttr(focused),
            "data-ssr": dataAttr(isSSR)
        }), [
        orientation,
        focused,
        isSSR
    ]);
    return {
        refs,
        value,
        contentIndex,
        triggerRect,
        selectNext: events.selectNext,
        selectPrev: events.selectPrev,
        setValue: events.setValue,
        setContentIndex: events.setContentIndex,
        stateProps,
        rootProps: elementProps({
            ...stateProps,
            style: {
                "--indicator-left": `${triggerRect.left}px`,
                "--indicator-width": `${triggerRect.width}px`
            }
        }),
        listProps: elementProps({
            id: getListId(autoId),
            role: "tablist",
            "aria-orientation": orientation,
            ...stateProps,
            onKeyDown (event) {
                if (event.defaultPrevented) return;
                if (event.nativeEvent.isComposing) return;
                // TODO: support activationMode="manual"
                switch(event.key){
                    case "ArrowLeft":
                        if (orientation !== "horizontal") return;
                        events.arrowPrev();
                        break;
                    case "ArrowRight":
                        if (orientation !== "horizontal") return;
                        events.arrowNext();
                        break;
                    case "ArrowUp":
                        if (orientation !== "vertical") return;
                        events.arrowPrev();
                        break;
                    case "ArrowDown":
                        if (orientation !== "vertical") return;
                        events.arrowNext();
                        break;
                    case "Home":
                        {
                            events.home();
                            break;
                        }
                    case "End":
                        {
                            events.end();
                            break;
                        }
                }
            }
        }),
        getTriggerProps: (props)=>{
            const { disabled: isDisabled, value: triggerValue } = props;
            const itemState = {
                isDisabled,
                isSelected: value === triggerValue,
                isFocused: focusedValue === triggerValue
            };
            const itemStateProps = {
                "data-focus": dataAttr(itemState.isFocused),
                "data-focus-visible": dataAttr(itemState.isFocused && isFocusVisible),
                "data-selected": dataAttr(itemState.isSelected),
                "data-disabled": dataAttr(itemState.isDisabled),
                "data-ssr": dataAttr(isSSR),
                "aria-disabled": ariaAttr(itemState.isDisabled),
                "aria-selected": ariaAttr(itemState.isSelected)
            };
            const ref = (element)=>{
                if (element && triggerValue === value) {
                    events.setSelectedTriggerEl(element);
                }
            };
            return {
                ...itemState,
                refs: {
                    root: ref
                },
                stateProps: itemStateProps,
                rootProps: buttonProps({
                    id: getTriggerId(triggerValue, autoId),
                    role: "tab",
                    type: "button",
                    disabled: isDisabled,
                    tabIndex: itemState.isSelected ? 0 : -1,
                    ...itemStateProps,
                    "data-value": triggerValue,
                    "data-orientation": orientation,
                    "data-ownedby": getListId(autoId),
                    "aria-controls": getContentId(triggerValue, autoId),
                    onClick (event) {
                        if (itemState.isDisabled) return;
                        if (event.defaultPrevented) return;
                        events.tabClick(triggerValue);
                    },
                    onFocus (event) {
                        events.tabFocus(props.value);
                        if (isFocusVisibleSupported) {
                            events.setIsFocusVisible(event.target.matches(":focus-visible"));
                        }
                    },
                    onBlur (event) {
                        const target = event.relatedTarget;
                        if (target?.getAttribute("role") !== "tab") {
                            events.tabBlur();
                        }
                        if (isFocusVisibleSupported) {
                            events.setIsFocusVisible(false);
                        }
                    }
                })
            };
        },
        getContentProps: (props)=>{
            const { value: contentValue } = props;
            const triggerId = getTriggerId(contentValue, autoId);
            const isSelected = value === contentValue;
            return elementProps({
                id: getContentId(contentValue, autoId),
                tabIndex: -1,
                role: "tabpanel",
                "aria-labelledby": triggerId,
                "aria-selected": ariaAttr(isSelected),
                "aria-hidden": !isSelected,
                "data-selected": dataAttr(isSelected),
                "data-orientation": orientation,
                "data-ownedby": getListId(autoId),
                "data-ssr": dataAttr(isSSR)
            });
        },
        indicatorProps: elementProps({
            ...stateProps
        })
    };
}

const TabsContext = /*#__PURE__*/ createContext(null);
const TabsProvider = TabsContext.Provider;
function useTabsContext({ strict = true } = {}) {
    const context = useContext(TabsContext);
    if (!context && strict) {
        throw new Error("useTabsContext must be used within a Tabs");
    }
    return context;
}

const autoHeight = AutoHeight();
const plugins = [
    autoHeight
];
const useTabsCarouselState = (props)=>{
    const api = useTabsContext();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: props.loop,
        dragThreshold: props.dragThreshold,
        duration: 20,
        watchDrag: (_, event)=>{
            if (event.target instanceof HTMLElement) {
                if (isDragPrevented(event.target)) {
                    return false;
                }
            }
            return true;
        }
    }, plugins);
    const onSettle = useCallbackRef(props.onSettle);
    const onSwipeStart = useCallbackRef(props.onSwipeStart);
    const onSwipeEnd = useCallbackRef(props.onSwipeEnd);
    useEffect(()=>{
        const select = emblaApi?.on("select", ()=>{
            const contentIndex = emblaApi.selectedScrollSnap();
            api.setContentIndex(contentIndex);
        });
        const settle = emblaApi?.on("settle", ()=>{
            onSettle?.();
        });
        const pointerDown = emblaApi?.on("pointerDown", ()=>{
            onSwipeStart?.();
        });
        const pointerUp = emblaApi?.on("pointerUp", ()=>{
            onSwipeEnd?.();
        });
        return ()=>{
            select?.clear();
            settle?.clear();
            pointerDown?.clear();
            pointerUp?.clear();
        };
    }, [
        emblaApi,
        api.setContentIndex,
        onSettle,
        onSwipeStart,
        onSwipeEnd
    ]);
    const getContentIndex = useCallbackRef(()=>api.contentIndex);
    useEffect(()=>{
        const reInit = emblaApi?.on("reInit", ()=>{
            emblaApi?.scrollTo(getContentIndex(), true);
        });
        return ()=>{
            reInit?.clear();
        };
    }, [
        getContentIndex,
        emblaApi
    ]);
    useEffect(()=>{
        if (!emblaApi) return;
        const { dragHandler } = emblaApi.internalEngine();
        if (props.swipeable) {
            dragHandler.init(emblaApi);
        } else {
            dragHandler.destroy();
        }
    }, [
        emblaApi,
        props.swipeable
    ]);
    const isInitialScroll = useRef(true);
    useEffect(()=>{
        if (emblaApi && api.contentIndex !== emblaApi.selectedScrollSnap()) {
            const engine = emblaApi.internalEngine();
            /**
       * We want the content to quickly snap into place when a tab changes.
       * However, using a very small duration can result in an underdamped spring, which produces a rubber-band (oscillatory) effect.
       *
       * To avoid that, we intentionally use a low duration and friction so that the motion feels fast (snappy)
       * without overshooting. The underlying idea is to map our parameters to a physical spring model—a damped harmonic oscillator—
       * so we can control the dynamics in a physically intuitive way.
       *
       * In embla, the acceleration is modeled as:
       *   a = (displacement * friction) / duration - velocity * (1 - friction)
       *
       * In a classical damped harmonic oscillator (assuming unit mass, m = 1), the acceleration is:
       *   a = (stiffness * displacement - damping * velocity)
       *
       * By comparing the two equations, we can equate the coefficients for displacement and velocity:
       *
       *   For the displacement term:
       *     stiffness = friction / duration
       *
       *   For the velocity term:
       *     damping = 1 - friction
       *
       * Additionally, the damping ratio (zeta) for a damped oscillator is defined as:
       *   zeta = damping / (2 * sqrt(stiffness))
       *
       * Substituting the derived expressions for stiffness and damping gives:
       *   zeta = (1 - friction) / (2 * sqrt(friction / duration))
       *
       * This damping ratio (zeta) tells us the nature of the response:
       *   - zeta < 1: Underdamped (oscillatory, rubber-band effect)
       *   - zeta = 1: Critically damped (fast snap without overshoot)
       *   - zeta > 1: Overdamped (slow response)
       *
       * For our current configuration, we use:
       *
       *     duration = 4
       *     friction = 0.4
       *
       * Which gives:
       *
       *     stiffness = 0.4 / 4 = 0.1
       *     damping   = 1 - 0.4 = 0.6
       *
       * And the damping ratio becomes:
       *
       *     zeta = 0.6 / (2 * sqrt(0.1))
       *       = 0.6 / (2 * 0.31623...)
       *       = 0.6 / 0.63246...
       *       = 0.94868...
       *
       * Since zeta is close to 1, this spring is nearly critically damped. This is enough for our usage,
       * ensuring that the animation snaps quickly without overshooting (avoiding the rubber-band effect)
       * when switching tabs.
       */ if (isInitialScroll.current) {
                engine.scrollBody.useDuration(0);
                isInitialScroll.current = false;
            } else {
                engine.scrollBody.useDuration(4).useFriction(0.4);
            }
            engine.scrollTo.index(api.contentIndex, 0);
        }
    }, [
        emblaApi,
        api.contentIndex
    ]);
    return {
        refs: {
            root: emblaRef
        },
        autoHeight: props.autoHeight
    };
};
const useTabsCarousel = (props)=>{
    const { refs, autoHeight } = useTabsCarouselState(props);
    const stateProps = elementProps({
        "data-carousel": "",
        "data-auto-height": dataAttr(autoHeight)
    });
    return {
        refs,
        stateProps,
        rootProps: elementProps({
            ...stateProps
        }),
        cameraProps: elementProps({
            ...stateProps
        })
    };
};

const TabsCarouselContext = /*#__PURE__*/ createContext(null);
const TabsCarouselProvider = TabsCarouselContext.Provider;
function useTabsCarouselContext({ strict = true } = {}) {
    const context = useContext(TabsCarouselContext);
    if (!context && strict) {
        throw new Error("useTabsCarouselContext must be used within a TabsCarousel");
    }
    return context;
}

const TabsTriggerContext = /*#__PURE__*/ createContext(null);
const TabsTriggerProvider = TabsTriggerContext.Provider;
function useTabsTriggerContext({ strict = true } = {}) {
    const context = useContext(TabsTriggerContext);
    if (!context && strict) {
        throw new Error("useTabsTriggerContext must be used within a TabsTrigger");
    }
    return context;
}

const TabsRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { defaultValue, value, onValueChange, orientation, lazyMount, unmountOnExit, ...otherProps } = props;
    const api = useTabs({
        defaultValue,
        value,
        onValueChange,
        orientation
    });
    return /*#__PURE__*/ jsx(TabsProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(RenderStrategyPropsProvider, {
            value: useMemo(()=>({
                    lazyMount,
                    unmountOnExit
                }), [
                lazyMount,
                unmountOnExit
            ]),
            children: /*#__PURE__*/ jsx(Primitive.div, {
                ref: ref,
                ...mergeProps(api.rootProps, otherProps)
            })
        })
    });
});
TabsRoot.displayName = "TabsRoot";
const TabsList = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useTabsContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: composeRefs(api.refs.list, ref),
        ...mergeProps(api.listProps, props)
    });
});
TabsList.displayName = "TabsList";
const TabsTrigger = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { value, disabled, ...otherProps } = props;
    const api = useTabsContext();
    const triggerApi = api.getTriggerProps({
        value,
        disabled
    });
    return /*#__PURE__*/ jsx(TabsTriggerProvider, {
        value: triggerApi,
        children: /*#__PURE__*/ jsx(Primitive.button, {
            ref: composeRefs(triggerApi.refs.root, ref),
            ...mergeProps(triggerApi.rootProps, otherProps)
        })
    });
});
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { value, ...otherProps } = props;
    const api = useTabsContext();
    const carouselApi = useTabsCarouselContext({
        strict: false
    });
    const renderStrategyProps = useRenderStrategyPropsContext();
    const { unmounted } = useRenderStrategy({
        ...renderStrategyProps,
        present: api.value === value
    });
    if (unmounted) return null;
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(api.getContentProps({
            value
        }), carouselApi?.stateProps ?? {}, otherProps)
    });
});
TabsContent.displayName = "TabsContent";
const TabsIndicator = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useTabsContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(api.indicatorProps, props)
    });
});
const TabsCarousel = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { dragThreshold, loop, swipeable, autoHeight, onSettle, onSwipeStart, onSwipeEnd, ...otherProps } = props;
    const api = useTabsCarousel({
        dragThreshold,
        loop,
        swipeable,
        onSettle,
        autoHeight,
        onSwipeStart,
        onSwipeEnd
    });
    return /*#__PURE__*/ jsx(TabsCarouselProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: composeRefs(api.refs.root, ref),
            ...mergeProps(api.rootProps, otherProps),
            children: props.children
        })
    });
});
TabsCarousel.displayName = "TabsCarousel";
const TabsCarouselCamera = /*#__PURE__*/ forwardRef((props, ref)=>{
    const api = useTabsCarouselContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(api.cameraProps, props)
    });
});
TabsCarouselCamera.displayName = "TabsCarouselCamera";

export { TabsCarousel as T, TabsCarouselCamera as a, TabsContent as b, TabsIndicator as c, TabsList as d, TabsRoot as e, TabsTrigger as f, useTabsContext as g, useTabsTriggerContext as h, tabsCarouselPreventDrag as t, useTabsCarouselContext as u };
