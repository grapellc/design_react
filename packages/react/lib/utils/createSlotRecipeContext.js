'use client';
import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { createContext, forwardRef, useContext } from 'react';

function createSlotRecipeContext(recipe) {
  const ClassNamesContext = createContext(null);
  const PropsContext = createContext(null);
  const ClassNamesProvider = ({
    children,
    value
  }) => {
    return /* @__PURE__ */ jsx(ClassNamesContext.Provider, { value, children });
  };
  const PropsProvider = ({ children, value }) => {
    return /* @__PURE__ */ jsx(PropsContext.Provider, { value, children });
  };
  function useClassNames() {
    const context = useContext(ClassNamesContext);
    if (context === null) {
      throw new Error(
        "useClassNames must be used within a ClassNamesProvider. Did you forget to wrap your component in a ClassNamesProvider?"
      );
    }
    return context;
  }
  function useProps() {
    return useContext(PropsContext);
  }
  const withRootProvider = (Component, options) => {
    const { defaultProps } = options ?? {};
    const StyledComponent = (innerProps) => {
      const props = { ...defaultProps ?? {}, ...useProps(), ...innerProps };
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const classNames = recipe(variantProps);
      return /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(Component, { ...otherProps }) });
    };
    StyledComponent.displayName = Component.displayName || Component.name;
    return StyledComponent;
  };
  const withProvider = (Component, slot, options) => {
    const { defaultProps } = options ?? {};
    const StyledComponent = forwardRef((innerProps, ref) => {
      const props = { ...defaultProps ?? {}, ...useProps(), ...innerProps };
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const classNames = recipe(variantProps);
      const className = classNames[slot];
      return /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(Component, { ref, ...otherProps, className: clsx(className, props.className) }) });
    });
    StyledComponent.displayName = Component.displayName || Component.name;
    return StyledComponent;
  };
  const withContext = (Component, slot) => {
    const StyledComponent = forwardRef((props, ref) => {
      const classNames = useClassNames();
      const className = classNames?.[slot];
      return /* @__PURE__ */ jsx(Component, { ref, ...props, className: clsx(className, props.className) });
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

export { createSlotRecipeContext };
