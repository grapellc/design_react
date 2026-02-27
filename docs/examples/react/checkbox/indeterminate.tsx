import { VStack } from "@grape_design_react/react";
import { Checkbox } from "grape_design_react/ui/checkbox";

export default function CheckboxIndeterminate() {
  return (
    <VStack p="x6">
      <Checkbox defaultChecked label="indeterminate" indeterminate tone="neutral" size="large" />
    </VStack>
  );
}
