'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const clsx = require('clsx');
const React = require('react');

function createSlotRecipeContext(recipe) {
  const ClassNamesContext = React.createContext(null);
  const PropsContext = React.createContext(null);
  const ClassNamesProvider = ({
    children,
    value
  }) => {
    return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesContext.Provider, { value, children });
  };
  const PropsProvider = ({ children, value }) => {
    return /* @__PURE__ */ jsxRuntime.jsx(PropsContext.Provider, { value, children });
  };
  function useClassNames() {
    const context = React.useContext(ClassNamesContext);
    if (context === null) {
      throw new Error(
        "useClassNames must be used within a ClassNamesProvider. Did you forget to wrap your component in a ClassNamesProvider?"
      );
    }
    return context;
  }
  function useProps() {
    return React.useContext(PropsContext);
  }
  const withRootProvider = (Component, options) => {
    const { defaultProps } = options ?? {};
    const StyledComponent = (innerProps) => {
      const props = { ...defaultProps ?? {}, ...useProps(), ...innerProps };
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const classNames = recipe(variantProps);
      return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(Component, { ...otherProps }) });
    };
    StyledComponent.displayName = Component.displayName || Component.name;
    return StyledComponent;
  };
  const withProvider = (Component, slot, options) => {
    const { defaultProps } = options ?? {};
    const StyledComponent = React.forwardRef((innerProps, ref) => {
      const props = { ...defaultProps ?? {}, ...useProps(), ...innerProps };
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const classNames = recipe(variantProps);
      const className = classNames[slot];
      return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(Component, { ref, ...otherProps, className: clsx(className, props.className) }) });
    });
    StyledComponent.displayName = Component.displayName || Component.name;
    return StyledComponent;
  };
  const withContext = (Component, slot) => {
    const StyledComponent = React.forwardRef((props, ref) => {
      const classNames = useClassNames();
      const className = classNames?.[slot];
      return /* @__PURE__ */ jsxRuntime.jsx(Component, { ref, ...props, className: clsx(className, props.className) });
    });
    StyledComponent.displayName = Component.displayName || Component.name;
    return StyledComponent;
  };
  return {
    ClassNamesProvider,
    PropsProvider,
    useClassNames,
    useProps,
    withRootProvider,
    withProvider,
    withContext
  };
}

exports.createSlotRecipeContext = createSlotRecipeContext;
