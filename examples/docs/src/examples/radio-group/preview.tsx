"use client";

import { VStack } from "@grapu-design/react";
import { RadioGroup, RadioGroupItem } from "grapu-design/ui/radio-group";

export default function RadioGroupPreview() {
  return (
    <VStack p="x6">
      <RadioGroup
        defaultValue="apple"
        label="좋아하는 과일"
        description="좋아하는 과일을 Select해 주세요."
        indicator="Select"
      >
        <RadioGroupItem value="apple" label="Apple" tone="neutral" size="large" />
        <RadioGroupItem value="banana" label="Banana" tone="neutral" size="large" />
        <RadioGroupItem value="orange" label="Orange" tone="neutral" size="large" />
      </RadioGroup>
    </VStack>
  );
}
