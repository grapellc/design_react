"use client";

import { TextField, TextFieldTextarea } from "grape-design/ui/text-field";

export default function TextFieldTextareaSpecifiedHeight() {
  return (
    <TextField label="Label" description="Description 써주세요">
      <TextFieldTextarea placeholder="플레이스홀더" style={{ height: "250px" }} />
    </TextField>
  );
}
