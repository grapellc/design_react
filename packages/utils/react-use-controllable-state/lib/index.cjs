var React = require('react');
var reactUseLayoutEffect = require('@radix-ui/react-use-layout-effect');

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

// This code includes portions derived from radix-ui/primitives (https://github.com/radix-ui/primitives)
// Used under the MIT License: https://opensource.org/licenses/MIT
// Prevent bundlers from trying to optimize the import
const useInsertionEffect = // biome-ignore lint/suspicious/noExplicitAny: React internal API access
React__namespace[" useInsertionEffect ".trim().toString()] || reactUseLayoutEffect.useLayoutEffect;
function useControllableState({ prop, defaultProp, onChange = ()=>{}, caller }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef, detailsRef] = useUncontrolledState({
        defaultProp,
        onChange
    });
    const isControlled = prop !== undefined;
    const value = isControlled ? prop : uncontrolledProp;
    // @ts-expect-error
    if (process.env.NODE_ENV !== "production") {
        // biome-ignore lint/correctness/useHookAtTopLevel: OK to disable conditionally calling hooks here because they will always run consistently in the same environment. Bundlers should be able to remove the code block entirely in production.
        const isControlledRef = React__namespace.useRef(prop !== undefined);
        // biome-ignore lint/correctness/useHookAtTopLevel: same
        React__namespace.useEffect(()=>{
            const wasControlled = isControlledRef.current;
            if (wasControlled !== isControlled) {
                const from = wasControlled ? "controlled" : "uncontrolled";
                const to = isControlled ? "controlled" : "uncontrolled";
                console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
            }
            isControlledRef.current = isControlled;
        }, [
            isControlled,
            caller
        ]);
    }
    const setValue = React__namespace.useCallback((nextValue, details)=>{
        if (isControlled) {
            const value = isFunction(nextValue) ? nextValue(prop) : nextValue;
            if (value !== prop) {
                onChangeRef.current?.(value, details);
            }
        } else {
            detailsRef.current = details;
            setUncontrolledProp(nextValue);
        }
    }, [
        isControlled,
        prop,
        setUncontrolledProp,
        onChangeRef,
        detailsRef
    ]);
    return [
        value,
        setValue
    ];
}
function useUncontrolledState({ defaultProp, onChange }) {
    const [value, setValue] = React__namespace.useState(defaultProp);
    const prevValueRef = React__namespace.useRef(value);
    const detailsRef = React__namespace.useRef(undefined);
    const onChangeRef = React__namespace.useRef(onChange);
    useInsertionEffect(()=>{
        onChangeRef.current = onChange;
    }, [
        onChange
    ]);
    React__namespace.useEffect(()=>{
        if (prevValueRef.current !== value) {
            onChangeRef.current?.(value, detailsRef.current);
            prevValueRef.current = value;
            detailsRef.current = undefined;
        }
    }, [
        value
    ]);
    return [
        value,
        setValue,
        onChangeRef,
        detailsRef
    ];
}
// biome-ignore lint/suspicious/noExplicitAny: type guard utility
function isFunction(value) {
    return typeof value === "function";
}

exports.useControllableState = useControllableState;
