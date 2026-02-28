"use client";

import { VStack } from "@grape-design/react";
import { RadioGroup, RadioGroupItem } from "grape-design/ui/radio-group";

export default function RadioGroupNeutral() {
  return (
    <VStack p="x6">
      <RadioGroup defaultValue="apple" aria-label="과일 Select">
        <RadioGroupItem value="apple" label="사과" tone="neutral" size="large" />
        <RadioGroupItem value="banana" label="바나나" tone="neutral" size="large" />
        <RadioGroupItem value="orange" label="오렌지" tone="neutral" size="large" />
      </RadioGroup>
    </VStack>
  );
}
