'use client';
import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { pageBanner } from '@grape-design/css/recipes/page-banner';
import { Primitive } from '@seed-design/react-primitive';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { DismissibleCloseButton, DismissibleRoot } from '../private/useDismissible.js';
import clsx from 'clsx';

const { withContext, ClassNamesProvider } = createSlotRecipeContext(pageBanner);
const PageBannerRoot = forwardRef(
  ({ className, ...props }, ref) => {
    if (props.variant === "solid" && props.tone === "magic") {
      console.error(
        `\`${props.tone}\` tone is not available for \`${props.variant}\` variant in PageBanner components. Please use variant="weak" or a different tone instead.`
      );
    }
    const [variantProps, otherProps] = pageBanner.splitVariantProps(props);
    const classNames = pageBanner(variantProps);
    return /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(DismissibleRoot, { className: clsx(classNames.root, className), ref, ...otherProps }) });
  }
);
const PageBannerContent = withContext(
  Primitive.div,
  "content"
);
const PageBannerBody = withContext(
  Primitive.div,
  "body"
);
const PageBannerTitle = withContext(
  Primitive.span,
  "title"
);
const PageBannerDescription = withContext(
  Primitive.span,
  "description"
);
const PageBannerButton = withContext(
  Primitive.button,
  "button"
);
const PageBannerCloseButton = withContext(
  DismissibleCloseButton,
  "closeButton"
);

export { PageBannerBody, PageBannerButton, PageBannerCloseButton, PageBannerContent, PageBannerDescription, PageBannerRoot, PageBannerTitle };
