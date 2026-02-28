'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var React = require('react');
var reactUseControllableState = require('@radix-ui/react-use-controllable-state');
var reactSupports = require('@grapu-design/react-supports');

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

/* Utils -----------------------------------------------------------------------
-------------------------------------------------------------------------------- */ const getAllValues = (el)=>{
    return Array.from(el.children).map((child)=>child.getAttribute("data-value")).filter(Boolean);
};
const getSegmentIndex = (value, el)=>{
    const values = getAllValues(el);
    return values.indexOf(value);
};

function useSegmentedControlState(props) {
    const [value, setValue] = reactUseControllableState.useControllableState({
        prop: props.value,
        defaultProp: props.defaultValue,
        onChange: props.onValueChange
    });
    const [hoveredValue, setHoveredValue] = React.useState(null);
    const [activeValue, setActiveValue] = React.useState(null);
    const [focusedValue, setFocusedValue] = React.useState(null);
    const [isFocusVisible, setIsFocusVisible] = React.useState(false);
    const [rootEl, setRootEl] = React.useState(null);
    const segmentCount = React.useMemo(()=>{
        return rootEl ? getAllValues(rootEl).length : 0;
    }, [
        rootEl
    ]);
    const segmentIndex = React.useMemo(()=>{
        return value && rootEl ? getSegmentIndex(value, rootEl) : -1;
    }, [
        value,
        rootEl
    ]);
    return {
        refs: {
            root: setRootEl
        },
        value,
        setValue,
        hoveredValue,
        setHoveredValue,
        activeValue,
        setActiveValue,
        focusedValue,
        setFocusedValue,
        isFocusVisible,
        setIsFocusVisible,
        segmentCount,
        segmentIndex
    };
}
function useSegmentedControl(props) {
    const id = React.useId();
    const { refs, value, setValue, hoveredValue, setHoveredValue, activeValue, setActiveValue, focusedValue, setFocusedValue, isFocusVisible, setIsFocusVisible, segmentCount, segmentIndex } = useSegmentedControlState(props);
    const { disabled, form, name } = props;
    const isControlled = props.value !== undefined;
    const isFocusVisibleSupported = reactSupports.useSupports("selector(:focus-visible)");
    const stateProps = domUtils.elementProps({
        "data-disabled": domUtils.dataAttr(disabled)
    });
    return {
        value,
        setValue,
        refs,
        stateProps,
        rootProps: domUtils.elementProps({
            role: "radiogroup",
            ...stateProps,
            style: {
                "--segment-index": segmentIndex.toString(),
                "--segment-count": segmentCount.toString()
            }
        }),
        getItemProps (itemProps) {
            const { value: itemValue, disabled: itemDisabled, invalid: itemInvalid } = itemProps;
            const itemState = {
                invalid: !!itemInvalid,
                disabled: !!itemDisabled || disabled,
                checked: value === itemValue,
                focused: focusedValue === itemValue,
                hovered: hoveredValue === itemValue,
                active: activeValue === itemValue
            };
            const itemStateProps = domUtils.elementProps({
                "data-focus": domUtils.dataAttr(itemState.focused),
                "data-focus-visible": domUtils.dataAttr(itemState.focused && isFocusVisible),
                "data-disabled": domUtils.dataAttr(itemState.disabled),
                "data-checked": domUtils.dataAttr(itemState.checked),
                "data-active": domUtils.dataAttr(itemState.active),
                "data-hover": domUtils.dataAttr(itemState.hovered),
                "data-invalid": domUtils.dataAttr(itemState.invalid),
                "data-value": itemValue
            });
            return {
                ...itemState,
                setFocusedValue,
                setIsFocusVisible,
                stateProps: itemStateProps,
                rootProps: domUtils.elementProps({
                    ...itemStateProps,
                    onPointerMove () {
                        if (itemState.disabled) return;
                        setHoveredValue(itemProps.value);
                    },
                    onPointerLeave () {
                        if (itemState.disabled) return;
                        setHoveredValue(null);
                        setActiveValue(null);
                    },
                    onPointerDown (event) {
                        if (itemState.disabled) return;
                        // On pointerdown, the input blurs and returns focus to the `body`,
                        // we need to prevent this.
                        if (itemState.focused && event.pointerType === "mouse") {
                            event.preventDefault();
                        }
                        setActiveValue(itemProps.value);
                    },
                    onPointerUp () {
                        if (itemState.disabled) return;
                        setActiveValue(null);
                    }
                }),
                hiddenInputProps: domUtils.inputProps({
                    type: "radio",
                    name: name || id,
                    form,
                    value: itemProps.value,
                    onChange (event) {
                        if (itemState.disabled) return;
                        if (event.target.checked) {
                            setValue(itemProps.value);
                        }
                        if (isFocusVisibleSupported) {
                            setIsFocusVisible(event.target.matches(":focus-visible"));
                        }
                    },
                    onBlur () {
                        setFocusedValue(null);
                        if (isFocusVisibleSupported) {
                            setIsFocusVisible(false);
                        }
                    },
                    onFocus (event) {
                        setFocusedValue(itemProps.value);
                        if (isFocusVisibleSupported) {
                            setIsFocusVisible(event.target.matches(":focus-visible"));
                        }
                    },
                    onKeyDown (event) {
                        if (event.key === " ") {
                            setActiveValue(itemProps.value);
                        }
                    },
                    onKeyUp (event) {
                        if (event.key === " ") {
                            setActiveValue(null);
                        }
                    },
                    disabled: itemState.disabled,
                    ...isControlled && {
                        checked: itemState.checked
                    },
                    ...!isControlled && {
                        defaultChecked: itemState.checked
                    },
                    style: domUtils.visuallyHidden
                })
            };
        }
    };
}

const SegmentedControlContext = /*#__PURE__*/ React.createContext(null);
const SegmentedControlProvider = SegmentedControlContext.Provider;
function useSegmentedControlContext({ strict = true } = {}) {
    const context = React.useContext(SegmentedControlContext);
    if (!context && strict) {
        throw new Error("useSegmentedControlContext must be used within a SegmentedControl");
    }
    return context;
}

const SegmentedControlItemContext = /*#__PURE__*/ React.createContext(null);
const SegmentedControlItemProvider = SegmentedControlItemContext.Provider;
function useSegmentedControlItemContext({ strict = true } = {}) {
    const context = React.useContext(SegmentedControlItemContext);
    if (!context && strict) {
        throw new Error("useSegmentedControlItemContext must be used within a SegmentedControlItem");
    }
    return context;
}

const SegmentedControlRoot = /*#__PURE__*/ React__namespace.forwardRef((props, ref)=>{
    const { value, defaultValue, onValueChange, form, name, disabled, ...otherProps } = props;
    const api = useSegmentedControl({
        value,
        defaultValue,
        onValueChange,
        disabled,
        form,
        name
    });
    const mergedProps = domUtils.mergeProps(api.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(SegmentedControlProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: reactComposeRefs.composeRefs(ref, api.refs.root),
            ...mergedProps
        })
    });
});
SegmentedControlRoot.displayName = "SegmentedControl";
const SegmentedControlItem = /*#__PURE__*/ React__namespace.forwardRef((props, ref)=>{
    const { value, invalid, disabled, ...otherProps } = props;
    const { getItemProps } = useSegmentedControlContext();
    const itemProps = getItemProps({
        value,
        disabled,
        invalid
    });
    const mergedProps = domUtils.mergeProps(itemProps.rootProps, otherProps);
    return /*#__PURE__*/ jsxRuntime.jsx(SegmentedControlItemProvider, {
        value: itemProps,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.label, {
            ref: ref,
            ...mergedProps
        })
    });
});
SegmentedControlItem.displayName = "SegmentedControlItem";
const SegmentedControlItemHiddenInput = /*#__PURE__*/ React__namespace.forwardRef((props, ref)=>{
    const { hiddenInputProps } = useSegmentedControlItemContext();
    const mergedProps = domUtils.mergeProps(hiddenInputProps, props);
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.input, {
        ref: ref,
        ...mergedProps
    });
});
SegmentedControlItemHiddenInput.displayName = "SegmentedControlItemHiddenInput";

exports.SegmentedControlItem = SegmentedControlItem;
exports.SegmentedControlItemHiddenInput = SegmentedControlItemHiddenInput;
exports.SegmentedControlRoot = SegmentedControlRoot;
exports.useSegmentedControlContext = useSegmentedControlContext;
exports.useSegmentedControlItemContext = useSegmentedControlItemContext;
