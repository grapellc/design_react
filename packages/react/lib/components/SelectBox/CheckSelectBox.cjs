'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactComposeRefs = require('@radix-ui/react-compose-refs');
const selectBox = require('@grape-design/css/recipes/select-box');
const selectBoxCheckmark = require('@grape-design/css/recipes/selectBoxCheckmark');
const selectBoxGroup = require('@grape-design/css/recipes/select-box-group');
const reactCheckbox = require('@grape-design/react-checkbox');
const reactCollapsible = require('@grape-design/react-collapsible');
const reactPrimitive = require('@grape-design/react-primitive');
const clsx = require('clsx');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const Icon = require('../private/Icon.cjs');

const { PropsProvider, ClassNamesProvider, withContext, useProps, useClassNames } = createSlotRecipeContext.createSlotRecipeContext(selectBox.selectBox);
const withStateProps = createWithStateProps.createWithStateProps([reactCheckbox.useCheckboxContext]);
const FooterContext = React.createContext(null);
const CheckSelectBoxGroup = React.forwardRef(
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
  const { checked } = reactCheckbox.useCheckboxContext();
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
const CheckSelectBoxRoot = React.forwardRef(
  ({ footerVisibility = "when-selected", className, children, ...props }, ref) => {
    const [variantProps, otherProps] = selectBox.selectBox.splitVariantProps(props);
    const classNames = selectBox.selectBox({
      ...useProps(),
      ...variantProps
    });
    return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactCheckbox.Checkbox.Root,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps,
        children: footerVisibility === "always" ? children : /* @__PURE__ */ jsxRuntime.jsx(FooterVisibilityProvider, { footerVisibility, children })
      }
    ) });
  }
);
const CheckSelectBoxTrigger = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "trigger"
);
const CheckSelectBoxContent = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "content"
);
const CheckSelectBoxBody = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "body"
);
const CheckSelectBoxLabel = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "label"
);
const CheckSelectBoxDescription = withContext(withStateProps(reactPrimitive.Primitive.div), "description");
const { withProvider: withCheckmarkProvider, withContext: withCheckmarkContext } = createSlotRecipeContext.createSlotRecipeContext(selectBoxCheckmark.selectBoxCheckmark);
const withCheckmarkStateProps = createWithStateProps.createWithStateProps([reactCheckbox.useCheckboxContext]);
const CheckSelectBoxCheckmarkControl = withCheckmarkProvider(reactCheckbox.Checkbox.Control, "root");
const CheckSelectBoxCheckmarkIcon = withCheckmarkContext(withCheckmarkStateProps(Icon.InternalIcon), "icon");
const CheckSelectBoxHiddenInput = React.forwardRef((props, ref) => {
  const collapsibleContext = reactCollapsible.useCollapsibleContext({ strict: false });
  const footerContext = React.useContext(FooterContext);
  const triggerAriaProps = footerContext?.isFooterRendered ? collapsibleContext?.triggerAriaProps : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(reactCheckbox.Checkbox.HiddenInput, { ref, ...triggerAriaProps, ...props });
});
CheckSelectBoxHiddenInput.displayName = "CheckSelectBoxHiddenInput";
const CheckSelectBoxFooter = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = useClassNames();
    const { stateProps } = reactCheckbox.useCheckboxContext();
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
CheckSelectBoxFooter.displayName = "CheckSelectBoxFooter";

exports.CheckSelectBoxBody = CheckSelectBoxBody;
exports.CheckSelectBoxCheckmarkControl = CheckSelectBoxCheckmarkControl;
exports.CheckSelectBoxCheckmarkIcon = CheckSelectBoxCheckmarkIcon;
exports.CheckSelectBoxContent = CheckSelectBoxContent;
exports.CheckSelectBoxDescription = CheckSelectBoxDescription;
exports.CheckSelectBoxFooter = CheckSelectBoxFooter;
exports.CheckSelectBoxGroup = CheckSelectBoxGroup;
exports.CheckSelectBoxHiddenInput = CheckSelectBoxHiddenInput;
exports.CheckSelectBoxLabel = CheckSelectBoxLabel;
exports.CheckSelectBoxRoot = CheckSelectBoxRoot;
exports.CheckSelectBoxTrigger = CheckSelectBoxTrigger;
