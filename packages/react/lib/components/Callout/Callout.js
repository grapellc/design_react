'use client';
import { Primitive } from '@seed-design/react-primitive';
import { callout } from '@grape-design/css/recipes/callout';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { DismissibleCloseButton, DismissibleRoot } from '../private/useDismissible.js';

const { withContext, withProvider } = createSlotRecipeContext(callout);
const CalloutRoot = withProvider(DismissibleRoot, "root");
const CalloutContent = withContext(
  Primitive.div,
  "content"
);
const CalloutTitle = withContext(
  Primitive.span,
  "title"
);
const CalloutDescription = withContext(
  Primitive.span,
  "description"
);
const CalloutLink = withContext(
  Primitive.button,
  "link"
);
const CalloutCloseButton = withContext(
  DismissibleCloseButton,
  "closeButton"
);

export { CalloutCloseButton, CalloutContent, CalloutDescription, CalloutLink, CalloutRoot, CalloutTitle };
