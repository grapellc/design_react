'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const snackbar = require('@seed-design/css/recipes/snackbar');
const snackbarRegion = require('@seed-design/css/recipes/snackbar-region');
const domUtils = require('@seed-design/dom-utils');
const reactPrimitive = require('@seed-design/react-primitive');
const reactSnackbar = require('@seed-design/react-snackbar');
const React = require('react');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const Icon = require('../private/Icon.cjs');

const { withContext: withRegionContext } = createRecipeContext.createRecipeContext(snackbarRegion.snackbarRegion);
const { withProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(snackbar.snackbar);
const SnackbarRootProvider = reactSnackbar.Snackbar.RootProvider;
const SnackbarRegion = withRegionContext(
  reactSnackbar.Snackbar.Region
);
const SnackbarRoot = withProvider(
  reactSnackbar.Snackbar.Root,
  "root"
);
const SnackbarContent = withContext(
  reactPrimitive.Primitive.div,
  "content"
);
const SnackbarMessage = withContext(
  reactPrimitive.Primitive.span,
  "message"
);
const SnackbarPrefixIcon = withContext(
  Icon.InternalIcon,
  "prefixIcon"
);
const SnackbarActionButton = withContext(
  reactPrimitive.Primitive.button,
  "actionButton"
);
const SnackbarHiddenCloseButton = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactSnackbar.Snackbar.CloseButton,
    {
      ref,
      style: { ...domUtils.visuallyHidden, ...style },
      ...otherProps
    }
  );
});
const SnackbarRenderer = reactSnackbar.Snackbar.Renderer;
const SnackbarAvoidOverlap = reactSnackbar.Snackbar.AvoidOverlap;

exports.SnackbarActionButton = SnackbarActionButton;
exports.SnackbarAvoidOverlap = SnackbarAvoidOverlap;
exports.SnackbarContent = SnackbarContent;
exports.SnackbarHiddenCloseButton = SnackbarHiddenCloseButton;
exports.SnackbarMessage = SnackbarMessage;
exports.SnackbarPrefixIcon = SnackbarPrefixIcon;
exports.SnackbarRegion = SnackbarRegion;
exports.SnackbarRenderer = SnackbarRenderer;
exports.SnackbarRoot = SnackbarRoot;
exports.SnackbarRootProvider = SnackbarRootProvider;
