'use client';
import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { createContext, forwardRef, useContext } from 'react';

function createRecipeContext(recipe) {
  const PropsContext = createContext(null);
  const PropsProvider = ({ children, value }) => {
    return /* @__PURE__ */ jsx(PropsContext.Provider, { value, children });
  };
  function useProps() {
    return useContext(PropsContext);
  }
  const withContext = (Component, options) => {
    const { defaultProps } = options ?? {};
    const StyledComponent = forwardRef((innerProps, ref) => {
      const props = { ...defaultProps ?? {}, ...useProps(), ...innerProps };
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const className = recipe(variantProps);
      return /* @__PURE__ */ jsx(Component, { ref, ...otherProps, className: clsx(className, props.className) });
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

export { createRecipeContext };
