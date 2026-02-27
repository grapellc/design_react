'use client';
import { jsx } from 'react/jsx-runtime';
import { snackbar } from '@seed-design/css/recipes/snackbar';
import { snackbarRegion } from '@seed-design/css/recipes/snackbar-region';
import { visuallyHidden } from '@seed-design/dom-utils';
import { Primitive } from '@seed-design/react-primitive';
import { Snackbar } from '@seed-design/react-snackbar';
import { forwardRef } from 'react';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { InternalIcon } from '../private/Icon.js';

const { withContext: withRegionContext } = createRecipeContext(snackbarRegion);
const { withProvider, withContext } = createSlotRecipeContext(snackbar);
const SnackbarRootProvider = Snackbar.RootProvider;
const SnackbarRegion = withRegionContext(
  Snackbar.Region
);
const SnackbarRoot = withProvider(
  Snackbar.Root,
  "root"
);
const SnackbarContent = withContext(
  Primitive.div,
  "content"
);
const SnackbarMessage = withContext(
  Primitive.span,
  "message"
);
const SnackbarPrefixIcon = withContext(
  InternalIcon,
  "prefixIcon"
);
const SnackbarActionButton = withContext(
  Primitive.button,
  "actionButton"
);
const SnackbarHiddenCloseButton = forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  return /* @__PURE__ */ jsx(
    Snackbar.CloseButton,
    {
      ref,
      style: { ...visuallyHidden, ...style },
      ...otherProps
    }
  );
});
const SnackbarRenderer = Snackbar.Renderer;
const SnackbarAvoidOverlap = Snackbar.AvoidOverlap;

export { SnackbarActionButton, SnackbarAvoidOverlap, SnackbarContent, SnackbarHiddenCloseButton, SnackbarMessage, SnackbarPrefixIcon, SnackbarRegion, SnackbarRenderer, SnackbarRoot, SnackbarRootProvider };
