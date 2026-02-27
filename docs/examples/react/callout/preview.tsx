import { VStack } from "@grape_design_react/react";
import { ActionableCallout, Callout, DismissibleCallout } from "grape_design_react/ui/callout";

export default function CalloutPreview() {
  return (
    <VStack gap="x4" width="full">
      <Callout description="Aute nulla proident tempor minim eiusmod. In nostrud officia irure laborum." />
      <ActionableCallout description="Aute nulla proident tempor minim eiusmod. In nostrud officia irure laborum." />
      <DismissibleCallout description="Aute nulla proident tempor minim eiusmod. In nostrud officia irure laborum." />
    </VStack>
  );
}
