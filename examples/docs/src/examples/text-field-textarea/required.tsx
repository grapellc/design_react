"use client";

import { TextField, TextFieldTextarea } from "grapu-design/ui/text-field";

export default function MultilineTextFieldRequired() {
  return (
    <TextField label="Label" description="Description 써주세요" required showRequiredIndicator>
      <TextFieldTextarea placeholder="플레이스홀더" />
    </TextField>
  );
}
