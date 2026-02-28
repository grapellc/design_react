"use client";

import { HStack } from "@grapu-design/react";
import { FieldButton, FieldButtonPlaceholder } from "grapu-design/ui/field-button";

export default function FieldButtonEnabled() {
  return (
    <HStack width="full" gap="x3">
      <FieldButton
        label="Label"
        description="Description 써주세요"
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "Notice Show",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
      <FieldButton
        label="Label"
        description="Description 써주세요"
        invalid
        errorMessage="Error가 발생한 이유를 써주세요"
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "Notice Show",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
    </HStack>
  );
}
