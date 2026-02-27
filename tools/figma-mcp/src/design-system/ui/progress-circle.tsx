import { ProgressCircle as SeedProgressCircle } from "@grape_design_react/react";
import * as React from "react";

export interface ProgressCircleProps extends SeedProgressCircle.RootProps {}

/**
 * @see https://grape_design_react.io/react/components/progress-circle
 */
export const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>((props, ref) => {
  return (
    <SeedProgressCircle.Root ref={ref} {...props}>
      <SeedProgressCircle.Track />
      <SeedProgressCircle.Range />
    </SeedProgressCircle.Root>
  );
});

ProgressCircle.displayName = "ProgressCircle";
