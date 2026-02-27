'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const bottomSheet = require('@grape-design/css/recipes/bottom-sheet');
const domUtils = require('@seed-design/dom-utils');
const reactDrawer = require('@seed-design/react-drawer');
const reactPrimitive = require('@seed-design/react-primitive');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const styled = require('../../utils/styled.cjs');

const { withRootProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(bottomSheet.bottomSheet);
const BottomSheetRoot = withRootProvider(reactDrawer.Drawer.Root, {
  defaultProps: {
    direction: "bottom"
  }
});
const BottomSheetTrigger = reactDrawer.Drawer.Trigger;
const BottomSheetPositioner = withContext(
  reactDrawer.Drawer.Positioner,
  "positioner"
);
const BottomSheetBackdrop = withContext(
  reactDrawer.Drawer.Backdrop,
  "backdrop"
);
const BottomSheetContent = withContext(
  reactDrawer.Drawer.Content,
  "content"
);
const BottomSheetHeader = withContext(
  reactDrawer.Drawer.Header,
  "header"
);
const BottomSheetTitle = withContext(
  React.forwardRef((props, ref) => {
    const { isCloseButtonRendered } = reactDrawer.useDrawerContext();
    return /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.Drawer.Title, { ref, "data-show-close-button": domUtils.dataAttr(isCloseButtonRendered), ...props });
  }),
  "title"
);
BottomSheetTitle.displayName = "BottomSheetTitle";
const BottomSheetDescription = withContext(reactDrawer.Drawer.Description, "description");
const BottomSheetBody = withContext(
  styled.withStyleProps(reactPrimitive.Primitive.div),
  "body"
);
const BottomSheetFooter = withContext(
  reactPrimitive.Primitive.div,
  "footer"
);
const BottomSheetCloseButton = withContext(
  reactDrawer.Drawer.CloseButton,
  "closeButton"
);

exports.BottomSheetBackdrop = BottomSheetBackdrop;
exports.BottomSheetBody = BottomSheetBody;
exports.BottomSheetCloseButton = BottomSheetCloseButton;
exports.BottomSheetContent = BottomSheetContent;
exports.BottomSheetDescription = BottomSheetDescription;
exports.BottomSheetFooter = BottomSheetFooter;
exports.BottomSheetHeader = BottomSheetHeader;
exports.BottomSheetPositioner = BottomSheetPositioner;
exports.BottomSheetRoot = BottomSheetRoot;
exports.BottomSheetTitle = BottomSheetTitle;
exports.BottomSheetTrigger = BottomSheetTrigger;
