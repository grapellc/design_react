'use client';
import { jsx } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { forwardRef, useContext, useRef, useCallback, useMemo, createContext } from 'react';
import { handleDimension, handleColor } from '../../utils/styled.js';

const PrefixIcon = forwardRef(
  ({ svg, ...otherProps }, ref) => {
    return /* @__PURE__ */ jsx(
      Slot,
      {
        ref,
        "aria-hidden": true,
        className: "seed-prefix-icon",
        ...otherProps,
        children: svg
      }
    );
  }
);
const SuffixIcon = forwardRef(
  ({ svg, ...otherProps }, ref) => {
    return /* @__PURE__ */ jsx(
      Slot,
      {
        ref,
        "aria-hidden": true,
        className: "seed-suffix-icon",
        ...otherProps,
        children: svg
      }
    );
  }
);
const IconContext = createContext(null);
const IconRequired = ({
  children,
  enabled
}) => {
  const registeredRef = useRef(false);
  const parentContext = useContext(IconContext);
  const register = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      if (registeredRef.current) {
        throw new Error(
          "Icon-only Component must render only one <Icon /> under children. Check if you are rendering multiple <Icon />."
        );
      }
    }
    registeredRef.current = true;
  }, []);
  const unregister = useCallback(() => {
    registeredRef.current = false;
  }, []);
  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      if (parentContext) {
        throw new Error(
          "Icon-only Component must not be nested within another Icon-Only. Check if you are using Icon-Only inside another Icon-Only."
        );
      }
      if (!registeredRef.current) {
        throw new Error(
          "Icon-only Component must render <Icon /> as a child. Check if you are using raw svg icon instead of <Icon svg={} />."
        );
      }
    }
  }, [parentContext, enabled]);
  const providerValue = useMemo(() => {
    if (!enabled) {
      if (parentContext) {
        return parentContext;
      }
      return null;
    }
    return { register, unregister };
  }, [enabled, parentContext, register, unregister]);
  return /* @__PURE__ */ jsx(IconContext.Provider, { value: providerValue, children });
};
const Icon = forwardRef(
  ({ svg, size, color, ...otherProps }, ref) => {
    const context = useContext(IconContext);
    useLayoutEffect(() => {
      context?.register();
      return () => {
        context?.unregister();
      };
    }, [context]);
    const sizeValue = handleDimension(size);
    const colorValue = handleColor(color);
    return /* @__PURE__ */ jsx(
      Slot,
      {
        ref,
        "aria-hidden": true,
        className: "seed-icon",
        style: {
          "--seed-icon-size": sizeValue,
          "--seed-icon-color": colorValue
        },
        ...otherProps,
        children: svg
      }
    );
  }
);
function withIconRequired(Component, enabledPredicate) {
  const Node = forwardRef((props, ref) => {
    const enabled = enabledPredicate(props);
    return /* @__PURE__ */ jsx(IconRequired, { enabled, children: /* @__PURE__ */ jsx(Component, { ref, ...props }) });
  });
  Node.displayName = Component.displayName || Component.name;
  return Node;
}

export { Icon, IconRequired, PrefixIcon, SuffixIcon, withIconRequired };
