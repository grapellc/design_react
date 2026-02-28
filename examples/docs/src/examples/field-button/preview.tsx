"use client";

import { FieldButton } from "grape-design/ui/field-button";

export default function FieldButtonPreview() {
  return (
    <FieldButton
      label="Label"
      description="Button에 대한 Description 작성해주세요"
      buttonProps={{
        onClick: () => window.alert("Button 클릭됨"),
        "aria-label": "Notice Show",
      }}
    />
  );
}
