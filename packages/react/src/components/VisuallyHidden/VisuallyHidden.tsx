import { visuallyHidden } from "@grape_design_react/dom-utils";
import { Primitive, type PrimitiveProps } from "@grape_design_react/react-primitive";
import type * as React from "react";
import { forwardRef } from "react";

export interface VisuallyHiddenProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {}

export const VisuallyHidden = forwardRef<HTMLDivElement, VisuallyHiddenProps>((props, ref) => {
  const { style, ...otherProps } = props;
  return <Primitive.div ref={ref} style={{ ...visuallyHidden, ...style }} {...otherProps} />;
});
