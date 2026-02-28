"use client";

import { VStack } from "@grapu-design/react";
import { Checkbox } from "grapu-design/ui/checkbox";

export default function CheckboxIndeterminate() {
  return (
    <VStack p="x6">
      <Checkbox defaultChecked label="indeterminate" indeterminate tone="neutral" size="large" />
    </VStack>
  );
}
