"use client";

import { VStack } from "@grape-design/react";
import { Checkbox } from "grape-design/ui/checkbox";

export default function CheckboxIndeterminate() {
  return (
    <VStack p="x6">
      <Checkbox defaultChecked label="indeterminate" indeterminate tone="neutral" size="large" />
    </VStack>
  );
}
