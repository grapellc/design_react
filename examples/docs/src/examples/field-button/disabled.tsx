"use client";

import { HStack } from "@seed-design/react";
import { FieldButton, FieldButtonPlaceholder } from "seed-design/ui/field-button";

export default function FieldButtonDisabled() {
  return (
    <HStack width="full" gap="x3">
      <FieldButton
        label="Label"
        description="Description 써주세요"
        disabled
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "값 Select",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
      <FieldButton
        label="Label"
        description="Description 써주세요"
        disabled
        invalid
        errorMessage="Error가 발생한 이유를 써주세요"
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "값 Select",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
    </HStack>
  );
}
