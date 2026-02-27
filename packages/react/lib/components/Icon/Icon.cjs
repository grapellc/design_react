'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactSlot = require('@radix-ui/react-slot');
const reactUseLayoutEffect = require('@radix-ui/react-use-layout-effect');
const React = require('react');
const styled = require('../../utils/styled.cjs');

const PrefixIcon = React.forwardRef(
  ({ svg, ...otherProps }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactSlot.Slot,
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
const SuffixIcon = React.forwardRef(
  ({ svg, ...otherProps }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactSlot.Slot,
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
const IconContext = React.createContext(null);
const IconRequired = ({
  children,
  enabled
}) => {
  const registeredRef = React.useRef(false);
  const parentContext = React.useContext(IconContext);
  const register = React.useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      if (registeredRef.current) {
        throw new Error(
          "Icon-only Component must render only one <Icon /> under children. Check if you are rendering multiple <Icon />."
        );
      }
    }
    registeredRef.current = true;
  }, []);
  const unregister = React.useCallback(() => {
    registeredRef.current = false;
  }, []);
  reactUseLayoutEffect.useLayoutEffect(() => {
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
  const providerValue = React.useMemo(() => {
    if (!enabled) {
      if (parentContext) {
        return parentContext;
      }
      return null;
    }
    return { register, unregister };
  }, [enabled, parentContext, register, unregister]);
  return /* @__PURE__ */ jsxRuntime.jsx(IconContext.Provider, { value: providerValue, children });
};
const Icon = React.forwardRef(
  ({ svg, size, color, ...otherProps }, ref) => {
    const context = React.useContext(IconContext);
    reactUseLayoutEffect.useLayoutEffect(() => {
      context?.register();
      return () => {
        context?.unregister();
      };
    }, [context]);
    const sizeValue = styled.handleDimension(size);
    const colorValue = styled.handleColor(color);
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactSlot.Slot,
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
  const Node = React.forwardRef((props, ref) => {
    const enabled = enabledPredicate(props);
    return /* @__PURE__ */ jsxRuntime.jsx(IconRequired, { enabled, children: /* @__PURE__ */ jsxRuntime.jsx(Component, { ref, ...props }) });
  });
  Node.displayName = Component.displayName || Component.name;
  return Node;
}

exports.Icon = Icon;
exports.IconRequired = IconRequired;
exports.PrefixIcon = PrefixIcon;
exports.SuffixIcon = SuffixIcon;
exports.withIconRequired = withIconRequired;
