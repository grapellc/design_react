"use client";

import { HStack } from "@grapu-design/react";
import { FieldButton, FieldButtonPlaceholder } from "grapu-design/ui/field-button";

export default function FieldButtonReadOnly() {
  return (
    <HStack width="full" gap="x3">
      <FieldButton
        label="Label"
        description="Description 써주세요"
        readOnly
        buttonProps={{
          "aria-label": "값 Select",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
      <FieldButton
        label="Label"
        description="Description 써주세요"
        readOnly
        invalid
        errorMessage="Error가 발생한 이유를 써주세요"
        buttonProps={{
          "aria-label": "값 Select",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
    </HStack>
  );
}
