"use client";

import { HStack } from "@grape-design/react";
import { FieldButton, FieldButtonPlaceholder } from "seed-design/ui/field-button";

export default function FieldButtonIndicator() {
  return (
    <HStack gap="x3" width="full">
      <FieldButton
        label="Select 필드"
        labelWeight="bold"
        indicator="Select"
        description="이 필드는 Select사항입니다"
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "Select 값 입력",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
      <FieldButton
        label="Required 필드"
        showRequiredIndicator
        description="이 필드는 Required사항입니다"
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "Required 값 입력",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
    </HStack>
  );
}
