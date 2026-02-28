"use client";

import { TextField, TextFieldTextarea } from "grapu-design/ui/text-field";

export default function TextFieldTextareaConstraints() {
  return (
    <TextField label="Label" description="Description 써주세요">
      <TextFieldTextarea
        placeholder="플레이스홀더"
        style={{ minHeight: "200px", maxHeight: "300px" }}
      />
    </TextField>
  );
}
