import { linkContent, type LinkContentVariantProps } from "@grape_design_react/css/recipes/link-content";
import { Primitive, type PrimitiveProps } from "@grape_design_react/react-primitive";
import { createRecipeContext } from "../../utils/createRecipeContext";
import type * as React from "react";
import { withStyleProps, type StyleProps } from "../../utils/styled";

const { withContext } = createRecipeContext(linkContent);

/**
 * @deprecated Use `ActionButton` with variant="ghost" instead.
 */
export interface LinkContentProps
  extends LinkContentVariantProps,
    PrimitiveProps,
    Pick<StyleProps, "color">,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {}

/**
 * @deprecated Use `ActionButton` with variant="ghost" instead.
 */
export const LinkContent = withContext<HTMLButtonElement, LinkContentProps>(
  withStyleProps(Primitive.span),
);
