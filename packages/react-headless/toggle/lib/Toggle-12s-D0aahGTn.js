'use client';
import { jsx } from 'react/jsx-runtime';
import { elementProps, dataAttr, buttonProps, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import { useCallback, useMemo, createContext, useContext, forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

function useToggleState(props) {
    const [isPressed, setIsPressed] = useControllableState({
        prop: props.pressed,
        defaultProp: props.defaultPressed,
        onChange: props.onPressedChange
    });
    const toggle = useCallback(()=>{
        setIsPressed((prev)=>!prev);
    }, [
        setIsPressed
    ]);
    return useMemo(()=>({
            isPressed,
            toggle
        }), [
        isPressed,
        toggle
    ]);
}
function useToggle(props) {
    const { toggle, isPressed } = useToggleState(props);
    const stateProps = elementProps({
        "data-pressed": dataAttr(isPressed),
        "data-disabled": dataAttr(props.disabled)
    });
    return {
        pressed: isPressed,
        toggle,
        stateProps,
        rootProps: buttonProps({
            ...stateProps,
            "aria-pressed": isPressed,
            onClick () {
                if (props.disabled) return;
                toggle();
            }
        })
    };
}

const ToggleContext = /*#__PURE__*/ createContext(null);
const ToggleProvider = ToggleContext.Provider;
function useToggleContext({ strict = true } = {}) {
    const context = useContext(ToggleContext);
    if (!context && strict) {
        throw new Error("useToggleContext must be used within a Toggle");
    }
    return context;
}

const ToggleRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { pressed, defaultPressed, onPressedChange, disabled, ...otherProps } = props;
    const api = useToggle({
        pressed,
        defaultPressed,
        onPressedChange,
        disabled
    });
    const mergedProps = mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsx(ToggleProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.button, {
            ref: ref,
            ...mergedProps
        })
    });
});
ToggleRoot.displayName = "ToggleRoot";

export { ToggleRoot as T, useToggleContext as u };
