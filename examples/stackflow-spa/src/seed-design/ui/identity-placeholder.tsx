import { IdentityPlaceholder as SeedIdentityPlaceholder } from "@grape_design_react/react";
import * as React from "react";

export interface IdentityPlaceholderProps extends SeedIdentityPlaceholder.RootProps {}

/**
 * @see https://grape_design_react.io/react/components/identity-placeholder
 */
export const IdentityPlaceholder = React.forwardRef<HTMLDivElement, IdentityPlaceholderProps>(
  (props, ref) => {
    return (
      <SeedIdentityPlaceholder.Root {...props} ref={ref}>
        <SeedIdentityPlaceholder.Image />
      </SeedIdentityPlaceholder.Root>
    );
  },
);
IdentityPlaceholder.displayName = "IdentityPlaceholder";
