"use client";

import { HStack } from "@seed-design/react";
import { FieldButton, FieldButtonPlaceholder } from "seed-design/ui/field-button";
import { IconPlusCircleLine, IconWonLine } from "@karrotmarket/react-monochrome-icon";

export default function FieldButtonBothAffixes() {
  return (
    <HStack width="full" gap="x3">
      <FieldButton
        label="Label"
        description="Description 써주세요"
        prefix="만"
        suffix="세"
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "나이 Select",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
      <FieldButton
        label="Label"
        description="Description 써주세요"
        prefixIcon={<IconPlusCircleLine />}
        suffixIcon={<IconWonLine />}
        buttonProps={{
          onClick: () => window.alert("Button 클릭됨"),
          "aria-label": "금액 Select",
        }}
      >
        <FieldButtonPlaceholder>플레이스홀더</FieldButtonPlaceholder>
      </FieldButton>
    </HStack>
  );
}
