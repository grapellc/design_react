"use client";

import { HStack, VStack } from "@grapu-design/react";
import { TextField, TextFieldInput } from "grapu-design/ui/text-field";

export default function TextFieldInputReadOnly() {
  return (
    <VStack width="full" gap="spacingY.componentDefault">
      <HStack gap="x3">
        <TextField label="Label" description="Description 써주세요" readOnly>
          <TextFieldInput placeholder="플레이스홀더" />
        </TextField>
        <TextField
          label="Label"
          description="Description 써주세요"
          readOnly
          invalid
          errorMessage="Error가 발생한 이유를 써주세요"
        >
          <TextFieldInput placeholder="플레이스홀더" />
        </TextField>
      </HStack>
      <HStack gap="x3">
        <TextField variant="underline" description="Description 써주세요" readOnly>
          <TextFieldInput aria-label="Label" placeholder="플레이스홀더" />
        </TextField>
        <TextField
          variant="underline"
          description="Description 써주세요"
          readOnly
          invalid
          errorMessage="Error가 발생한 이유를 써주세요"
        >
          <TextFieldInput aria-label="Label" placeholder="플레이스홀더" />
        </TextField>
      </HStack>
    </VStack>
  );
}
