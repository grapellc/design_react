'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactDialog = require('@seed-design/react-dialog');
const reactPrimitive = require('@seed-design/react-primitive');
const extendedActionSheet = require('@grape-design/css/recipes/extended-action-sheet');
const extendedActionSheetItem = require('@grape-design/css/recipes/extended-action-sheet-item');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');

const { withRootProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(extendedActionSheet.extendedActionSheet);
const { withContext: withItemContext } = createRecipeContext.createRecipeContext(extendedActionSheetItem.extendedActionSheetItem);
const withStateProps = createWithStateProps.createWithStateProps([reactDialog.useDialogContext]);
const ExtendedActionSheetRoot = withRootProvider(
  reactDialog.Dialog.Root,
  {
    defaultProps: {
      lazyMount: true,
      unmountOnExit: true
    }
  }
);
const ExtendedActionSheetTrigger = reactDialog.Dialog.Trigger;
const ExtendedActionSheetPositioner = withContext(reactDialog.Dialog.Positioner, "positioner");
const ExtendedActionSheetBackdrop = withContext(reactDialog.Dialog.Backdrop, "backdrop");
const ExtendedActionSheetContent = withContext(reactDialog.Dialog.Content, "content");
const ExtendedActionSheetHeader = withContext(withStateProps(reactPrimitive.Primitive.div), "header");
const ExtendedActionSheetTitle = withContext(withStateProps(reactPrimitive.Primitive.h2), "title");
const ExtendedActionSheetList = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "list"
);
const ExtendedActionSheetGroup = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "group"
);
const ExtendedActionSheetItem = withItemContext(withStateProps(reactPrimitive.Primitive.button));
const ExtendedActionSheetFooter = withContext(withStateProps(reactPrimitive.Primitive.div), "footer");
const ExtendedActionSheetCloseButton = withContext(reactDialog.Dialog.CloseButton, "closeButton");

exports.ExtendedActionSheetBackdrop = ExtendedActionSheetBackdrop;
exports.ExtendedActionSheetCloseButton = ExtendedActionSheetCloseButton;
exports.ExtendedActionSheetContent = ExtendedActionSheetContent;
exports.ExtendedActionSheetFooter = ExtendedActionSheetFooter;
exports.ExtendedActionSheetGroup = ExtendedActionSheetGroup;
exports.ExtendedActionSheetHeader = ExtendedActionSheetHeader;
exports.ExtendedActionSheetItem = ExtendedActionSheetItem;
exports.ExtendedActionSheetList = ExtendedActionSheetList;
exports.ExtendedActionSheetPositioner = ExtendedActionSheetPositioner;
exports.ExtendedActionSheetRoot = ExtendedActionSheetRoot;
exports.ExtendedActionSheetTitle = ExtendedActionSheetTitle;
exports.ExtendedActionSheetTrigger = ExtendedActionSheetTrigger;
