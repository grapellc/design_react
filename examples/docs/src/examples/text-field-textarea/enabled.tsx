"use client";

import { HStack } from "@seed-design/react";
import { TextField, TextFieldTextarea } from "seed-design/ui/text-field";

export default function TextFieldTextareaEnabled() {
  return (
    <HStack width="full" gap="x3">
      <TextField label="Label" description="Description 써주세요">
        <TextFieldTextarea placeholder="플레이스홀더" />
      </TextField>
      <TextField
        label="Label"
        description="Description 써주세요"
        invalid
        errorMessage="Error가 발생한 이유를 써주세요"
      >
        <TextFieldTextarea placeholder="플레이스홀더" />
      </TextField>
    </HStack>
  );
}
