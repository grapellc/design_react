'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const clsx = require('clsx');
const React = require('react');

function createRecipeContext(recipe) {
  const PropsContext = React.createContext(null);
  const PropsProvider = ({ children, value }) => {
    return /* @__PURE__ */ jsxRuntime.jsx(PropsContext.Provider, { value, children });
  };
  function useProps() {
    return React.useContext(PropsContext);
  }
  const withContext = (Component, options) => {
    const { defaultProps } = options ?? {};
    const StyledComponent = React.forwardRef((innerProps, ref) => {
      const props = { ...defaultProps ?? {}, ...useProps(), ...innerProps };
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const className = recipe(variantProps);
      return /* @__PURE__ */ jsxRuntime.jsx(Component, { ref, ...otherProps, className: clsx(className, props.className) });
    });
    StyledComponent.displayName = Component.displayName || Component.name;
    return StyledComponent;
  };
  function withPropsProvider() {
    return PropsProvider;
  }
  return {
    PropsProvider,
    useProps,
    withContext,
    withPropsProvider
  };
}

exports.createRecipeContext = createRecipeContext;
