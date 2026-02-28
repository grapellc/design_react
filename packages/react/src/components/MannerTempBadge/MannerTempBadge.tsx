import {
  mannerTempBadge,
  type MannerTempBadgeVariantProps,
} from "@grape-design/css/recipes/manner-temp-badge";
import { Primitive, type PrimitiveProps } from "@grape-design/react-primitive";
import type * as React from "react";
import { createRecipeContext } from "../../utils/createRecipeContext";

const { withContext } = createRecipeContext(mannerTempBadge);

////////////////////////////////////////////////////////////////////////////////////

export interface MannerTempBadgeProps
  extends MannerTempBadgeVariantProps,
    PrimitiveProps,
    React.HTMLAttributes<HTMLSpanElement> {}

export const MannerTempBadge = withContext<HTMLSpanElement, MannerTempBadgeProps>(Primitive.span);
