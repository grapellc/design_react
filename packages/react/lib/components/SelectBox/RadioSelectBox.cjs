'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactComposeRefs = require('@radix-ui/react-compose-refs');
const selectBox = require('@seed-design/css/recipes/select-box');
const selectBoxGroup = require('@seed-design/css/recipes/select-box-group');
const reactCollapsible = require('@seed-design/react-collapsible');
const reactPrimitive = require('@seed-design/react-primitive');
const reactRadioGroup = require('@seed-design/react-radio-group');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const clsx = require('clsx');

const { PropsProvider, ClassNamesProvider, withContext, useProps, useClassNames } = createSlotRecipeContext.createSlotRecipeContext(selectBox.selectBox);
const withStateProps = createWithStateProps.createWithStateProps([reactRadioGroup.useRadioGroupItemContext]);
const FooterContext = React.createContext(null);
const RadioSelectBoxGroup = React.forwardRef(
  ({ columns = 1, className, style, ...props }, ref) => {
    const [variantProps, otherProps] = selectBoxGroup.selectBoxGroup.splitVariantProps(props);
    const recipeClassName = selectBoxGroup.selectBoxGroup(variantProps);
    const layout = columns === 1 ? "horizontal" : "vertical";
    return /* @__PURE__ */ jsxRuntime.jsx(PropsProvider, { value: { layout }, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactPrimitive.Primitive.div,
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
  const { checked } = reactRadioGroup.useRadioGroupItemContext();
  const collapsible = reactCollapsible.useCollapsible({
    open: {
      "when-selected": checked,
      "when-not-selected": !checked
    }[footerVisibility]
  });
  const [isFooterRendered, setIsFooterRendered] = React.useState(false);
  const footerRef = React.useCallback((node) => {
    setIsFooterRendered(!!node);
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(reactCollapsible.CollapsibleProvider, { value: collapsible, children: /* @__PURE__ */ jsxRuntime.jsx(FooterContext.Provider, { value: { isFooterRendered, footerRef, footerVisibility }, children }) });
}
const RadioSelectBoxItem = React.forwardRef(
  ({ footerVisibility = "when-selected", className, children, ...props }, ref) => {
    const [variantProps, otherProps] = selectBox.selectBox.splitVariantProps(props);
    const classNames = selectBox.selectBox({
      ...useProps(),
      ...variantProps
    });
    return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactRadioGroup.RadioGroup.Item,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps,
        children: footerVisibility === "always" ? children : /* @__PURE__ */ jsxRuntime.jsx(FooterVisibilityProvider, { footerVisibility, children })
      }
    ) });
  }
);
const RadioSelectBoxTrigger = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "trigger"
);
const RadioSelectBoxContent = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "content"
);
const RadioSelectBoxBody = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "body"
);
const RadioSelectBoxLabel = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "label"
);
const RadioSelectBoxDescription = withContext(withStateProps(reactPrimitive.Primitive.div), "description");
const RadioSelectBoxHiddenInput = React.forwardRef((props, ref) => {
  const collapsibleContext = reactCollapsible.useCollapsibleContext({ strict: false });
  const footerContext = React.useContext(FooterContext);
  const triggerAriaProps = footerContext?.isFooterRendered ? collapsibleContext?.triggerAriaProps : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(reactRadioGroup.RadioGroup.ItemHiddenInput, { ref, ...triggerAriaProps, ...props });
});
RadioSelectBoxHiddenInput.displayName = "RadioSelectBoxHiddenInput";
const RadioSelectBoxFooter = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = useClassNames();
    const { stateProps } = reactRadioGroup.useRadioGroupItemContext();
    const collapsibleContext = reactCollapsible.useCollapsibleContext({ strict: false });
    const footerContext = React.useContext(FooterContext);
    const composedRef = reactComposeRefs.composeRefs(ref, footerContext?.footerRef ?? null);
    if (collapsibleContext) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        reactCollapsible.Collapsible.Content,
        {
          ref: composedRef,
          className: clsx(classNames.footer, className),
          ...stateProps,
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactPrimitive.Primitive.div,
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

exports.RadioSelectBoxBody = RadioSelectBoxBody;
exports.RadioSelectBoxContent = RadioSelectBoxContent;
exports.RadioSelectBoxDescription = RadioSelectBoxDescription;
exports.RadioSelectBoxFooter = RadioSelectBoxFooter;
exports.RadioSelectBoxGroup = RadioSelectBoxGroup;
exports.RadioSelectBoxHiddenInput = RadioSelectBoxHiddenInput;
exports.RadioSelectBoxItem = RadioSelectBoxItem;
exports.RadioSelectBoxLabel = RadioSelectBoxLabel;
exports.RadioSelectBoxTrigger = RadioSelectBoxTrigger;
