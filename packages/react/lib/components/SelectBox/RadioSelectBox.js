'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { selectBox } from '@grape-design/css/recipes/select-box';
import { selectBoxGroup } from '@grape-design/css/recipes/select-box-group';
import { useCollapsibleContext, Collapsible, useCollapsible, CollapsibleProvider } from '@grape-design/react-collapsible';
import { Primitive } from '@grape-design/react-primitive';
import { useRadioGroupItemContext, RadioGroup } from '@grape-design/react-radio-group';
import { forwardRef, useContext, createContext, useState, useCallback } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import clsx from 'clsx';

const { PropsProvider, ClassNamesProvider, withContext, useProps, useClassNames } = createSlotRecipeContext(selectBox);
const withStateProps = createWithStateProps([useRadioGroupItemContext]);
const FooterContext = createContext(null);
const RadioSelectBoxGroup = forwardRef(
  ({ columns = 1, className, style, ...props }, ref) => {
    const [variantProps, otherProps] = selectBoxGroup.splitVariantProps(props);
    const recipeClassName = selectBoxGroup(variantProps);
    const layout = columns === 1 ? "horizontal" : "vertical";
    return /* @__PURE__ */ jsx(PropsProvider, { value: { layout }, children: /* @__PURE__ */ jsx(
      Primitive.div,
      {
        ref,
        "data-columns": columns,
        className: clsx(recipeClassName, className),
        style: {
          ...style,
          "--seed-select-box-group--columns": columns
        },
        ...otherProps
      }
    ) });
  }
);
function FooterVisibilityProvider({
  children,
  footerVisibility
}) {
  const { checked } = useRadioGroupItemContext();
  const collapsible = useCollapsible({
    open: {
      "when-selected": checked,
      "when-not-selected": !checked
    }[footerVisibility]
  });
  const [isFooterRendered, setIsFooterRendered] = useState(false);
  const footerRef = useCallback((node) => {
    setIsFooterRendered(!!node);
  }, []);
  return /* @__PURE__ */ jsx(CollapsibleProvider, { value: collapsible, children: /* @__PURE__ */ jsx(FooterContext.Provider, { value: { isFooterRendered, footerRef, footerVisibility }, children }) });
}
const RadioSelectBoxItem = forwardRef(
  ({ footerVisibility = "when-selected", className, children, ...props }, ref) => {
    const [variantProps, otherProps] = selectBox.splitVariantProps(props);
    const classNames = selectBox({
      ...useProps(),
      ...variantProps
    });
    return /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      RadioGroup.Item,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps,
        children: footerVisibility === "always" ? children : /* @__PURE__ */ jsx(FooterVisibilityProvider, { footerVisibility, children })
      }
    ) });
  }
);
const RadioSelectBoxTrigger = withContext(
  withStateProps(Primitive.div),
  "trigger"
);
const RadioSelectBoxContent = withContext(
  withStateProps(Primitive.div),
  "content"
);
const RadioSelectBoxBody = withContext(
  withStateProps(Primitive.div),
  "body"
);
const RadioSelectBoxLabel = withContext(
  withStateProps(Primitive.div),
  "label"
);
const RadioSelectBoxDescription = withContext(withStateProps(Primitive.div), "description");
const RadioSelectBoxHiddenInput = forwardRef((props, ref) => {
  const collapsibleContext = useCollapsibleContext({ strict: false });
  const footerContext = useContext(FooterContext);
  const triggerAriaProps = footerContext?.isFooterRendered ? collapsibleContext?.triggerAriaProps : void 0;
  return /* @__PURE__ */ jsx(RadioGroup.ItemHiddenInput, { ref, ...triggerAriaProps, ...props });
});
RadioSelectBoxHiddenInput.displayName = "RadioSelectBoxHiddenInput";
const RadioSelectBoxFooter = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = useClassNames();
    const { stateProps } = useRadioGroupItemContext();
    const collapsibleContext = useCollapsibleContext({ strict: false });
    const footerContext = useContext(FooterContext);
    const composedRef = composeRefs(ref, footerContext?.footerRef ?? null);
    if (collapsibleContext) {
      return /* @__PURE__ */ jsx(
        Collapsible.Content,
        {
          ref: composedRef,
          className: clsx(classNames.footer, className),
          ...stateProps,
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        ref: composedRef,
        className: clsx(classNames.footer, className),
        ...stateProps,
        ...props,
        children
      }
    );
  }
);
RadioSelectBoxFooter.displayName = "RadioSelectBoxFooter";

export { RadioSelectBoxBody, RadioSelectBoxContent, RadioSelectBoxDescription, RadioSelectBoxFooter, RadioSelectBoxGroup, RadioSelectBoxHiddenInput, RadioSelectBoxItem, RadioSelectBoxLabel, RadioSelectBoxTrigger };
