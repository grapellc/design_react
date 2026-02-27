import {
  ContextualFloatingButton as SeedContextualFloatingButton,
  type ContextualFloatingButtonProps as SeedContextualFloatingButtonProps,
} from "@grape_design_react/react";
import * as React from "react";
import { LoadingIndicator } from "./loading-indicator";

export interface ContextualFloatingButtonProps extends SeedContextualFloatingButtonProps {}

/**
 * @see https://grape_design_react.io/react/components/contextual-floating-button
 * If `asChild` is enabled, manual handling of `LoadingIndicator` is required.
 */
export const ContextualFloatingButton = React.forwardRef<
  React.ElementRef<typeof SeedContextualFloatingButton>,
  ContextualFloatingButtonProps
>(({ loading = false, children, ...otherProps }, ref) => {
  return (
    <SeedContextualFloatingButton ref={ref} loading={loading} {...otherProps}>
      {loading && !otherProps.asChild ? <LoadingIndicator>{children}</LoadingIndicator> : children}
    </SeedContextualFloatingButton>
  );
});
ContextualFloatingButton.displayName = "ContextualFloatingButton";
