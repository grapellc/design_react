'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { selectBox } from '@grape-design/css/recipes/select-box';
import { selectBoxCheckmark } from '@grape-design/css/recipes/selectBoxCheckmark';
import { selectBoxGroup } from '@grape-design/css/recipes/select-box-group';
import { Checkbox, useCheckboxContext } from '@seed-design/react-checkbox';
import { useCollapsibleContext, Collapsible, useCollapsible, CollapsibleProvider } from '@seed-design/react-collapsible';
import { Primitive } from '@seed-design/react-primitive';
import clsx from 'clsx';
import { forwardRef, useContext, createContext, useState, useCallback } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { InternalIcon } from '../private/Icon.js';

const { PropsProvider, ClassNamesProvider, withContext, useProps, useClassNames } = createSlotRecipeContext(selectBox);
const withStateProps = createWithStateProps([useCheckboxContext]);
const FooterContext = createContext(null);
const CheckSelectBoxGroup = forwardRef(
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
  const { checked } = useCheckboxContext();
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
const CheckSelectBoxRoot = forwardRef(
  ({ footerVisibility = "when-selected", className, children, ...props }, ref) => {
    const [variantProps, otherProps] = selectBox.splitVariantProps(props);
    const classNames = selectBox({
      ...useProps(),
      ...variantProps
    });
    return /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      Checkbox.Root,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps,
        children: footerVisibility === "always" ? children : /* @__PURE__ */ jsx(FooterVisibilityProvider, { footerVisibility, children })
      }
    ) });
  }
);
const CheckSelectBoxTrigger = withContext(
  withStateProps(Primitive.div),
  "trigger"
);
const CheckSelectBoxContent = withContext(
  withStateProps(Primitive.div),
  "content"
);
const CheckSelectBoxBody = withContext(
  withStateProps(Primitive.div),
  "body"
);
const CheckSelectBoxLabel = withContext(
  withStateProps(Primitive.div),
  "label"
);
const CheckSelectBoxDescription = withContext(withStateProps(Primitive.div), "description");
const { withProvider: withCheckmarkProvider, withContext: withCheckmarkContext } = createSlotRecipeContext(selectBoxCheckmark);
const withCheckmarkStateProps = createWithStateProps([useCheckboxContext]);
const CheckSelectBoxCheckmarkControl = withCheckmarkProvider(Checkbox.Control, "root");
const CheckSelectBoxCheckmarkIcon = withCheckmarkContext(withCheckmarkStateProps(InternalIcon), "icon");
const CheckSelectBoxHiddenInput = forwardRef((props, ref) => {
  const collapsibleContext = useCollapsibleContext({ strict: false });
  const footerContext = useContext(FooterContext);
  const triggerAriaProps = footerContext?.isFooterRendered ? collapsibleContext?.triggerAriaProps : void 0;
  return /* @__PURE__ */ jsx(Checkbox.HiddenInput, { ref, ...triggerAriaProps, ...props });
});
CheckSelectBoxHiddenInput.displayName = "CheckSelectBoxHiddenInput";
const CheckSelectBoxFooter = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = useClassNames();
    const { stateProps } = useCheckboxContext();
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
CheckSelectBoxFooter.displayName = "CheckSelectBoxFooter";

export { CheckSelectBoxBody, CheckSelectBoxCheckmarkControl, CheckSelectBoxCheckmarkIcon, CheckSelectBoxContent, CheckSelectBoxDescription, CheckSelectBoxFooter, CheckSelectBoxGroup, CheckSelectBoxHiddenInput, CheckSelectBoxLabel, CheckSelectBoxRoot, CheckSelectBoxTrigger };
