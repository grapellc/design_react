'use client';
var jsxRuntime = require('react/jsx-runtime');
var domUtils = require('@grape-design/dom-utils');
var reactPrimitive = require('@grape-design/react-primitive');
var react = require('react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');

function useToggleState(props) {
    const [isPressed, setIsPressed] = reactUseControllableState.useControllableState({
        prop: props.pressed,
        defaultProp: props.defaultPressed,
        onChange: props.onPressedChange
    });
    const toggle = react.useCallback(()=>{
        setIsPressed((prev)=>!prev);
    }, [
        setIsPressed
    ]);
    return react.useMemo(()=>({
            isPressed,
            toggle
        }), [
        isPressed,
        toggle
    ]);
}
function useToggle(props) {
    const { toggle, isPressed } = useToggleState(props);
    const stateProps = domUtils.elementProps({
        "data-pressed": domUtils.dataAttr(isPressed),
        "data-disabled": domUtils.dataAttr(props.disabled)
    });
    return {
        pressed: isPressed,
        toggle,
        stateProps,
        rootProps: domUtils.buttonProps({
            ...stateProps,
            "aria-pressed": isPressed,
            onClick () {
                if (props.disabled) return;
                toggle();
            }
        })
    };
}

const ToggleContext = /*#__PURE__*/ react.createContext(null);
const ToggleProvider = ToggleContext.Provider;
function useToggleContext({ strict = true } = {}) {
    const context = react.useContext(ToggleContext);
    if (!context && strict) {
        throw new Error("useToggleContext must be used within a Toggle");
    }
    return context;
}

const ToggleRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { pressed, defaultPressed, onPressedChange, disabled, ...otherProps } = props;
    const api = useToggle({
        pressed,
        defaultPressed,
        onPressedChange,
        disabled
    });
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(ToggleProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.button, {
            ref: ref,
            ...mergedProps
        })
    });
});
ToggleRoot.displayName = "ToggleRoot";

exports.ToggleRoot = ToggleRoot;
exports.useToggleContext = useToggleContext;
