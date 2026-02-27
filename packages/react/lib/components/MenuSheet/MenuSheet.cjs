'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactDialog = require('@seed-design/react-dialog');
const reactPrimitive = require('@seed-design/react-primitive');
const menuSheet = require('@grape-design/css/recipes/menu-sheet');
const menuSheetItem = require('@grape-design/css/recipes/menu-sheet-item');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const clsx = require('clsx');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const { withRootProvider, withContext, useClassNames } = createSlotRecipeContext.createSlotRecipeContext(menuSheet.menuSheet);
const {
  PropsProvider: ItemPropsProvider,
  useProps: useItemProps,
  withContext: withItemContext,
  ClassNamesProvider: ItemClassNamesProvider
} = createSlotRecipeContext.createSlotRecipeContext(menuSheetItem.menuSheetItem);
const withStateProps = createWithStateProps.createWithStateProps([reactDialog.useDialogContext]);
const MenuSheetRoot = withRootProvider(reactDialog.Dialog.Root, {
  defaultProps: {
    lazyMount: true,
    unmountOnExit: true
  }
});
const MenuSheetTrigger = reactDialog.Dialog.Trigger;
const MenuSheetPositioner = withContext(
  reactDialog.Dialog.Positioner,
  "positioner"
);
const MenuSheetBackdrop = withContext(
  reactDialog.Dialog.Backdrop,
  "backdrop"
);
const MenuSheetContent = React__namespace.forwardRef(
  ({ className, ...props }, ref) => {
    const [variantProps, otherProps] = menuSheetItem.menuSheetItem.splitVariantProps(props);
    const classNames = useClassNames();
    return /* @__PURE__ */ jsxRuntime.jsx(ItemPropsProvider, { value: variantProps, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactDialog.Dialog.Content,
      {
        className: clsx(classNames.content, className),
        ref,
        ...otherProps
      }
    ) });
  }
);
const MenuSheetHeader = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "header"
);
const MenuSheetTitle = withContext(
  withStateProps(reactPrimitive.Primitive.h2),
  "title"
);
const MenuSheetDescription = withContext(
  withStateProps(reactPrimitive.Primitive.p),
  "description"
);
const MenuSheetList = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "list"
);
const MenuSheetGroup = React__namespace.forwardRef(
  ({ className, ...props }, ref) => {
    const [variantProps, otherProps] = menuSheetItem.menuSheetItem.splitVariantProps(props);
    const parentProps = useItemProps();
    const classNames = useClassNames();
    const { stateProps } = reactDialog.useDialogContext();
    return /* @__PURE__ */ jsxRuntime.jsx(ItemPropsProvider, { value: { ...parentProps, ...variantProps }, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactPrimitive.Primitive.div,
      {
        className: clsx(classNames.group, className),
        ref,
        ...stateProps,
        ...otherProps
      }
    ) });
  }
);
const MenuSheetItem = React__namespace.forwardRef(
  ({ className: propClassName, ...props }, ref) => {
    const [variantProps, otherProps] = menuSheetItem.menuSheetItem.splitVariantProps(props);
    const parentProps = useItemProps();
    const classNames = menuSheetItem.menuSheetItem({ ...parentProps, ...variantProps });
    const { stateProps } = reactDialog.useDialogContext();
    return /* @__PURE__ */ jsxRuntime.jsx(ItemClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactPrimitive.Primitive.button,
      {
        ref,
        className: clsx(classNames.root, propClassName),
        ...stateProps,
        ...otherProps
      }
    ) });
  }
);
const MenuSheetItemContent = withItemContext(
  withStateProps(reactPrimitive.Primitive.div),
  "content"
);
const MenuSheetItemLabel = withItemContext(
  withStateProps(reactPrimitive.Primitive.span),
  "label"
);
const MenuSheetItemDescription = withItemContext(withStateProps(reactPrimitive.Primitive.span), "description");
const MenuSheetFooter = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "footer"
);
const MenuSheetCloseButton = withContext(
  reactDialog.Dialog.CloseButton,
  "closeButton"
);

exports.MenuSheetBackdrop = MenuSheetBackdrop;
exports.MenuSheetCloseButton = MenuSheetCloseButton;
exports.MenuSheetContent = MenuSheetContent;
exports.MenuSheetDescription = MenuSheetDescription;
exports.MenuSheetFooter = MenuSheetFooter;
exports.MenuSheetGroup = MenuSheetGroup;
exports.MenuSheetHeader = MenuSheetHeader;
exports.MenuSheetItem = MenuSheetItem;
exports.MenuSheetItemContent = MenuSheetItemContent;
exports.MenuSheetItemDescription = MenuSheetItemDescription;
exports.MenuSheetItemLabel = MenuSheetItemLabel;
exports.MenuSheetList = MenuSheetList;
exports.MenuSheetPositioner = MenuSheetPositioner;
exports.MenuSheetRoot = MenuSheetRoot;
exports.MenuSheetTitle = MenuSheetTitle;
exports.MenuSheetTrigger = MenuSheetTrigger;
