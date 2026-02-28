'use client';
import { inlineBanner } from '@grape-design/css/recipes/inline-banner';
import { Primitive } from '@grape-design/react-primitive';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { DismissibleCloseButton, DismissibleRoot } from '../private/useDismissible.js';

const { withContext, withProvider } = createSlotRecipeContext(inlineBanner);
const InlineBannerRoot = withProvider(
  DismissibleRoot,
  "root"
);
const InlineBannerContent = withContext(
  Primitive.div,
  "content"
);
const InlineBannerTitle = withContext(
  Primitive.span,
  "title"
);
const InlineBannerDescription = withContext(
  Primitive.span,
  "description"
);
const InlineBannerLink = withContext(
  Primitive.button,
  "link"
);
const InlineBannerCloseButton = withContext(
  DismissibleCloseButton,
  "closeButton"
);

export { InlineBannerCloseButton, InlineBannerContent, InlineBannerDescription, InlineBannerLink, InlineBannerRoot, InlineBannerTitle };
