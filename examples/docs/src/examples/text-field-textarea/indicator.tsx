"use client";

import { HStack } from "@seed-design/react";
import { TextField, TextFieldTextarea } from "seed-design/ui/text-field";

export default function TextFieldTextareaIndicator() {
  return (
    <HStack gap="x3" width="full">
      <TextField
        label="Select 필드"
        labelWeight="bold"
        description="Description 써주세요"
        indicator="Select"
      >
        <TextFieldTextarea placeholder="플레이스홀더" />
      </TextField>
      <TextField label="Required 필드" description="Description 써주세요" required>
        <TextFieldTextarea placeholder="플레이스홀더" />
      </TextField>
      <TextField label="Required 필드" description="Description 써주세요" required showRequiredIndicator>
        <TextFieldTextarea placeholder="플레이스홀더" />
      </TextField>
    </HStack>
  );
}
